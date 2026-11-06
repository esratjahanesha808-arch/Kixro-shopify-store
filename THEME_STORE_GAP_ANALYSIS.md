# Kixro — Theme Store Gap Analysis

> **Branch:** `theme-store-submission`  
> **Date:** 2026-11-06  
> **Reference:** [Shopify Theme Store Requirements](https://shopify.dev/docs/storefronts/themes/store/requirements)  
> **Status:** ⚠️ NOT YET ELIGIBLE — 6 blocking gaps must be resolved before submission

---

## Eligibility Verdict

| Category | Status |
|----------|--------|
| Architecture (OS 2.0, JSON templates, section groups) | ✅ Pass |
| Base theme / licensing | ⚠️ Needs update |
| Originality | ✅ Pass (substantially differentiated from Dawn) |
| Template coverage | ✅ Pass |
| Locale / translation keys | ❌ Blocking |
| Color scheme support | ❌ Blocking |
| Typography (Shopify font system) | ❌ Blocking |
| `theme_info` identity | ❌ Blocking |
| Hardcoded brand copy | ❌ Blocking |
| Accessibility | ⚠️ Partial — improvements needed |
| Performance | ⚠️ Partial — Lighthouse mobile 60–74 |
| SEO | ✅ Pass |
| Responsive | ✅ Pass |
| Required merchant features | ⚠️ Partial — missing cart drawer, predictive search wiring |
| Documentation | ❌ Missing |

---

## Section 1 — Architecture & Licensing

### ✅ 1.1 Online Store 2.0 Architecture
- JSON templates throughout ✅
- Section groups (`header-group.json`, `footer-group.json`) ✅
- Schema-driven sections with `{% schema %}` blocks ✅
- Shopify CLI v3 (`shopify.theme.toml`) ✅

### ⚠️ 1.2 Base Theme & Licensing (Gap — Non-Blocking for Submission, Required for Honesty)
**Finding:** `config/settings_schema.json` `theme_info` block still declares:
```json
{
  "theme_name": "Dawn",
  "theme_version": "15.5.0",
  "theme_author": "Shopify"
}
```
Dawn is MIT-licensed — derivative use is legal. However the Theme Store **requires** you declare your own identity. The `theme_support_url` and `theme_documentation_url` point to Shopify's own help pages.

**Required fix:**
```json
{
  "theme_name": "Kixro",
  "theme_version": "1.0.0",
  "theme_author": "Your Name / Studio",
  "theme_documentation_url": "https://your-docs.com",
  "theme_support_url": "https://your-support.com"
}
```

### ✅ 1.3 Originality
The theme is substantially differentiated from Dawn:
- 29 fully custom sections (`kixro-*`)
- 18 fully custom snippets
- 116 KB original CSS (`kixro.css`) with custom design token system
- Custom JS: 4 original files (facets, cart, product card, size picker)
- Completely different visual identity, layout, and UX patterns

---

## Section 2 — BLOCKING GAP: `theme_info` Identity

**Severity:** 🔴 Blocking  
**File:** `config/settings_schema.json` lines 1–9

The Theme Store will reject any submission where `theme_author` is `"Shopify"`. This is the first thing reviewers check.

**Items to change:**
- `theme_name` → `"Kixro"` (or your chosen commercial name)
- `theme_version` → `"1.0.0"`
- `theme_author` → Your name or company
- `theme_documentation_url` → Your documentation URL
- `theme_support_url` → Your support email or URL

---

## Section 3 — BLOCKING GAP: Locale / Translation Keys

**Severity:** 🔴 Blocking — 225 violations  
**Shopify requirement:** All user-facing strings in section schemas MUST use `t:` translation keys.

### Current State
```
t: keys used in kixro-* sections:    0
Hardcoded English label strings:   225
```

Every `"label"`, `"name"`, `"content"`, `"placeholder"`, and `"info"` in all 29 `kixro-*` sections is a raw English string, e.g.:

```json
{ "type": "text", "id": "heading", "label": "Heading", "default": "Newly Dropped Collections" }
```

**Required format:**
```json
{ "type": "text", "id": "heading", "label": "t:sections.kixro_newly_dropped.settings.heading.label", "default": "t:sections.kixro_newly_dropped.settings.heading.default" }
```

### Affected Sections (all 29)
`kixro-hero`, `kixro-category-grid`, `kixro-newly-dropped`, `kixro-discover-picks`, `kixro-featured-collection`, `kixro-brand-cta`, `kixro-footer`, `kixro-collection-banner`, `kixro-collection-grid`, `kixro-about-hero`, `kixro-about-story`, `kixro-about-values`, `kixro-about-philosophy`, `kixro-about-cta`, `kixro-contact-page`, `kixro-search-results`, `kixro-cart-page`, `kixro-404`, `kixro-account-page`, `kixro-policy-page`, `kixro-shopify-policy`, `kixro-collection-banner`, `announcement-bar` (modified), `main-account` (modified)

### Work Required
1. Add all keys to `locales/en.default.schema.json`
2. Replace raw strings in all 29 section schemas
3. Optionally stub keys in the top 5–10 non-English locale schema files

**Estimated string count to migrate:** ~225 labels + ~180 defaults = ~405 locale entries

---

## Section 4 — BLOCKING GAP: Color Scheme Support

**Severity:** 🔴 Blocking  
**Shopify requirement:** Sections must support the global color scheme system via `"type": "color_scheme"` settings so merchants can restyle sections without editing code.

### Current State
```
Kixro sections with color_scheme setting:  0 out of 29
```

None of the 29 custom Kixro sections expose a `color_scheme` picker. All colors are hardcoded in `kixro.css` via CSS custom properties:
```css
--kixro-color-primary: #1B4965;
--kixro-color-bg: #FBF5EF;
```

The Dawn color schemes in `config/settings_data.json` (scheme-1 through scheme-5) exist but are **completely disconnected** from Kixro sections — they only affect Dawn's native sections.

### Required Fix (per section)
Each section needs:
```json
{
  "type": "color_scheme",
  "id": "color_scheme",
  "label": "t:sections.all.color_scheme.label",
  "default": "scheme-1"
}
```
And the section Liquid must apply the scheme class:
```liquid
<div class="{{ section.settings.color_scheme | prepend: 'color-' }}">
```

### Impact
This is a significant refactor — `kixro.css` currently uses fixed CSS variables. Migrating to the scheme system means color tokens must be driven by the scheme's CSS variables, not hardcoded values.

---

## Section 5 — BLOCKING GAP: Typography (Google Fonts vs Shopify Font System)

**Severity:** 🔴 Blocking  
**Shopify requirement:** Themes must use Shopify's native font picker (`type_header_font`, `type_body_font`) so merchants can change fonts without editing code.

### Current State
Fonts are hardcoded in two places:

**`layout/theme.liquid`** (synchronous Google Fonts CDN call):
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display...">
```

**`assets/kixro.css`** (hardcoded CSS variables):
```css
--kixro-font-heading: 'Playfair Display', Georgia, serif;
--kixro-font-body: 'Inter', -apple-system, sans-serif;
```

Shopify's font setting exists in `settings_data.json` (`"type_header_font": "assistant_n4"`) but is **bypassed entirely** — the theme loads its own fonts unconditionally regardless of what the merchant sets.

### Problems
1. The Google Fonts CDN call is an **external network request** — Theme Store reviewers flag this
2. Merchants cannot change fonts through the theme editor
3. Synchronous font load (not `media="print" onload`) blocks rendering — hurts CWV

### Required Fix
1. Remove Google Fonts `<link>` from `theme.liquid`
2. Use Shopify font API in `theme.liquid`:
   ```liquid
   {{ settings.type_header_font | font_face: font_display: 'swap' }}
   {{ settings.type_body_font | font_face: font_display: 'swap' }}
   ```
3. Update `kixro.css` to reference `--font-heading-family` and `--font-body-family` (Dawn's CSS variables from `base.css`) instead of hardcoded font names

---

## Section 6 — BLOCKING GAP: Hardcoded Brand Copy

**Severity:** 🔴 Blocking  
**Issue:** Kixro-specific brand language is hardcoded throughout the theme, making it unsellable as a generic commercial product.

### Critical Instances

| File | Hardcoded Copy |
|------|---------------|
| `layout/theme.liquid` | `'Premium youthful footwear from Kixro. Shop shoes, boots, loafers, and sandals...'` |
| `sections/kixro-about-hero.liquid` | `"default": "About Kixro"`, `"default": "Premium men's footwear designed for every stride..."` |
| `sections/kixro-about-cta.liquid` | `"default": "Looking for premium men's footwear designed with modern style...Kixro's collection..."` |
| `sections/kixro-search-results.liquid` | `"default": "Search shoes, boots, loafers..."`, `"default": "Search our full collection of premium footwear."` |
| `sections/kixro-404.liquid` | `"default": "Shop All Shoes"` |
| `sections/kixro-newly-dropped.liquid` | `"default": "Newly Dropped Collections"`, `"default": "Fresh Drops"` |
| All `kixro-about-*.liquid` | Kixro-specific brand story, values, philosophy copy |
| All section `"name"` fields | `"Kixro Hero"`, `"Kixro Footer"`, `"Kixro 404 Page"`, etc. |
| All `"presets"` names | `"Kixro About Hero"`, `"Kixro Cart Page"`, etc. |

### Required Fix Strategy
- **Section `"name"` fields**: Change to generic names e.g. `"Hero Slideshow"`, `"Featured Products"`, `"Brand CTA"`
- **`"presets"` names**: Match section names (remove `Kixro` prefix)
- **Default copy**: Replace Kixro/footwear-specific text with generic commerce defaults
- **`layout/theme.liquid`** meta description fallback: Move to a `settings_schema` text setting

---

## Section 7 — Accessibility (Partial Pass)

**Severity:** 🟡 Medium — required improvements  
**Shopify requirement:** Themes must meet WCAG 2.1 AA.

### Current Status
- ARIA usage in kixro sections: **38 instances** ✅
- `<img>` tags: **18** | `alt=` attributes: **18** ✅ (1:1 match)
- Lighthouse Accessibility scores: 94–97 on all pages ✅
- `shopify theme check`: 0 offenses ✅

### Issues Found

| Issue | Location | Severity |
|-------|----------|----------|
| Hardcoded `for="Kixro404Search"` ID | `sections/kixro-404.liquid` line 15 | 🟡 Medium — ID must be unique; use `section.id` |
| `<label class="visually-hidden">Search</label>` hardcoded English | `sections/kixro-404.liquid` line 15 | 🟡 Medium — needs locale key |
| Color filter empty state text hardcoded | `sections/kixro-collection-grid.liquid` | 🟡 Medium |
| `kixro-pdp-back-nav.liquid` back label `"Back"` hardcoded | `snippets/kixro-pdp-back-nav.liquid` line 42 | 🟡 Low |
| Focus trap not verified on mobile filter drawer | `assets/kixro-facets.js` | 🟡 Medium |
| Screen reader testing not performed | — | 🟡 Medium |

---

## Section 8 — Performance (Partial Pass)

**Severity:** 🟡 Medium  
**Shopify requirement:** Themes should achieve Lighthouse Performance ≥ 60 (minimum) with goal of ≥ 85.

### Current Lighthouse Scores
| Page | Mobile Perf | Desktop Perf | A11y | SEO |
|------|------------|-------------|------|-----|
| Homepage | 60 | 83 | 96 | 100 |
| Shop | 62 | 87 | 97 | 100 |
| PDP | 69 | 95 | 94 | 100 |
| Cart | 74 | 97 | 96 | 100 |

### Issues
| Issue | Impact |
|-------|--------|
| Hero images 1.9–2.3 MB uncompressed PNGs | High — largest LCP bottleneck |
| Category images 2.0–2.1 MB PNGs | High |
| Discover picks images 1.9–2.5 MB PNGs | High |
| Google Fonts synchronous load | Medium — render-blocking |
| `kixro.css` 116 KB unminified | Low — no bundler/minifier |
| No `loading="lazy"` on below-fold images in some sections | Medium |

### Required Fixes
1. Convert all `assets/*.png` hero/category/pick images to WebP and compress (target < 200 KB each)
2. Remove synchronous Google Fonts load → use Shopify font system (also fixes Section 5)
3. Add `loading="lazy"` to all non-hero images
4. Add `fetchpriority="high"` to hero LCP image (already on slide 1 — verify)

---

## Section 9 — SEO ✅ Pass

| Check | Status |
|-------|--------|
| `<title>` tag | ✅ Dynamic via `{{ page_title }}` |
| Meta description | ✅ Dynamic with fallback (needs de-branding) |
| Canonical URLs | ✅ `{{ canonical_url }}` |
| Organization JSON-LD | ✅ In `theme.liquid` |
| WebSite + SearchAction JSON-LD | ✅ In `theme.liquid` |
| Product microdata | ✅ On `snippets/product-card.liquid` |
| Sitemap | ✅ Shopify auto-generates |
| Heading hierarchy | ✅ Single H1 per page (fixed Session 22) |
| `<html lang>` | ✅ `{{ request.locale.iso_code }}` |

---

## Section 10 — Responsive ✅ Pass

| Breakpoint | Status |
|------------|--------|
| 375px (mobile) | ✅ Tested and passing |
| 768px (tablet) | ✅ Tested and passing |
| 1024px (laptop) | ✅ Tested and passing |
| 1440px (desktop) | ✅ Tested and passing |
| No horizontal scroll | ✅ Confirmed |
| Mobile-first CSS | ✅ `kixro.css` uses `@media (min-width:...)` |

53 responsive breakpoint rules in `kixro.css` ✅

---

## Section 11 — Required Merchant Features (Partial)

**Shopify requirement:** Themes must support standard Shopify storefront features.

| Feature | Status | Notes |
|---------|--------|-------|
| Product pages | ✅ | Dawn `main-product` with custom Kixro CSS |
| Collection pages | ✅ | `kixro-collection-grid` with filtering |
| Cart | ✅ | Custom `kixro-cart-page` |
| Customer accounts | ✅ | Premium `kixro-account-page` + Dawn fallbacks |
| Search | ✅ | `kixro-search-results` |
| Blog / Article | ✅ | Dawn originals |
| Gift card | ✅ | Dawn `gift_card.liquid` |
| Password page | ✅ | Dawn `password.liquid` |
| **Cart drawer** | ⚠️ | Dawn `cart-drawer.liquid` exists but `sections/cart-drawer.liquid` is only 30 bytes (stub only) — not properly wired |
| **Predictive search** | ⚠️ | Dawn `predictive-search.liquid` exists (13 KB) but not wired into Kixro's custom header |
| Announcement bar | ✅ | Custom with on/off toggle |
| Newsletter | ✅ | Dawn `newsletter.liquid` available |
| Localization | ✅ | 51 locale files |

---

## Section 12 — Documentation (Missing)

**Severity:** 🔴 Required for Theme Store submission

The Theme Store requires:
- A `README.md` with theme overview, features, and setup guide
- Documentation URL (in `theme_info`)
- Support URL (in `theme_info`)

**Current state:** No `README.md`. All documentation is in project memory files (`AGENTS.md`, `PROJECT_BRIEF.md`, etc.) which are developer-only files, not merchant-facing docs.

---

## Prioritized Implementation Plan

### 🔴 P0 — Blocking (Must fix before submission)

| # | Task | Effort | Files |
|---|------|--------|-------|
| P0.1 | Update `theme_info` block | 15 min | `config/settings_schema.json` |
| P0.2 | Migrate Google Fonts → Shopify font system | 3 hrs | `layout/theme.liquid`, `assets/kixro.css` |
| P0.3 | Add `color_scheme` setting to all 29 Kixro sections | 6 hrs | All `sections/kixro-*.liquid` |
| P0.4 | Migrate all 225 schema strings → `t:` locale keys | 2 days | All `sections/kixro-*.liquid`, `locales/en.default.schema.json` |
| P0.5 | Remove all hardcoded Kixro brand copy from defaults | 4 hrs | All `sections/kixro-*.liquid`, `layout/theme.liquid` |
| P0.6 | Write merchant-facing `README.md` | 2 hrs | New file |

### 🟡 P1 — Required (Must fix for quality bar)

| # | Task | Effort | Files |
|---|------|--------|-------|
| P1.1 | Compress/convert hero + category images to WebP | 2 hrs | `assets/*.png` → `assets/*.webp` |
| P1.2 | Add `loading="lazy"` to all non-LCP images | 2 hrs | All `sections/kixro-*.liquid` |
| P1.3 | Fix hardcoded `Kixro404Search` ID → dynamic | 30 min | `sections/kixro-404.liquid` |
| P1.4 | Wire cart drawer properly into Kixro header | 2 hrs | `sections/cart-drawer.liquid`, `sections/header.liquid` |
| P1.5 | Wire predictive search into Kixro header | 2 hrs | `sections/header.liquid`, `snippets/header-search.liquid` |
| P1.6 | Rename all section `"name"` and `"presets"` to generic names | 1 hr | All `sections/kixro-*.liquid` |

### 🟢 P2 — Polish (Improve before submission)

| # | Task | Effort | Files |
|---|------|--------|-------|
| P2.1 | Add `loading="lazy"` + `fetchpriority` consistency audit | 1 hr | Sections |
| P2.2 | Add locale keys for inline Liquid strings (back button "Back", filter labels) | 2 hrs | Snippets |
| P2.3 | Stub locale keys in top 5 non-English schema files | 2 hrs | `locales/fr.schema.json`, `de.schema.json`, etc. |
| P2.4 | Remove/relocate `tools/`, `workflows/`, memory docs from theme folder | 30 min | Root dir |
| P2.5 | Minify or document that CSS/JS are unminified (acceptable for Theme Store) | — | — |

---

## Total Effort Estimate

| Priority | Tasks | Estimated Hours |
|----------|-------|----------------|
| P0 Blocking | 6 tasks | ~27 hours |
| P1 Required | 6 tasks | ~10 hours |
| P2 Polish | 5 tasks | ~6 hours |
| **Total** | **17 tasks** | **~43 hours** |

---

## Implementation Plan — Awaiting Your Approval

> **I will not make any changes to the codebase until you approve this plan.**

Before I proceed, please confirm:

1. **Commercial theme name** — Will you keep "Kixro" as the Theme Store product name, or use a different name?
2. **Font strategy** — Migrate to Shopify native fonts (recommended), or keep Google Fonts with a workaround?
3. **Color scheme strategy** — Full color scheme integration on all sections, or only the most common ones (hero, footer, collection grid)?
4. **Scope** — Do you want all P0 + P1 tasks, or P0 only first?
5. **Documentation** — Do you have a support email / documentation URL ready for `theme_info`?

Reply with your answers and I'll begin immediately on `theme-store-submission`.

---

*Gap analysis complete — 0 files modified.*

