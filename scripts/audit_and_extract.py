import os
import re
import json
import urllib.parse
from PIL import Image
import requests
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

PAGES = {
    'home': 'https://www.chefanandkumar.com/',
    'about': 'https://www.chefanandkumar.com/about.html',
    'portfolio': 'https://www.chefanandkumar.com/portfolio.html',
    'recipes': 'https://www.chefanandkumar.com/recipes.html',
    'videos': 'https://www.chefanandkumar.com/video-archive.html',
    'contact': 'https://www.chefanandkumar.com/contact.html',
    'blog': 'https://blog.chefanandkumar.com/'
}

SEEDED_FULLWIDTH_IMAGES = [
    "https://www.chefanandkumar.com/img/models/fullwidth/model1.jpg",
    "https://www.chefanandkumar.com/img/models/fullwidth/model5.jpg",
    "https://www.chefanandkumar.com/img/models/fullwidth/model3.jpg",
    "https://www.chefanandkumar.com/img/models/fullwidth/model4.jpg",
    "https://www.chefanandkumar.com/img/models/fullwidth/modele.jpg",
    "https://www.chefanandkumar.com/img/models/fullwidth/modelt.jpg",
    "https://www.chefanandkumar.com/img/models/fullwidth/modelh.jpg",
    "https://www.chefanandkumar.com/img/models/fullwidth/modelm.jpg"
]

SEEDED_PREVIEW_IMAGES = [
    "https://www.chefanandkumar.com/img/models/preview/model1.jpg",
    "https://www.chefanandkumar.com/img/models/preview/model5.jpg",
    "https://www.chefanandkumar.com/img/models/preview/model3.jpg",
    "https://www.chefanandkumar.com/img/models/preview/model4.jpg",
    "https://www.chefanandkumar.com/img/models/preview/modele.jpg",
    "https://www.chefanandkumar.com/img/models/preview/modelt.jpg",
    "https://www.chefanandkumar.com/img/models/preview/modelh.jpg",
    "https://www.chefanandkumar.com/img/models/preview/modelm.jpg"
]

SEEDED_SPECIAL_IMAGES = [
    "https://www.chefanandkumar.com/img/about2.jpg"
]

def fetch_html(url):
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        return resp.text
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

def main():
    print("--- Starting Source Inspection & Content Audit ---")
    
    html_data = {}
    soups = {}
    
    for key, url in PAGES.items():
        print(f"Fetching {key} ({url})...")
        raw = fetch_html(url)
        html_data[key] = raw
        soups[key] = BeautifulSoup(raw, 'html.parser')
        
        # Save raw HTML
        with open(f"_source_data/html/{key}.html", "w", encoding="utf-8") as f:
            f.write(raw)
            
    print("HTML pages saved.")
    
    # Audit all images across pages + CSS
    discovered_images = set(SEEDED_FULLWIDTH_IMAGES + SEEDED_PREVIEW_IMAGES + SEEDED_SPECIAL_IMAGES)
    css_urls = set()
    
    for key, soup in soups.items():
        base_url = PAGES[key]
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src')
            if src:
                full = urllib.parse.urljoin(base_url, src)
                discovered_images.add(full)
        for link in soup.find_all('link', rel='stylesheet'):
            href = link.get('href')
            if href:
                css_urls.add(urllib.parse.urljoin(base_url, href))
        # Look for inline background images
        for tag in soup.find_all(style=True):
            style = tag['style']
            matches = re.findall(r'url\s*\((?:[\'"]?)([^\'")]+)(?:[\'"]?)\)', style)
            for m in matches:
                discovered_images.add(urllib.parse.urljoin(base_url, m))
                
    # Also inspect CSS for background images
    for css_url in list(css_urls):
        if 'chefanandkumar.com' in css_url or css_url.startswith('/'):
            try:
                css_text = requests.get(css_url, headers=HEADERS, timeout=10).text
                css_matches = re.findall(r'url\s*\((?:[\'"]?)([^\'")]+)(?:[\'"]?)\)', css_text)
                for m in css_matches:
                    if not m.startswith('data:'):
                        full_img = urllib.parse.urljoin(css_url, m)
                        if any(full_img.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']):
                            discovered_images.add(full_img)
            except Exception as e:
                print(f"Error fetching CSS {css_url}: {e}")

    print(f"Total candidate image URLs discovered: {len(discovered_images)}")
    
    # Download images and create asset manifest
    asset_manifest = []
    missing_assets = []
    
    for img_url in sorted(discovered_images):
        # Ignore external tracker / gravatar / analytics images if any
        parsed = urllib.parse.urlparse(img_url)
        path = parsed.path
        filename = os.path.basename(path)
        if not filename or '.' not in filename:
            continue
            
        # Determine local path
        # Map into structured directories: original/portfolio, original/chef, original/models, etc.
        subfolder = "other"
        if "fullwidth" in path:
            subfolder = "fullwidth"
        elif "preview" in path:
            subfolder = "preview"
        elif "models" in path:
            subfolder = "models"
        elif "about" in path or "chef" in path or "portrait" in path:
            subfolder = "chef"
        elif "portfolio" in path:
            subfolder = "portfolio"
            
        local_rel_dir = f"images/original/{subfolder}"
        os.makedirs(f"public/{local_rel_dir}", exist_ok=True)
        local_rel_path = f"{local_rel_dir}/{filename}"
        local_disk_path = f"public/{local_rel_path}"
        
        print(f"Downloading {img_url} -> {local_disk_path}")
        try:
            resp = requests.get(img_url, headers=HEADERS, timeout=12)
            if resp.status_code == 200 and len(resp.content) > 0 and 'image' in resp.headers.get('Content-Type', ''):
                with open(local_disk_path, "wb") as f:
                    f.write(resp.content)
                # Check dimensions with PIL
                width, height = None, None
                try:
                    with Image.open(local_disk_path) as im:
                        width, height = im.size
                except Exception:
                    pass
                    
                asset_manifest.append({
                    "originalUrl": img_url,
                    "localPath": f"/{local_rel_path}",
                    "filename": filename,
                    "contentType": resp.headers.get('Content-Type'),
                    "fileSizeBytes": len(resp.content),
                    "width": width,
                    "height": height,
                    "status": "available",
                    "subfolder": subfolder
                })
            else:
                missing_assets.append({
                    "originalUrl": img_url,
                    "intendedLocalPath": f"/{local_rel_path}",
                    "filename": filename,
                    "httpStatus": resp.status_code,
                    "reason": f"HTTP status {resp.status_code} or not an image ({resp.headers.get('Content-Type')})"
                })
        except Exception as e:
            missing_assets.append({
                "originalUrl": img_url,
                "intendedLocalPath": f"/{local_rel_path}",
                "filename": filename,
                "httpStatus": None,
                "reason": str(e)
            })

    print(f"Downloaded {len(asset_manifest)} assets. Missing/failed: {len(missing_assets)}")
    
    with open("content/asset-manifest.json", "w", encoding="utf-8") as f:
        json.dump(asset_manifest, f, indent=2)
        
    # Write missing-assets.md
    with open("docs/missing-assets.md", "w", encoding="utf-8") as f:
        f.write("# Missing and Inaccessible Assets Report\n\n")
        f.write("This report documents assets referenced on the source website or seed manifest that could not be downloaded.\n\n")
        f.write(f"Total discovered: {len(discovered_images)} | Successfully downloaded: {len(asset_manifest)} | Missing: {len(missing_assets)}\n\n")
        f.write("| Original URL | Intended Local Path | Status / Reason |\n")
        f.write("| --- | --- | --- |\n")
        for item in missing_assets:
            f.write(f"| `{item['originalUrl']}` | `{item['intendedLocalPath']}` | {item.get('httpStatus', 'Error')}: {item.get('reason')} |\n")

    print("Asset manifest & missing-assets.md generated.")

if __name__ == '__main__':
    main()
