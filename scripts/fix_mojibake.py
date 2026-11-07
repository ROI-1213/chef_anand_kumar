import glob

char_fixes = [
    (chr(226) + chr(128) + chr(148), " — "), # em dash
    (chr(226) + chr(128) + chr(147), " – "), # en dash
    (chr(226) + chr(128) + chr(153), "'"),   # right apostrophe
    (chr(226) + chr(128) + chr(156), '"'),   # left quote
    (chr(226) + chr(128) + chr(157), '"'),   # right quote
    (chr(194) + chr(160), " "),              # non-breaking space
    (chr(160), " "),
    ("  ", " ")
]

for filepath in glob.glob("content/**/*.json", recursive=True):
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
    for old, new in char_fixes:
        text = text.replace(old, new)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(text)

print("Character encoding fully sanitized.")
