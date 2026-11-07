import json

def fix_text(s):
    if isinstance(s, str):
        return (s.replace('\u00e2\u20ac\u201d', '—')
                 .replace('\u00e2\u20ac\u2122', "'")
                 .replace('\u00e2\u20ac\u0153', '"')
                 .replace('\u00e2\u20ac\u009d', '"')
                 .replace('\u00c2\u00a0', ' ')
                 .replace('\u00a0', ' ')
                 .replace('\ufffd', ''))
    elif isinstance(s, list):
        return [fix_text(x) for x in s]
    elif isinstance(s, dict):
        return {k: fix_text(v) for k, v in s.items()}
    return s

paths = [
    'content/services.json', 'content/career.json', 'content/portfolio.json', 
    'content/videos.json', 'content/pages/home.json', 'content/pages/about.json',
    'content/pages/portfolio.json', 'content/pages/recipes.json', 'content/pages/videos.json',
    'content/pages/contact.json', 'content/site-content.json'
]

for path in paths:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    data = fix_text(data)
    if path.endswith('about.json'):
        data['workStyle']['pillars'] = [
            'Hands-on leadership leading by example in busy service and pre-openings',
            'People development and mentorship — cultivating next-generation culinary leaders',
            'Organized, process-driven operations with uncompromising food safety and hygiene',
            'Rigorous cost management, inventory control, and operational profitability',
            'Sustainable procurement, local ingredient respect, and waste reduction',
            'Creative menu conceptualization blending authentic storytelling with modern technique',
            'Positive kitchen culture anchored in respect, emotional intelligence, and calm under pressure',
            'Lifelong learning across global food cultures, culinary forums, and masterclasses'
        ]
        bio_paras = [p for p in data['biography']['paragraphs'] if not any(p.startswith(prefix) for prefix in [
            'My work style', 'With more than two decades', 'I am a hands-on', 
            'People development', 'I am highly organized', 'Creativity is equally', 
            'I believe in fostering', 'Above all, I never', 'My goal is not simply'
        ])]
        work_style_paras = [p for p in data['biography']['paragraphs'] if p not in bio_paras]
        data['biography']['paragraphs'] = bio_paras
        data['workStyle']['paragraphs'] = work_style_paras
        
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

print('Cleaned up text and character encoding across all content JSONs.')
