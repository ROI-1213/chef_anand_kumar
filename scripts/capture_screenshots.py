import subprocess
import os
import time

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BASE_URL = "http://localhost:3000"
OUTPUT_DIR = "docs/screenshots"

os.makedirs(OUTPUT_DIR, exist_ok=True)

pages = [
    ("home", "/"),
    ("about", "/about"),
    ("portfolio", "/portfolio"),
    ("recipes", "/recipes"),
    ("videos", "/video-archive"),
    ("contact", "/contact")
]

resolutions = [
    ("desktop", "1440,900"),
    ("mobile", "390,844")
]

for name, path in pages:
    url = f"{BASE_URL}{path}"
    for res_name, size in resolutions:
        out_file = os.path.abspath(f"{OUTPUT_DIR}/{name}_{res_name}.png")
        cmd = [
            CHROME_PATH,
            "--headless=new",
            "--disable-gpu",
            f"--window-size={size}",
            "--virtual-time-budget=3000",
            "--hide-scrollbars",
            f"--screenshot={out_file}",
            url
        ]
        print(f"Capturing {name} {res_name} ({size}) -> {out_file}...")
        try:
            subprocess.run(cmd, check=True, timeout=20)
            if os.path.exists(out_file) and os.path.getsize(out_file) > 1000:
                print(f"  [SUCCESS] {name}_{res_name}.png size: {os.path.getsize(out_file)} bytes")
            else:
                print(f"  [WARNING] File empty or not created: {out_file}")
        except Exception as e:
            print(f"  [ERROR] {e}")

print("Screenshot capture sequence complete.")
