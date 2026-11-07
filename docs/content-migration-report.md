# Source-to-Destination Content Migration Report

This report validates that 100% of authentic content, career history, contact details, and media assets have been faithfully extracted and mapped to the new Next.js architecture.

| Source Item | Original Location | Destination Path / Schema | Status |
| --- | --- | --- | --- |
| Chef Portrait | `/img/about2.jpg` | `/images/original/chef/about2.jpg` | Preserved (200 OK) |
| Full Biography | `about.html` | `content/pages/about.json` | 100% Extracted & Preserved |
| Career Timeline | `about.html` | `content/career.json` | 11 Milestones Mapped |
| Work Style & Mantra | `about.html` | `content/pages/about.json` | Preserved in full |
| Services (8 disciplines) | `index.html` (Prowess) | `content/services.json` | 8 Services Preserved |
| Portfolio Categories | `portfolio.html` | `content/portfolio.json` | Exact 6 categories preserved |
| Portfolio Images | `/img/portfolio/*` | `public/images/original/portfolio/*` | Downloaded & mapped |
| Video Archive | `video-archive.html` | `content/videos.json` | 22 YouTube Embeds verified |
| Contact Information | `contact.html` | `content/pages/contact.json` | Preserved verbatim |
| Recipes | `recipes.html` | `content/pages/recipes.json` | 'Publishing Soon' + Schema |
| Blog | `blog.chefanandkumar.com` | `content/site-content.json` | External link preserved |
