# Chef Anand Kumar — Ultra-Premium Next.js Website Rebuild

> Executive Chef • Culinary Visionary • Luxury Hospitality Consultant • Founder, ForkTheory

A high-performance, cinematic, interactive digital personal brand website for **Executive Chef Anand Kumar**, rebuilt from the ground up using **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP**, and **Lenis Smooth Scroll**.

This platform preserves 100% of authentic content, career history, verified photography, YouTube video masterclasses, and business contact information from the original website (`https://www.chefanandkumar.com/`).

---

## 🌟 Creative Direction & Brand Positioning

The website expresses a fusion of:
- **A Luxury Five-Star Hospitality Experience**: Deep Obsidian (`#10100F`), Champagne Gold accents (`#C8A76B`), and Warm Ivory (`#F6F1E8`).
- **An International Executive Chef's Portfolio**: Showcasing over two decades of culinary mastery across India, the Maldives, Tanzania, Dubai, and Nigeria.
- **A Prestigious Culinary Editorial Magazine**: Cormorant Garamond display serif typography paired with clean Manrope body copy.
- **A Sophisticated Restaurant Consultancy Platform**: Dedicated presentation of ForkTheory's 8 advisory pillars.

---

## 📐 Technology Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 15 (App Router)** | Hybrid SSG/SSR rendering, Turbopack, image optimization, edge API routes |
| **TypeScript** | Strict type safety for content schemas, portfolio catalogs, and milestones |
| **Tailwind CSS** | Editorial design system with custom luxury tokens and responsive fluid grid |
| **Framer Motion / Motion** | Component-level reveals, mobile navigation staggered choreography, lightboxes |
| **GSAP & ScrollTrigger** | Scroll choreography and editorial section reveals |
| **Lenis** | Physics-based smooth inertial scrolling with reduced-motion support |
| **Lucide React** | Clean, accessible iconography |
| **Zod & React Hook Form** | Robust schema-driven contact form validation |
| **Next.js Metadata & Schema.org** | JSON-LD Person, WebSite, and BreadcrumbList structured data |

---

## 🗂️ Architectural Directory Structure

```text
chefanandkumar/
├── content/                     # Single source of truth content datasets
│   ├── site-content.json        # Master aggregated content & navigation
│   ├── services.json            # 8 ForkTheory advisory disciplines
│   ├── career.json              # 11 verified career milestones
│   ├── portfolio.json           # Catalog of all authentic food/travel/media items
│   ├── videos.json              # 22 verified YouTube video IDs & embeds
│   ├── asset-manifest.json      # Metadata manifest for all downloaded media
│   └── pages/                   # Page-specific structured content
│       ├── home.json
│       ├── about.json
│       ├── portfolio.json
│       ├── recipes.json
│       ├── videos.json
│       └── contact.json
├── docs/                        # Audit and verification documentation
│   ├── source-audit.md          # Comprehensive source audit report
│   ├── content-migration-report.md # Page-by-page migration matrix
│   ├── missing-assets.md        # Asset download audit & report
│   └── screenshots/             # Desktop (1440x900) & mobile (390x844) captures
├── public/                      # Static assets
│   └── images/original/         # 129 verified original photos (chef, portfolio, models)
├── src/
│   ├── app/                     # App router pages & API routes
│   │   ├── page.tsx             # Homepage
│   │   ├── about/page.tsx       # About & Career Biography
│   │   ├── portfolio/page.tsx   # Portfolio exhibition & filters
│   │   ├── recipes/page.tsx     # Recipes 'Publishing Soon' showcase
│   │   ├── video-archive/page.tsx # 22 YouTube video embeds
│   │   ├── contact/page.tsx     # Inquiries & validated contact form
│   │   ├── blog/page.tsx        # Portal to blog.chefanandkumar.com
│   │   ├── api/contact/route.ts # Serverless contact form submission endpoint
│   │   ├── layout.tsx           # Global layout with Google fonts & JSON-LD
│   │   ├── globals.css          # Tailwind, Lenis, grain texture, reduced-motion
│   │   ├── sitemap.ts           # Dynamic XML sitemap
│   │   └── robots.ts            # Robots configuration
│   ├── components/
│   │   ├── layout/              # Header, Navigation, MobileMenu, Footer
│   │   ├── home/                # Hero, Intro, FeaturedPortfolio, CareerPreview, Expertise, FeaturedVideos, ContactCTA
│   │   ├── about/               # Biography, CareerTimeline, Philosophy
│   │   ├── portfolio/           # PortfolioGallery & Lightbox
│   │   ├── video/               # VideoArchiveGrid
│   │   ├── contact/             # ContactForm & ContactDetails
│   │   └── motion/              # RevealText, SectionReveal, MagneticButton, SmoothScroll
│   └── lib/
│       ├── content.ts           # Strongly-typed content accessors
│       ├── seo.ts               # Metadata and structured data builders
│       └── utils.ts             # Tailwind class merge & date utilities
├── next.config.mjs              # Permanent 308 legacy redirects & image domains
├── package.json
└── tsconfig.json
```

---

## 🔄 Legacy Permanent Redirects

All legacy `.html` URLs are permanently redirected (HTTP 308) to modern App Router routes in `next.config.mjs`:
- `/about.html` ➔ `/about`
- `/portfolio.html` ➔ `/portfolio`
- `/recipes.html` ➔ `/recipes`
- `/video-archive.html` ➔ `/video-archive`
- `/contact.html` ➔ `/contact`

---

## 🛠️ Content Management Guide (For Chef Anand Kumar & Team)

All website content is intentionally decoupled from layout components into clean, editable JSON files in the `/content` directory. No coding experience is required to update them:

### 1. Updating Images & Chef Portraits
- Place new high-resolution images in `public/images/original/chef/` or `public/images/original/portfolio/`.
- Reference the path in `content/pages/home.json`, `content/pages/about.json`, or `content/portfolio.json`.

### 2. Updating Biography & Career Timeline
- **Biography paragraphs**: Edit `content/pages/about.json` under `biography.paragraphs`.
- **Career timeline**: Add or update milestones in `content/career.json`. Each entry contains `period`, `role`, `organization`, `location`, and `description`.

### 3. Adding or Updating Portfolio Works
- Add items to `content/portfolio.json` under `items`:
  ```json
  {
    "id": "dish-name",
    "src": "/images/original/portfolio/dish.jpg",
    "title": "Truffle Glazed Wild Turbot",
    "category": "Signature dishes"
  }
  ```
- Categories supported: `Signature dishes`, `Food`, `Brunch`, `Dessert`, `Oktoberfest`, `Travel`, `Photography`.

### 4. Updating ForkTheory & Consulting Services
- Modify `content/services.json`. The homepage dynamically renders all 8 advisory pillars with section numbering and responsive split panels.

### 5. Managing Video Masterclasses
- Add or reorder YouTube video IDs in `content/videos.json`. Each entry automatically fetches high-resolution thumbnails and generates lazy-loaded responsive embeds.

### 6. Publishing Recipes in the Future
- When ready to launch the recipes section, update `content/pages/recipes.json` with the recipe schema:
  - `title`, `slug`, `cuisine`, `prepTime`, `cookTime`, `servings`, `ingredients`, `method`.

### 7. Contact Details & Social Links
- Edit `content/pages/contact.json` or `content/site-content.json` under `contact` to update phone numbers, response SLAs, or studio addresses.

---

## 🚀 Getting Started & Deployment

### Prerequisites
- Node.js 18.18+ or 20+ (Tested on Node v24.15.0)
- npm 9+ or pnpm or yarn

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
# Open http://localhost:3000 in your browser
```

### Production Build & Verification
```bash
npm run build
npm run start
```

### Environment Configuration
Copy `.env.example` to `.env.local` to enable production email dispatch for the contact form:
```env
NEXT_PUBLIC_SITE_URL=https://www.chefanandkumar.com
RESEND_API_KEY=your_resend_key_here
CONTACT_RECEIVER_EMAIL=anand_hotel@yahoo.com
```
*Note: If no email API key is provided, the contact form gracefully logs inquiries server-side without failing or throwing false positives.*

---

## 📱 Responsive Testing & Verification

The application has been verified across key device breakpoints:
- **Mobile (360px – 430px)**: Custom editorial drawer menu, stacked timeline cards, thumb-friendly touch targets.
- **Tablet (768px – 1024px)**: Fluid typography scaling (`clamp()`), adaptive 2-column portfolio grids.
- **Desktop (1440px – 1920px)**: Asymmetrical hero, magnetic hover interactions, split-panel service selectors.

Full-page screenshots are available in `docs/screenshots/`.
