# Kixro Theme — Migration Audit Report

> **Generated:** 2026-11-06  
> **Auditor Role:** Senior Shopify Theme Engineer  
> **Purpose:** Full pre-migration audit before reproducing the Kixro storefront in a Shopify Partner development store and preparing the theme for Theme Store commercialization.  
> **Scope:** Read-only audit — no files were modified, deleted, installed, or deployed.

---

## Table of Contents

1. [Theme Architecture Classification](#1-theme-architecture-classification)
2. [Framework, CLI & Build Configuration](#2-framework-cli--build-configuration)
3. [Complete File Inventory](#3-complete-file-inventory)
4. [Admin-Side Data (Not in Repo)](#4-admin-side-data-not-in-repo)
5. [Deployment Assessment](#5-deployment-assessment)
6. [Theme Store Commercialization Gaps](#6-theme-store-commercialization-gaps)
7. [Migration Checklist](#7-migration-checklist)
8. [Risk Register](#8-risk-register)

---

## 1. Theme Architecture Classification

### ✅ Verdict: Native Shopify Online Store 2.0 (OS 2.0) Theme

| Attribute | Finding |
|-----------|---------|
| **Type** | Custom OS 2.0 theme built on top of **Dawn 15.5.0** |
| **Rendering** | Server-side Liquid — no Hydrogen / Headless / React |
| **Templates** | JSON templates throughout (`templates/*.json`) — OS 2.0 compliant |
| **Section Groups** | `sections/header-group.json` + `sections/footer-group.json` — OS 2.0 compliant |
| **Custom App** | None — no app proxy, no app extensions, no custom app blocks |
| **Hydrogen** | None — no `/hydrogen`, no Remix, no React components |
| **CLI** | Shopify CLI v3 with `shopify.theme.toml` |

### Base Theme Heritage

The theme was forked from **Dawn 15.5.0** (confirmed in `config/settings_schema.json` `theme_info` block). All Dawn sections, snippets, and assets remain intact. Kixro adds a parallel layer of custom `kixro-*` sections, snippets, and a primary stylesheet (`assets/kixro.css`) without removing Dawn's base layer.

### Architecture Pattern

```
Dawn 15.5.0 (base)
└── Kixro Customization Layer
    ├── 29 custom kixro-* sections (homepage, shop, about, cart, etc.)
    ├── 18 custom kixro-* snippets (filters, swatches, category tools)
    ├── 4 custom JS files (kixro-facets.js, kixro-cart-page.js, etc.)
    └── JSON templates wiring custom + Dawn sections together
```

---

## 2. Framework, CLI & Build Configuration

### Shopify CLI Configuration

**File:** `shopify.theme.toml`

```toml
[environments.default]
theme = "150211854512"
store  = "kixro-dev.myshopify.com"
```

> **IMPORTANT:** The TOML points to **theme ID `150211854512`** on **`kixro-dev.myshopify.com`**.  
> This is a **development store**. The original portfolio/demo store is at `mcr0nu-c1.myshopify.com` (theme `#151935877198`).  
> There are **two stores** referenced across the memory files — the TOML currently points to the dev store.

### Build System

| Item | Finding |
|------|---------|
| **Build tool** | **None** — no Webpack, Vite, Rollup, Gulp, or Parcel |
| **Package manager** | None — no `package.json`, `yarn.lock`, or `package-lock.json` |
| **Node.js** | Not required by the theme itself |
| **Compilation step** | **Not required** — raw Liquid/CSS/JS ships directly |
| **CSS preprocessor** | None — vanilla CSS with custom properties in `assets/kixro.css` |
| **JS bundler** | None — vanilla ES modules loaded directly by the browser |
| **Code formatter** | Prettier (`/.prettierrc.json`) — dev-time only, not a build step |

### Environment Variables

| Variable | Required By | Where Declared |
|----------|------------|----------------|
| `SHOPIFY_ADMIN_TOKEN` | `tools/create_account_page.mjs`, `tools/create_category_collections.mjs`, `tools/generate_products_csv.mjs` | `.env` file (not in repo) |
| `SHOPIFY_STORE` | `tools/create_category_collections.py`, `tools/generate_products_csv.py` | `.env` file (not in repo) |

> These env vars are only needed to run the **admin API tools** (`tools/`), NOT to deploy the theme. The theme itself has zero runtime environment variables.

### Font Loading

Fonts are loaded asynchronously from **Google Fonts** directly in `layout/theme.liquid` using the `media="print" onload` pattern for performance. No Shopify font hosting. Required fonts:
- **Playfair Display** — 400, 500, 600, 700, 800, 900
- **Inter** — 400, 500, 600, 700

> **NOTE:** `config/settings_data.json` sets `type_header_font` and `type_body_font` to `"assistant_n4"` (a Shopify-hosted font), but the theme's actual visual fonts are Google-loaded via `theme.liquid`. The Dawn font setting is effectively ignored — this is a known architectural discrepancy.

### Git Remote

- **Remote:** `https://github.com/esratjahanesha808-arch/Kixro-shopify-store.git`
- **Branch:** `main`

---

## 3. Complete File Inventory

### Summary Counts

| Directory | File Count |
|-----------|-----------|
| `sections/` | 74 Liquid + 2 JSON group files = **76 files** |
| `snippets/` | **56 files** |
| `templates/` | 25 JSON + 1 Liquid = **26 files** |
| `assets/` | **217 files** |
| `locales/` | **51 files** |
| `layout/` | **2 files** |
| `config/` | **2 files** |

---

### 3.1 Layout Files

| File | Purpose |
|------|---------|
| `layout/theme.liquid` | Main layout — Google Fonts, Kixro CSS, SEO meta, JSON-LD, frontpage redirect |
| `layout/password.liquid` | Password / coming-soon page layout |

---

### 3.2 Templates

#### JSON Templates (OS 2.0)

| Template | Sections Wired |
|----------|---------------|
| `templates/index.json` | `kixro-hero`, `kixro-category-grid`, `kixro-newly-dropped`, `kixro-discover-picks`, `kixro-featured-collection`, `kixro-brand-cta` |
| `templates/collection.json` | `kixro-collection-banner` (disabled), `kixro-collection-grid` |
| `templates/product.json` | Dawn `main-product`, `disclosures`, `related-products` |
| `templates/cart.json` | `kixro-cart-page` |
| `templates/search.json` | `kixro-search-results` |
| `templates/404.json` | `kixro-404` |
| `templates/page.json` | Dawn `main-page` |
| `templates/page.about-us.json` | 5 `kixro-about-*` sections |
| `templates/page.about.json` | Same as `page.about-us.json` (backward-compat alias) |
| `templates/page.contact.json` | `kixro-contact-page` |
| `templates/page.privacy-policy.json` | `kixro-policy-page` |
| `templates/page.refund-policy.json` | `kixro-policy-page` |
| `templates/page.shipping-policy.json` | `kixro-policy-page` |
| `templates/page.account-dashboard.json` | `kixro-account-page` |
| `templates/article.json` | Dawn `main-article` |
| `templates/blog.json` | Dawn `main-blog` |
| `templates/list-collections.json` | Dawn `main-list-collections` |
| `templates/password.json` | Dawn password header/footer |
| `templates/customers/account.json` | Dawn `main-account` |
| `templates/customers/login.json` | Dawn `main-login` |
| `templates/customers/register.json` | Dawn `main-register` |
| `templates/customers/addresses.json` | Dawn `main-addresses` |
| `templates/customers/order.json` | Dawn `main-order` |
| `templates/customers/activate_account.json` | Dawn `main-activate-account` |
| `templates/customers/reset_password.json` | Dawn `main-reset-password` |

#### Liquid Templates

| Template | Purpose |
|----------|---------|
| `templates/gift_card.liquid` | Gift card — Dawn default |

---

### 3.3 Sections

#### Section Groups

| File | Type |
|------|------|
| `sections/header-group.json` | Header group — `announcement-bar` + `header` |
| `sections/footer-group.json` | Footer group — `kixro-footer` |

#### Custom Kixro Sections (29 sections)

| Section File | Page | Purpose |
|-------------|------|---------|
| `sections/kixro-hero.liquid` | Homepage | 3-slide hero with autoplay, editorial headings, dual CTAs |
| `sections/kixro-category-grid.liquid` | Homepage | 4-card category grid (Shoes/Boots/Loafers/Sandals) |
| `sections/kixro-newly-dropped.liquid` | Homepage | Product grid — new arrivals collection |
| `sections/kixro-discover-picks.liquid` | Homepage | 4 editorial promotional cards |
| `sections/kixro-featured-collection.liquid` | Homepage | Product grid — best sellers collection |
| `sections/kixro-brand-cta.liquid` | Homepage | Full-width CTA banner with overlay |
| `sections/kixro-footer.liquid` | Global | Multi-column footer (brand, sitemap, legal, newsletter, social) |
| `sections/kixro-collection-banner.liquid` | Shop | Collection header banner (currently **disabled** in template) |
| `sections/kixro-collection-grid.liquid` | Shop | Product grid + color/category/facets filters + sort + empty state |
| `sections/kixro-about-hero.liquid` | About | About page hero banner |
| `sections/kixro-about-story.liquid` | About | Two-column brand story |
| `sections/kixro-about-values.liquid` | About | Mission + 5 value cards (blocks) |
| `sections/kixro-about-philosophy.liquid` | About | Product philosophy / lifestyle / our promise |
| `sections/kixro-about-cta.liquid` | About | Dual CTA + SEO text |
| `sections/kixro-contact-page.liquid` | Contact | Contact form + store info sidebar |
| `sections/kixro-search-results.liquid` | Search | Search bar + product grid |
| `sections/kixro-cart-page.liquid` | Cart | Cart items, qty stepper, remove, sticky summary |
| `sections/kixro-404.liquid` | 404 | Branded 404 with search + quick links |
| `sections/kixro-account-page.liquid` | Account | Premium profile (avatar initials, Order History tabs, Account Settings) |
| `sections/kixro-policy-page.liquid` | Policies | Renders Shopify policy body content |
| `sections/kixro-shopify-policy.liquid` | Policies | Styles native Shopify policy pages |
| `sections/main-account.liquid` | Account | Customized Dawn account with Kixro premium profile |
| `sections/announcement-bar.liquid` | Global | Announcement bar with show/hide toggle + dismiss button |

> The remaining 51 sections (`main-*.liquid`, `featured-*.liquid`, `collage.liquid`, etc.) are Dawn 15.5.0 originals, some with minor Kixro patches.

---

### 3.4 Snippets

#### Custom Kixro Snippets (18 files)

| Snippet | Purpose |
|---------|---------|
| `snippets/product-card.liquid` | **Master product card** — reused on Homepage, Shop, Search |
| `snippets/kixro-color-filter.liquid` | Desktop color swatch filter |
| `snippets/kixro-color-filter-mobile.liquid` | Mobile drawer color swatch filter |
| `snippets/kixro-color-swatch.liquid` | Individual swatch renderer with hex mapping |
| `snippets/kixro-category-filter.liquid` | Desktop category filter (Shoes/Boots/Loafers/Sandals) |
| `snippets/kixro-category-filter-mobile.liquid` | Mobile drawer category filter |
| `snippets/kixro-category-match.liquid` | Category matching logic for client-side filtering |
| `snippets/kixro-category-url.liquid` | Resolves category card URLs — native collection or `?category=` fallback |
| `snippets/kixro-size-picker.liquid` | Size pill picker (handles single-default-variant products) |
| `snippets/kixro-store-color-list.liquid` | Deduped swatch list from entire store catalog |
| `snippets/kixro-product-colors.liquid` | Extracts color values per product (variant + metafield + title fallback) |
| `snippets/kixro-product-color-variants.liquid` | Color variant sub-image rendering on PDP |
| `snippets/kixro-product-category.liquid` | Resolves product category for filter embedding |
| `snippets/kixro-product-shoe-sizes.liquid` | Shoe size display logic |
| `snippets/kixro-pdp-back-nav.liquid` | PDP back button (SVG chevron, `history.back()` with fallback) |
| `snippets/kixro-about-page-full.liquid` | Fallback About Us content renderer |
| `snippets/kixro-query-param.liquid` | Reads `?category=` URL param via `content_for_header` |
| `snippets/kixro-policy-display.liquid` | Renders policy content |

> The remaining 38 snippets (`facets.liquid`, `card-product.liquid`, `header-drawer.liquid`, etc.) are Dawn 15.5.0 originals, several with Kixro patches (notably `facets.liquid` has significant color/category filter integrations).

---

### 3.5 Assets

#### Custom Kixro CSS

| File | Size | Purpose |
|------|------|---------|
| `assets/kixro.css` | 116 KB | **Primary Kixro stylesheet** — all design tokens, component styles, responsive overrides |

#### Custom Kixro JavaScript

| File | Size | Purpose |
|------|------|---------|
| `assets/kixro-facets.js` | 14 KB | Client-side color + category filtering, URL param parsing, empty state |
| `assets/kixro-cart-page.js` | 1.9 KB | Cart qty stepper (−/+ buttons with auto-update) |
| `assets/kixro-product-card.js` | 1.1 KB | Product card Add to Cart (uses `routes.cart_add_url`) |
| `assets/kixro-size-picker.js` | 1.9 KB | Size pill picker interaction |

#### Theme Images (shipped as theme assets)

| Asset | Size | Used By |
|-------|------|---------|
| `assets/hero-1.png` | 1.9 MB | Hero slide 1 |
| `assets/hero-2.png` | 1.9 MB | Hero slide 2 |
| `assets/hero-3.png` | 2.3 MB | Hero slide 3 |
| `assets/category-shoes.png` | 2.1 MB | Category grid |
| `assets/category-boots.png` | 492 KB | Category grid |
| `assets/category-loafers.png` | 2.1 MB | Category grid |
| `assets/category-sandals.png` | 2.0 MB | Category grid |
| `assets/pick-new-arrivals.png` | 1.9 MB | Discover picks |
| `assets/pick-best-sellers.png` | 2.5 MB | Discover picks |
| `assets/pick-trending-now.png` | 2.4 MB | Discover picks |
| `assets/pick-kixro-essentials.png` | 2.1 MB | Discover picks |
| `assets/banner-cta.png` | 2.1 MB | Brand CTA section |
| `assets/shop-collection-hero.png` | 140 KB | Collection banner fallback |
| `assets/logo.png` | 124 KB | Header logo |
| `assets/logo-brand.png` | 840 KB | Brand logo variant |

> **WARNING:** Several hero, category, and pick images are **1.9–2.5 MB uncompressed PNGs**. Shopify CDN will serve them via their image transformation pipeline. No action needed for functionality, but compression is recommended for Lighthouse performance improvement (mobile scores currently 60–74).

#### Dawn Base Assets (inherited, do not remove)

- `assets/base.css` (87 KB) — Dawn design tokens + resets
- `assets/global.js` (49 KB) — Dawn core interaction layer
- `assets/facets.js` (18 KB) — Dawn native facet/filter system
- 60+ component CSS files (`component-*.css`, `section-*.css`)
- All Dawn icon SVGs (`icon-*.svg`)

---

### 3.6 Config Files

| File | Purpose |
|------|---------|
| `config/settings_schema.json` | Dawn 15.5.0 theme settings schema — 1,455 lines |
| `config/settings_data.json` | Live theme customizations — Kixro color schemes, logo width, page width, etc. |

#### Key `settings_data.json` Values

| Setting | Value |
|---------|-------|
| `logo_width` | `90px` |
| `page_width` | `1200px` |
| `color_schemes.scheme-1` | Background `#FBF5EF` / Text `#1A1A1A` / Button `#1B4965` |
| `color_schemes.scheme-3` | Background `#242833` / Text `#FFFFFF` (dark sections) |
| `color_schemes.scheme-4` | Background `#121212` / Text `#FFFFFF` (deepest dark) |
| `spacing_grid_horizontal` | `8px` |
| `spacing_grid_vertical` | `8px` |
| `variant_pills_radius` | `40` (pill shape) |
| `animations_reveal_on_scroll` | `true` |

---

### 3.7 Locales

51 locale files covering 20+ languages (`en.default.json`, `fr.json`, `de.json`, `ja.json`, etc.) — all Dawn originals. No custom Kixro locale keys have been added to the schema files.

> **IMPORTANT — Theme Store Gap:** Kixro sections use **hardcoded English default text** in schema `default` values rather than locale translation keys. This is a Theme Store requirement gap — all user-facing strings must use `t:` translation keys before submitting to the Theme Store.

---

### 3.8 Out-of-Scope Files (not part of the deployable theme)

| Directory | Purpose | Action |
|-----------|---------|--------|
| `tools/` | Admin API scripts (create pages, generate CSV, remove logo BG) | Do not deploy — dev tooling only |
| `workflows/` | Developer workflow documentation | Do not deploy |
| `AGENTS.md`, `PROJECT_BRIEF.md`, etc. | Memory system / project docs | Do not deploy |
| `.prettierrc.json` | Code formatter config | Dev-time only |
| `.cursor/` | Cursor IDE debug logs | Gitignore-worthy |

---

## 4. Admin-Side Data (Not in Repo)

The following data **lives in Shopify Admin** and cannot be deployed via `shopify theme push`. It must be manually recreated or migrated via API in the new development store.

### 4.1 Products

> **CAUTION:** Products are the most critical admin-side dependency. The theme's color filter, category filter, and product card all depend on specific product data structures.

| Requirement | Detail |
|-------------|--------|
| **Product catalog** | ~20+ footwear products (Shoes: 7, Boots: 4, Loafers: 3, Sandals: 2+) |
| **Product images** | Served from Shopify CDN — must be re-uploaded in new store |
| **Variant structure** | Each product must have a **`Color`** variant option for the color filter to work |
| **Tags** | Products tagged with `new-arrivals`, `best-sellers`, `trending-now`, `kixro-essentials` for marketing collections |
| **Category tags** | Products tagged `shoes`, `boots`, `loafers`, or `sandals` for `?category=` filter |
| **Metafields** | `shopify.color-pattern` metafield used as color fallback in `kixro-product-colors.liquid` |
| **Migration tool** | `tools/generate_products_csv.mjs` / `.py` — generates Shopify-ready product CSV for bulk import |

### 4.2 Collections

| Collection Handle | Type | Required |
|-------------------|------|---------|
| `all` | Automatic (all products) | ✅ Always exists |
| `new-arrivals` | Automated — tag: `new-arrivals` | ✅ Must create |
| `best-sellers` | Automated — tag: `best-sellers` | ✅ Must create |
| `trending-now` | Automated — tag: `trending-now` | ✅ Must create |
| `kixro-essentials` | Automated — tag: `kixro-essentials` | ✅ Must create |
| `boots` | Native or Smart | Recommended |
| `shoes` | Native or Smart (or `?category=shoes` virtual fallback) | Recommended |
| `loafers` | Native or Smart (or `?category=loafers` virtual fallback) | Recommended |
| `sandals` | Native or Smart (or `?category=sandals` virtual fallback) | Recommended |
| `frontpage` | Any collection for the "Shop now" redirect | Shopify default exists |

> `tools/create_category_collections.mjs` / `.py` can create Shoes, Boots, Loafers, Sandals smart collections via the Admin API if `SHOPIFY_ADMIN_TOKEN` and `SHOPIFY_STORE` are set in a `.env` file.

### 4.3 Navigation Menus

| Menu Handle | Required Links |
|-------------|---------------|
| `main-menu` | Home, Shop (dropdown: Shoes/Boots/Loafers/Sandals), New Arrivals, Best Sellers, About Us, Contact |

> **IMPORTANT:** The header references `settings.menu` = `"main-menu"`. The footer's `sitemap_menu` also uses `main-menu`. This menu **must be recreated** in Admin → Navigation in the new store.

### 4.4 Pages

| Page Handle | Template Assigned | Content |
|-------------|------------------|---------|
| `about-us` | `about-us` | Leave body blank — sections provide content |
| `about` | `about` | Same (backward-compat alias) |
| `contact` | `contact` | Leave body blank — section provides form |
| `privacy-policy` | `privacy-policy` | Leave blank — reads `shop.privacy_policy` |
| `refund-policy` | `refund-policy` | Leave blank — reads `shop.refund_policy` |
| `shipping-policy` | `shipping-policy` | Leave blank — reads `shop.shipping_policy` |
| `account-dashboard` | `account-dashboard` | Leave blank — custom Kixro profile section |

> `tools/create_account_page.mjs` can auto-create the `account-dashboard` page via Admin API.

### 4.5 Shopify Policies

The following policies must be populated in **Admin → Settings → Policies** for the policy pages to render content:

- Privacy Policy
- Refund Policy
- Shipping Policy
- Terms of Service

### 4.6 Search & Discovery App

The color filter architecture uses **both** a client-side JS layer (`kixro-facets.js`) and optionally Shopify's native Search & Discovery filter URL parameters. For full color filter functionality:

- Enable **Search & Discovery app** in Admin
- Add a **Color** filter under Collections
- Ensure each product has a `Color` variant option

### 4.7 Customer Accounts

- The theme uses **Classic Customer Accounts** (Shopify legacy accounts), not New Customer Accounts.
- `layout/theme.liquid` has a redirect from `/collections/frontpage` → `/` for the "Shop now" link in the classic account dashboard.

### 4.8 Store Settings

| Setting | Required Value |
|---------|---------------|
| Store currency | BDT (Bangladeshi Taka — `Tk`) based on price displays in memory files |
| Payment gateway | Bogus Gateway acceptable for dev; real gateway for commerce |
| Password protection | Disable for public access |
| Favicon | Upload via Admin → Online Store → Themes → Customize |

---

## 5. Deployment Assessment

### ✅ Direct Deployment — No Build Step Required

The theme deploys directly with Shopify CLI. No compilation, transpilation, or asset bundling is needed.

```bash
# Standard deployment workflow
shopify theme push            # Push to current default theme (from shopify.theme.toml)
shopify theme dev             # Start local dev with live sync
shopify theme pull            # Pull theme editor changes back to local
shopify theme check           # Lint — currently 0 offenses (210 files)
```

### Pre-Deployment Checklist

Before pushing to a **new dev store**, update `shopify.theme.toml`:

```toml
[environments.default]
theme = "<NEW_THEME_ID>"        # ID assigned after first push or created in Admin
store  = "<NEW_DEV_STORE>.myshopify.com"
```

For first push to a brand-new theme slot:

```bash
shopify theme push --unpublished    # Creates new theme in the store without publishing
# OR authenticate first:
shopify auth login --store <new-store>.myshopify.com
shopify theme push --unpublished
```

---

## 6. Theme Store Commercialization Gaps

If the goal is to submit this theme to the Shopify Theme Store, the following **must be resolved** before submission:

> **CAUTION:** These are blocking issues for Theme Store submission. They do not affect running the theme in a dev store.

### 6.1 `theme_info` Block — Must Update (Blocking)

**File:** `config/settings_schema.json` lines 1–9

Currently declares:
```json
{
  "name": "theme_info",
  "theme_name": "Dawn",
  "theme_version": "15.5.0",
  "theme_author": "Shopify"
}
```

Must change to:
```json
{
  "name": "theme_info",
  "theme_name": "Kixro",
  "theme_version": "1.0.0",
  "theme_author": "<Your Name or Studio>",
  "theme_documentation_url": "https://your-docs-url.com",
  "theme_support_url": "https://your-support-url.com"
}
```

### 6.2 Locale Translation Keys (Blocking)

All Kixro section schemas use hardcoded English `default:` values. The Theme Store requires all user-facing strings to use `t:` translation keys referencing `locales/en.default.schema.json`.

**Affected sections:** All 29 `kixro-*` sections and all `snippets/kixro-*.liquid` files.

**Effort:** High — requires auditing every schema block and adding corresponding keys to all 51 locale files.

### 6.3 Dawn Asset Attribution / License

Kixro is built on top of Dawn. Dawn is licensed under the **MIT License** (Shopify). For Theme Store submission, check whether Shopify requires you to re-implement from scratch or allows derivative Dawn themes. As of 2026, Shopify does accept Dawn-derivative themes in the store if they are substantially differentiated.

### 6.4 Demo Store Content

Theme Store requires a **demo store** with realistic content. The current product catalog (~20 footwear products) is store-specific. The Theme Store submission needs:
- Generic placeholder products matching the theme's footwear aesthetic, OR
- A live demo store with the Kixro catalog (if submitting as a branded theme)

### 6.5 Hardcoded Store References

A few Liquid files contain Kixro-specific defaults that should be made generic for a commercial theme:

| Location | Hardcoded Value | Fix |
|----------|-----------------|-----|
| `layout/theme.liquid` | Meta description default copy (Kixro-specific) | Move to `settings_schema` |
| `sections/kixro-brand-cta.liquid` | CTA heading default | Already in schema — OK |
| `snippets/kixro-pdp-back-nav.liquid` | Back button label | Acceptable |

### 6.6 Google Fonts — External Request

The Theme Store review may flag the **Google Fonts CDN call** in `layout/theme.liquid`. Best practice for Theme Store themes is to use Shopify's native font picker (`type_header_font`, `type_body_font` in `settings_schema`) and load fonts via the `font_face` filter. Currently, the Shopify font settings are present in the schema and data but are bypassed by the Google Fonts import.

**Options:**
1. Keep Google Fonts and add `RemoteAsset` disable comments (partially done)
2. Migrate to Shopify's font system — requires updating all CSS `font-family` references in `kixro.css`

### 6.7 `shopify theme check` Baseline

Last verified: **210 files, 0 offenses** (2026-11-03). Re-run after any changes:

```bash
shopify theme check
```

---

## 7. Migration Checklist

### Phase A — New Dev Store Setup

- [ ] **A1.** Create a new Shopify Partner development store at partners.shopify.com
- [ ] **A2.** Record the new store URL (e.g., `kixro-partner-dev.myshopify.com`)
- [ ] **A3.** Install the **Search & Discovery** app on the new store

### Phase B — Theme Deployment

- [ ] **B1.** Update `shopify.theme.toml` — change `store` to new dev store URL
- [ ] **B2.** Run `shopify theme check` locally — confirm 0 offenses before push
- [ ] **B3.** Authenticate CLI to the new store: `shopify auth login --store <new-store>.myshopify.com`
- [ ] **B4.** Push theme: `shopify theme push --unpublished` (creates new theme without publishing)
- [ ] **B5.** In Admin → Online Store → Themes, publish the pushed theme
- [ ] **B6.** Update `shopify.theme.toml` with the new theme ID assigned after push

### Phase C — Navigation & Menus

- [ ] **C1.** Admin → Navigation → Create `main-menu` with links:
  - Home → `/`
  - Shop → `/collections/all` (dropdown parent)
    - Shoes → `/collections/shoes` (or use `?category=shoes` virtual fallback)
    - Boots → `/collections/boots`
    - Loafers → `/collections/loafers`
    - Sandals → `/collections/sandals`
  - New Arrivals → `/collections/new-arrivals`
  - Best Sellers → `/collections/best-sellers`
  - About Us → `/pages/about-us`
  - Contact → `/pages/contact`

### Phase D — Collections

- [ ] **D1.** Create automated collection: `New Arrivals` (handle: `new-arrivals`) — condition: tag equals `new-arrivals`
- [ ] **D2.** Create automated collection: `Best Sellers` (handle: `best-sellers`) — condition: tag equals `best-sellers`
- [ ] **D3.** Create automated collection: `Trending Now` (handle: `trending-now`) — condition: tag equals `trending-now`
- [ ] **D4.** Create automated collection: `Kixro Essentials` (handle: `kixro-essentials`) — condition: tag equals `kixro-essentials`
- [ ] **D5. (Optional)** Create category collections via API tool: `node tools/create_category_collections.mjs` (requires `.env` with `SHOPIFY_ADMIN_TOKEN` + `SHOPIFY_STORE`)

### Phase E — Products

- [ ] **E1.** Prepare product data:
  - Run `node tools/generate_products_csv.mjs` to generate Shopify-ready CSV, OR
  - Manually create each product in Admin
- [ ] **E2.** For each product, ensure:
  - `Color` variant option exists (required for color filter)
  - Correct tags applied (`new-arrivals`, `best-sellers`, `shoes`, `boots`, etc.)
  - Product images uploaded (20+ images total across categories)
- [ ] **E3.** Add `shopify.color-pattern` metafield definition in Admin → Settings → Custom Data → Products
- [ ] **E4.** Verify at least one product per category appears in the catalog

### Phase F — Pages

- [ ] **F1.** Create page: title `About Us`, handle `about-us`, template `about-us`, body blank
- [ ] **F2.** Create page: title `Contact`, handle `contact`, template `contact`, body blank
- [ ] **F3.** Create page: title `Privacy Policy`, handle `privacy-policy`, template `privacy-policy`, body blank
- [ ] **F4.** Create page: title `Return & Refund Policy`, handle `refund-policy`, template `refund-policy`, body blank
- [ ] **F5.** Create page: title `Shipping Policy`, handle `shipping-policy`, template `shipping-policy`, body blank
- [ ] **F6. (Optional)** Create account dashboard page: `node tools/create_account_page.mjs` (requires `SHOPIFY_ADMIN_TOKEN`)

### Phase G — Store Policies

- [ ] **G1.** Admin → Settings → Policies → Add Privacy Policy text
- [ ] **G2.** Admin → Settings → Policies → Add Refund Policy text
- [ ] **G3.** Admin → Settings → Policies → Add Shipping Policy text
- [ ] **G4.** Admin → Settings → Policies → Add Terms of Service text

### Phase H — Theme Customizer Settings

- [ ] **H1.** Open Admin → Online Store → Themes → Customize
- [ ] **H2.** Upload logo image (`logo.png` or `logo-brand.png`) in Header settings
- [ ] **H3.** Upload favicon in Theme Settings → Logo
- [ ] **H4.** Verify announcement bar text is correct
- [ ] **H5.** Verify Hero slides load with correct images and text
- [ ] **H6.** Verify Discover Picks 4 cards render with correct images
- [ ] **H7.** Verify footer tagline, social links, and legal link URLs

### Phase I — Search & Discovery

- [ ] **I1.** In Admin → Apps → Search & Discovery → Filters → Collections
- [ ] **I2.** Enable `Color` filter for `All Products` collection
- [ ] **I3.** Enable `Price` filter
- [ ] **I4.** Enable `Availability` filter

### Phase J — Verification

- [ ] **J1.** Run `shopify theme check` — must return 0 offenses
- [ ] **J2.** Test homepage at 375px, 768px, 1024px, 1440px
- [ ] **J3.** Test Shop page — color filter, category filter, sort
- [ ] **J4.** Test PDP — gallery sub-images, back button, sticky scroll
- [ ] **J5.** Test Cart → Checkout flow
- [ ] **J6.** Test About Us, Contact, Search, 404 pages
- [ ] **J7.** Test customer account flow (login/register/order history)
- [ ] **J8.** Confirm policy pages render with correct text
- [ ] **J9.** Disable storefront password (Admin → Settings → Preferences)

### Phase K — Theme Store Prep (Commercialization)

- [ ] **K1.** Update `config/settings_schema.json` `theme_info` block — change `theme_name`, `theme_author`, `theme_version` away from Dawn
- [ ] **K2.** Audit all 29 `kixro-*` sections — replace hardcoded English strings with `t:` locale keys
- [ ] **K3.** Add all new locale keys to `locales/en.default.schema.json`
- [ ] **K4.** Translate or stub new keys in all 50 non-English locale schema files
- [ ] **K5.** Migrate Google Fonts to Shopify native font picker OR add explicit RemoteAsset disable comments per Shopify review guidelines
- [ ] **K6.** Remove or relocate `tools/`, `workflows/`, and all project documentation files from the deliverable theme folder
- [ ] **K7.** Run final `shopify theme check` — 0 offenses required
- [ ] **K8.** Set up Theme Store demo store with representative content
- [ ] **K9.** Prepare Theme Store submission assets (screenshots, preview video, documentation)

---

## 8. Risk Register

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Color filter depends on products having a `Color` variant option | 🔴 High | Ensure all products have a `Color` variant per Phase E |
| `main-menu` navigation handle is hardcoded in section settings | 🟡 Medium | Recreate `main-menu` exactly as described in Phase C |
| Google Fonts CDN blocks in certain network environments | 🟡 Medium | Fonts degrade gracefully to `Georgia, serif` / `system-ui` |
| Hero/category PNG images are 1.9–2.5 MB | 🟡 Medium | Shopify CDN transforms; consider WebP conversion for Lighthouse |
| Theme ID in `shopify.theme.toml` points to old dev store | 🟡 Medium | Update TOML before any push (Phase B1) |
| Account dashboard page requires manual creation or API script | 🟢 Low | Use `tools/create_account_page.mjs` |
| Locale keys missing for all Kixro section strings | 🔴 High (Theme Store only) | Required for Theme Store — not blocking for dev store reproduction |
| `theme_info` still declares Dawn as theme name/author | 🔴 High (Theme Store only) | Update before submission (Phase K1) |
| `?category=` virtual URL falls back to search if native collection missing | 🟢 Low | Create native collections per Phase D5 to avoid fallback |
| Two stores referenced in memory files vs TOML | 🟡 Medium | TOML controls CLI target — verify which store to push to |

---

*End of Migration Audit — no files were modified during this audit.*

