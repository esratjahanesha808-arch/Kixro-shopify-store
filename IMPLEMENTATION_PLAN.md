# Kixro — Implementation Plan

> **Last Updated:** 2026-07-24 (Session 31 — checklist audit sync)
> **Status:** ✅ Complete — portfolio / live demo ready (Phase 8 signed off)

---

## Phase Overview

| Phase | Name | Status | Dependencies |
|-------|------|--------|-------------|
| 1 | Project Setup & Design System | ✅ Complete | None |
| 2 | Homepage Development | ✅ Complete | Phase 1 approved |
| 3 | Homepage Testing & Refinement | ✅ Complete | Phase 2 complete |
| 4 | Shop Page Development | ✅ Complete | Phase 3 complete |
| 5 | Shop Page Testing & Refinement | ✅ Complete | Phase 4 complete |
| 6 | About Us Page Development | ✅ Complete | Phase 5 complete |
| 7 | Additional Pages | ✅ Complete* | Phase 6 complete — *Account branding optional |
| 8 | Final Testing & Optimization | ✅ Complete | Owner sign-off 2026-07-24 |

---

## Project Status Audit — 2026-07-24 (synced with deliverable checklists)

### ✅ Fully Complete

- **Phase 1** — CLI, design system, memory files, store connection
- **Phase 2** — All 8 homepage sections (header via Dawn + Kixro CSS, 6 `kixro-*` sections, `kixro-footer`)
- **Phase 3** — Visual polish + Phase 8 QA pass (responsive, theme check, a11y/perf improvements, owner sign-off)
- **Phase 4** — Shop page with banner, grid, native facets (color/size/price/availability), sort, mobile drawer
- **Phase 5** — Shop refinements: color swatch filter, size picker, client-side color matching, variant image swap, spacing
- **Phase 6** — About Us (5 sections), policy pages, footer policy links
- **Phase 7 (core)** — Contact, Search, Cart (qty stepper + sticky summary), 404
- **Phase 8** — Theme check 0 offenses, responsive QA, Lighthouse runs, SEO, bug fixes, owner sign-off (2026-07-24)

### ⚠️ Partial / Deferred (intentionally not blocking portfolio)

- **Phase 7.4 Account pages** — Login/register still Dawn defaults; optional `kixro-account-page` + `page.account-dashboard` template added
- **Phase 7.1 Map** — Optional map on Contact page not implemented
- **Phase 8 Lighthouse mobile performance** — Audits run; scores 60–74 mobile (below ≥90 target) — optional optimization pass
- **Phase 8 cross-browser** — Chrome + Edge pass; Firefox/Safari not tested on Windows host
- **Phase 8 screen reader** — Manual testing not performed

### Key Files Inventory

| Area | Files |
|------|-------|
| Homepage | `sections/kixro-hero.liquid`, `kixro-category-grid.liquid`, `kixro-newly-dropped.liquid`, `kixro-discover-picks.liquid`, `kixro-featured-collection.liquid`, `kixro-brand-cta.liquid`, `kixro-footer.liquid`, `templates/index.json` |
| Shop | `sections/kixro-collection-banner.liquid`, `kixro-collection-grid.liquid`, `templates/collection.json`, `assets/kixro-facets.js` |
| About | `sections/kixro-about-*.liquid` (5), `templates/page.about-us.json` |
| Additional | `kixro-contact-page.liquid`, `kixro-search-results.liquid`, `kixro-cart-page.liquid`, `kixro-404.liquid` + matching templates |
| Shared | `snippets/product-card.liquid`, `assets/kixro.css`, `assets/kixro-cart-page.js` |

---

## Phase 1 — Project Setup & Design System

### Objectives
- Verify or initialize Shopify CLI project structure
- Create and populate all project memory files
- Analyze the reference image
- Create the complete Kixro Design System
- Present the Design System for approval
- Verify Shopify CLI store connection

### Deliverables
- [x] All 10 memory files created and populated
- [x] Reference image analyzed
- [x] `DESIGN_SYSTEM.md` completed
- [x] `IMPLEMENTATION_PLAN.md` created with correct phase order
- [x] `ASSET_MAP.md` with complete asset inventory
- [x] `CONTENT_STRUCTURE.md` with page-by-page content mapping
- [x] Design System approved by owner
- [x] Shopify CLI project structure verified
- [x] Shopify CLI dev server confirmed loading real store data (products, collections, images, prices, inventory)

### Dependencies
- None (this is the starting phase)

### Testing Checkpoints
- All memory files readable and complete
- Design System CSS custom properties are valid
- Shopify CLI connects to Kixro store successfully
- Preview URL loads real product data

### Completion Criteria
- Owner approves the Design System
- Shopify CLI dev server runs and shows real store data
- All memory files are populated and consistent

---

## Phase 2 — Homepage Development

> **Status:** ✅ Complete — verified 2026-07-23

### Objectives
Build the complete Homepage with all 8 sections in the exact order specified.

### Build Order & Deliverables

#### 2.1 — Header & Navigation
- [x] Sticky header with transparent-to-solid scroll behavior
- [x] Logo (text wordmark or image if provided)
- [x] Desktop navigation with Shop dropdown (Shoes, Boots, Loafers, Sandals)
- [x] Nav links: Home, Shop, New Arrivals, Best Sellers, About Us, Contact
- [x] Search icon, Account icon, Cart icon
- [x] Mobile hamburger menu with slide-out drawer
- [x] Responsive behavior at all breakpoints
- **File:** `sections/header.liquid`
- **File:** `layout/theme.liquid` (section group for header)

#### 2.2 — Hero Section
- [x] Support for 3 editable PNG hero images via section settings
- [x] Editorial-style composition inspired by reference
- [x] Main headline (editable, Playfair Display display size)
- [x] Supporting text (editable, Inter body)
- [x] Primary CTA button (editable text + URL)
- [x] Slide/transition system between 3 images
- [x] Responsive image handling (srcset or picture element)
- [x] Subtle entrance animations (respect reduced-motion)
- **File:** `sections/hero.liquid`

#### 2.3 — Category Section
- [x] 4 category cards: Shoes, Boots, Loafers, Sandals
- [x] Each card: category image, label, link to collection
- [x] Layout inspired by reference (asymmetric or grid)
- [x] Hover effects with subtle scale/shadow
- [x] Responsive: 4 cols → 2 cols → 1 col
- [x] Fully editable via section schema (blocks for each category)
- **File:** `sections/category-grid.liquid`

#### 2.4 — Newly Dropped Collections
- [x] Section heading + subtitle (editable)
- [x] Collection picker in schema
- [x] 6 products displayed using `snippets/product-card.liquid`
- [x] 3-column grid (desktop), 2 cols (tablet), 1–2 cols (mobile)
- [x] "See More Collections" CTA button (editable)
- [x] Product card: price, name, Add to Cart, Buy Now
- **File:** `sections/newly-dropped.liquid`
- **File:** `snippets/product-card.liquid` ← **CREATED HERE, REUSED EVERYWHERE**

#### 2.5 — Discover Your Kixro Picks
- [x] 4 promotional editorial-style cards
- [x] Cards: New Arrivals, Best Sellers, Trending Now, Kixro Essentials
- [x] Large image-led design with text overlay
- [x] CTA on each card linking to filtered Shop page
- [x] Layout: 2×2 grid or staggered editorial layout
- [x] Responsive behavior
- **File:** `sections/discover-picks.liquid`

#### 2.6 — Featured Collection
- [x] Section heading + subtitle (editable)
- [x] Collection picker (different from Newly Dropped)
- [x] 6 products using the SAME `snippets/product-card.liquid`
- [x] "See More Collections" CTA
- [x] 3-column grid matching Newly Dropped layout
- **File:** `sections/featured-collection.liquid`

#### 2.7 — Brand CTA Banner
- [x] Full-width dark section with background image
- [x] Editorial-style headline (Playfair Display, white text)
- [x] CTA button (editable)
- [x] Background image from `asset/banner/banner-style-cta.png`
- [x] Gradient overlay for text readability
- [x] Responsive text sizing
- **File:** `sections/brand-cta-banner.liquid`

#### 2.8 — Footer
- [x] Multi-column layout
- [x] Brand description / tagline
- [x] Link columns: Company, Legal, Help
- [x] Newsletter email signup
- [x] Social media links
- [x] Copyright with dynamic year
- [x] Dark background treatment
- [x] Responsive stacking
- **File:** `sections/footer.liquid`
- **File:** `layout/theme.liquid` (section group for footer)

### Supporting Files
- [x] `layout/theme.liquid` — Main layout with head, fonts, CSS
- [x] `assets/base.css` — Design system CSS custom properties + resets
- [x] `templates/index.json` — Homepage template referencing all sections
- [x] `config/settings_schema.json` — Global theme settings
- [x] `config/settings_data.json` — Default setting values

### Dependencies
- Phase 1 must be complete and Design System approved
- Shopify CLI store connection verified

### Testing Checkpoints
- Each section renders correctly at 375px, 768px, 1024px, 1440px
- All schema settings are editable in the Shopify customizer
- Product card displays real product data (images, prices, titles)
- All links point to correct destinations
- All images load correctly
- Footer renders with proper multi-column layout

### Completion Criteria
- All 8 homepage sections render correctly
- All sections are fully editable via Shopify customizer
- Product card snippet is created and used by both collection sections
- Responsive at all 4 breakpoints
- No visual bugs at any breakpoint

---

## Phase 3 — Homepage Testing & Refinement

> **Status:** ✅ Complete — visual polish + Phase 8 QA (a11y, perf, theme check, owner sign-off)

### Objectives
- Polish the Homepage to production quality
- Fix any visual, responsive, or functional issues

### Deliverables
- [x] Responsive testing at 375px, 768px, 1024px, 1440px (informal during build + Phase 8 formal pass)
- [x] Typography and spacing refinement against Design System (sessions 3–4)
- [x] Hover/focus states on hero CTAs and navbar active state
- [x] Accessibility audit (contrast, ARIA, focus states, skip-nav) — completed in Phase 8 (hero keyboard nav, aria-live, focus-visible, cart announcements)
- [x] Performance optimization (image loading, CSS delivery) — completed in Phase 8 (async fonts, lazy/async images, srcset)
- [x] `shopify theme check` passes with no critical errors — **0 offenses (2026-07-23)**
- [x] Cross-browser spot check (Chrome, Firefox, Safari/Edge) — **partial:** Chrome + Edge pass; Firefox/Safari unavailable on Windows host

### Dependencies
- Phase 2 complete

### Testing Checkpoints
- Visual regression check against reference image feeling
- Lighthouse performance score ≥ 85
- Lighthouse accessibility score ≥ 90
- `shopify theme check` output clean

### Completion Criteria
- Homepage is production-ready
- All tests passing
- Owner approval on Homepage design and functionality

---

## Phase 4 — Shop Page Development

> **Status:** ✅ Complete — verified 2026-07-23

### Objectives
- Build the Shop page (collection template) with filtering, sorting, and the shared product card

### Deliverables
- [x] Editorial-style collection banner at the top
- [x] Product grid using `snippets/product-card.liquid` (same as Homepage)
- [x] Filters sidebar: Size, Color, Price, Availability (In Stock)
- [x] Sort dropdown: Featured, Price Low-High, Price High-Low, Newest, Best Selling
- [x] Mobile filter drawer (slide-out panel)
- [x] Marketing collection filtering behavior:
  - [x] `/collections/all` → Shows all products
  - [x] `/collections/new-arrivals` → New Arrivals tagged products
  - [x] `/collections/best-sellers` → Best Sellers tagged products
  - [x] `/collections/trending-now` → Trending Now tagged products
  - [x] `/collections/kixro-essentials` → Kixro Essentials tagged products
- [x] Pagination (numbered or infinite scroll)
- [x] Empty state design (no products found)
- [x] Active filter indicators / pills

### Files
- `templates/collection.json`
- `sections/collection-banner.liquid`
- `sections/collection-grid.liquid`
- `sections/collection-filters.liquid` (or integrated into grid)
- `assets/collection.css`
- `assets/collection.js`

### Dependencies
- Phase 3 complete (Homepage approved)
- `snippets/product-card.liquid` already exists from Phase 2

### Testing Checkpoints
- Filters correctly narrow product results
- Sort changes product order
- Mobile filter drawer opens/closes smoothly
- Product card is visually identical to Homepage version
- Marketing collections load correct products

### Completion Criteria
- Shop page fully functional with all filters and sorting
- Product card is the exact same snippet from Homepage
- Marketing collections work via product tags
- Mobile filter drawer works correctly
- Page is responsive at all breakpoints

---

## Phase 5 — Shop Page Testing & Refinement

> **Status:** ✅ Complete — verified 2026-07-23

### Objectives
- Polish the Shop page to production quality

### Deliverables
- [x] Filter combination testing (multiple filters active)
- [x] URL parameter persistence (filters survive page refresh)
- [x] Responsive testing at all breakpoints
- [x] Performance optimization (filter JS, lazy loading)
- [x] Accessibility audit for filter controls
- [x] `shopify theme check` clean

### Dependencies
- Phase 4 complete

### Testing Checkpoints
- All filter combinations return correct results
- Filters work on all marketing collection pages
- Sort + filter combined works correctly
- Mobile drawer is accessible (focus trap, keyboard nav)

### Completion Criteria
- Shop page is production-ready
- All filter edge cases handled
- Owner approval on Shop page

---

## Phase 6 — About Us Page Development

> **Status:** ✅ Complete — verified 2026-07-23

### Objectives
- Build the About Us page using Kixro's brand identity and content from `ABOUT_US_CONTENT.md`

### Deliverables
- [x] Page hero/banner section
- [x] Brand story section
- [x] Brand values section
- [ ] Team section (if content provided) — **N/A:** no team content provided
- [x] CTA section (Shop or Contact)
- [x] Fully editable via Shopify customizer

### Files
- `templates/page.about-us.json`
- `sections/about-hero.liquid`
- `sections/about-story.liquid`
- `sections/about-values.liquid`
- `sections/about-cta.liquid`

### Dependencies
- Phase 5 complete
- Content from `ABOUT_US_CONTENT.md` (currently empty — needs content from owner)

### Testing Checkpoints
- All sections render with proper typography and spacing
- Responsive at all breakpoints
- Images load correctly

### Completion Criteria
- About Us page complete and responsive
- Content matches brand tone
- Owner approval

---

## Phase 7 — Additional Pages

> **Status:** ✅ Complete (core pages) — Account pages deferred to post-launch; map optional

### Objectives
- Build remaining pages needed for a complete store

### Deliverables

#### 7.1 — Contact Page
- [x] Contact form (name, email, message)
- [x] Store information section
- [ ] Map integration (optional)
- **File:** `templates/page.contact.json`, `sections/kixro-contact-page.liquid`

#### 7.2 — Search Page
- [x] Search bar
- [x] Results grid using `snippets/product-card.liquid`
- [x] Empty state design
- **File:** `templates/search.json`, `sections/kixro-search-results.liquid`

#### 7.3 — Cart Page
- [x] Cart items list with product images
- [x] Quantity controls
- [x] Remove item functionality
- [x] Subtotal and total
- [x] Checkout CTA button
- [x] Empty cart state
- **File:** `templates/cart.json`, `sections/kixro-cart-page.liquid`

#### 7.4 — Account Pages (if needed)
- [ ] Login page — **deferred** (Dawn `main-login` in use)
- [ ] Register page — **deferred** (Dawn `main-register` in use)
- [x] Custom account dashboard page — `kixro-account-page.liquid` + `page.account-dashboard.json` (optional branded welcome / order history)
- [x] Classic account empty-state improvements — `main-account.liquid` Shop now → homepage; `/collections/frontpage` redirect in `theme.liquid`

#### 7.5 — 404 Page
- [x] Custom 404 design matching brand
- [x] Search bar and popular links
- **File:** `templates/404.json`, `sections/kixro-404.liquid`

### Dependencies
- Phase 6 complete

### Testing Checkpoints
- All forms submit correctly
- Search returns relevant results
- Cart updates dynamically
- All pages responsive

### Completion Criteria
- All additional pages functional and styled
- Consistent design system usage across all pages

---

## Phase 8 — Final Testing & Optimization

> **Status:** ✅ Complete — owner sign-off 2026-07-24; optional post-launch items noted below

### Objectives
- Ensure the entire theme is production-ready

### Deliverables
- [x] Full site responsive testing (all pages, all breakpoints)
- [x] Cross-browser testing (Chrome, Firefox, Safari, Edge) — **partial:** Chrome/Edge pass; Firefox binary unavailable; Safari unavailable on Windows host
- [x] Fix theme check errors (baseline: **6 errors, 14 warnings** → **0 offenses**, 2026-07-23)
  - [x] `header.liquid` — add `height` on logo `<img>` tags
  - [x] `kixro-discover-picks.liquid` — add `width`/`height` on pick images
  - [x] `kixro-hero.liquid` — add locale key `sections.hero.aria_label`
  - [x] Remove dev files: `kixro-product-test.liquid`, `page.kixro-test.json`
  - [x] Fix all 14 warnings (Dawn + Kixro files)
- [x] `shopify theme check` — zero errors, zero warnings
- [x] Accessibility improvements (hero keyboard nav, aria-live, focus-visible, cart announcements, contrast fix)
- [ ] Screen reader testing on key flows — **manual**
- [x] Color contrast verification — **Lighthouse a11y baseline complete (all key pages ≥ 90)**
- [x] Focus management on modals/drawers — mobile nav and shop mobile filter drawer open/close validated
- [x] Performance optimization (async fonts, lazy/async images, srcset on product cards)
- [ ] CSS/JS minification — **optional post-launch**
- [ ] Critical CSS inlining — **deferred**
- [x] Lighthouse audit run on Homepage, Shop, Product, Cart — **mobile performance 60–74 (below ≥90 target); a11y ≥94, SEO 100**
- [x] SEO verification
  - [x] Meta description fallback on all pages
  - [x] Homepage h1 via hero first slide
  - [x] Product microdata on product-card snippet; JSON-LD on PDP via Shopify
  - [x] Organization + WebSite JSON-LD in theme.liquid
  - [x] Canonical URLs (Shopify native)
  - [x] Sitemap — Shopify auto-generates at `/sitemap.xml` (no theme work required)
- [x] Final bug fixing (QA findings logged) — all 5 Session 21 bugs fixed in Session 22
- [x] Production readiness review — owner sign-off 2026-07-24 (Session 29)

### Dependencies
- All previous phases complete

### Testing Checkpoints
- Lighthouse audit on all key pages
- `shopify theme check` clean
- Manual walkthrough of all user flows
- Cart → Checkout flow works end-to-end

### Phase 8 QA Run — 2026-07-23 (Session 21)

- `shopify theme check`: **202 files, 0 offenses**
- Responsive: **PASS** at 375 / 768 / 1024 / 1440 on Homepage, Shop, About, Contact, Search, Cart, 404
- Cross-browser: **PASS** in Chrome + Edge (key flows); Firefox/Safari blocked by environment limits
- Lighthouse (mobile / desktop):
  - Homepage: **60 / 83** (A11y 96 / 93, BP 54 / 54, SEO 100 / 100)
  - Shop: **62 / 87** (A11y 97 / 95, BP 54 / 54, SEO 100 / 100)
  - Product: **69 / 95** (A11y 94 / 94, BP 54 / 54, SEO 100 / 100)
  - Cart: **74 / 97** (A11y 96 / 96, BP 54 / 54, SEO 100 / 100)
- Open findings requiring fixes:
  1. ~~PDP color swatches missing on `classic-suede-slip-on-loafers`~~ **FIXED 2026-07-23 (Session 22)**
  2. ~~Duplicate homepage `<h1>` (logo + hero)~~ **FIXED 2026-07-23 (Session 22)**
  3. ~~Collection/search spacing defects (`stylesavailable`, `resultsfor`)~~ **FIXED 2026-07-23 (Session 22)**
  4. ~~Collection description text size below requested readability target~~ **FIXED 2026-07-23 (Session 22)**
  5. ~~Terms policy link/route not currently available in footer/storefront~~ **FIXED 2026-07-23 (Session 22)** — link enabled; admin must publish policy for URL to resolve

### Phase 8 Bug Fix Pass — 2026-07-23 (Session 22)
- All 5 QA theme bugs addressed and verified via local preview HTTP checks + user sign-off + `shopify theme check` (0 offenses)

### Completion Criteria
- All pages production-ready
- All tests passing
- Lighthouse scores meet targets
- Owner final sign-off
- Theme ready for publishing

---

## Key Architectural Decisions

### ✅ Confirmed

1. **Product card is a reusable snippet** (`snippets/product-card.liquid`) — created in Phase 2.4, reused in Phase 2.6, Phase 4, and Phase 7.2.

2. **Marketing collections use Shopify automated collections** with product tags (`new-arrivals`, `best-sellers`, `trending-now`, `kixro-essentials`). They use the same collection template as the Shop page.

3. **Marketing collections do NOT appear as filter options** — they are navigated to via navbar links, not filtered within a collection.

4. **Section order on Homepage is fixed:**
   1. Header & Navigation
   2. Hero Section
   3. Category Section
   4. Newly Dropped Collections
   5. Discover Your Kixro Picks
   6. Featured Collection
   7. Brand CTA Banner
   8. Footer

5. **Footer is built as part of Homepage** (Phase 2), not as a final-phase task.

6. **"Discover Your Kixro Picks" comes BEFORE "Featured Collection"** on the Homepage.
