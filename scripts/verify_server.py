import requests
import json

BASE_URL = "http://localhost:3000"

def test_routes():
    print("--- Verifying Server Routes ---")
    pages = [
        ("/", 200),
        ("/about", 200),
        ("/portfolio", 200),
        ("/recipes", 200),
        ("/video-archive", 200),
        ("/contact", 200),
        ("/blog", 200),
        ("/sitemap.xml", 200),
        ("/robots.txt", 200),
        ("/images/original/chef/about2.jpg", 200),
        ("/images/original/fullwidth/model1.jpg", 200),
        ("/images/original/portfolio/signature1.jpg", 200),
    ]

    all_passed = True
    for path, expected_status in pages:
        url = f"{BASE_URL}{path}"
        try:
            r = requests.get(url, timeout=5, allow_redirects=False)
            status = r.status_code
            passed = (status == expected_status)
            print(f"[{'PASS' if passed else 'FAIL'}] {path} -> {status} (expected {expected_status})")
            if not passed:
                all_passed = False
        except Exception as e:
            print(f"[ERROR] {path} -> {e}")
            all_passed = False

    print("\n--- Verifying Legacy Redirects ---")
    redirects = [
        ("/about.html", "/about"),
        ("/portfolio.html", "/portfolio"),
        ("/recipes.html", "/recipes"),
        ("/video-archive.html", "/video-archive"),
        ("/contact.html", "/contact"),
    ]

    for path, target in redirects:
        url = f"{BASE_URL}{path}"
        try:
            r = requests.get(url, timeout=5, allow_redirects=False)
            loc = r.headers.get("Location")
            passed = r.status_code in [307, 308] and (loc == target or loc == f"{BASE_URL}{target}")
            print(f"[{'PASS' if passed else 'FAIL'}] {path} -> {r.status_code} Location: {loc} (expected {target})")
            if not passed:
                all_passed = False
        except Exception as e:
            print(f"[ERROR] {path} -> {e}")
            all_passed = False

    print("\n--- Verifying Contact API Endpoint ---")
    try:
        # 1. Invalid payload
        r = requests.post(f"{BASE_URL}/api/contact", json={"name": "A"}, timeout=5)
        print(f"[{'PASS' if r.status_code == 400 else 'FAIL'}] POST /api/contact (invalid) -> {r.status_code}")

        # 2. Valid payload
        valid_payload = {
            "name": "Julian Montgomery",
            "email": "julian@luxuryhotels.com",
            "phone": "+971 50 123 4567",
            "enquiryType": "Restaurant & Hospitality Consulting",
            "message": "We would like to consult with Chef Anand Kumar regarding a new luxury dining concept."
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=valid_payload, timeout=5)
        data = r.json()
        passed = r.status_code == 200 and data.get("success") is True
        print(f"[{'PASS' if passed else 'FAIL'}] POST /api/contact (valid) -> {r.status_code}, response: {data.get('message')}")
        if not passed:
            all_passed = False
    except Exception as e:
        print(f"[ERROR] /api/contact -> {e}")
        all_passed = False

    if all_passed:
        print("\nALL VERIFICATIONS PASSED WITH 100% SUCCESS.")
    else:
        print("\nSOME VERIFICATIONS FAILED.")

if __name__ == '__main__':
    test_routes()
