# Kixro — Decisions Log

> **Purpose:** Chronological record of all design and technical decisions. Append only — never overwrite previous entries.

---

## 2026-07-21 — Phase 1 Setup

### DEC-001: Typography Pairing
- **Decision:** Playfair Display (headings) + Inter (body/UI)
- **Rationale:** The reference website uses a bold editorial serif for display headings and a clean sans-serif for body text. Playfair Display captures the editorial, expressive quality of the reference headings while maintaining a youthful-premium feel. Inter provides excellent readability, extensive weight range, and a modern sans-serif feel for body copy and UI elements.
- **Alternatives Considered:**
  - DM Serif Display + DM Sans — slightly less editorial impact
  - Libre Baskerville + Source Sans Pro — too formal/academic
  - Cormorant Garamond + Lato — too traditionally luxurious
- **Status:** Proposed, awaiting approval

### DEC-002: Spacing Scale Base Unit
- **Decision:** 8px base unit, scale from 4px to 120px
- **Rationale:** The reference website uses very generous whitespace between sections (estimated 80–120px). An 8px base unit provides clean, divisible values and maps well to the generous spacing rhythm observed in the reference.
- **Status:** Proposed, awaiting approval

### DEC-003: Product Card Design
- **Decision:** Dual-button pattern (Add to Cart + Buy Now) matching reference website
- **Rationale:** The reference clearly shows each product card with both "Add to Cart" and "Buy Now" buttons. This pattern increases conversion options — Add to Cart for browsing shoppers, Buy Now for decisive buyers. Primary button (Add to Cart) uses Brand Blue, secondary (Buy Now) uses Accent Teal.
- **Status:** Proposed, awaiting approval

### DEC-004: Product Card as Reusable Snippet
- **Decision:** Single `snippets/product-card.liquid` file used across Homepage (Newly Dropped + Featured Collection), Shop page, and Search results
- **Rationale:** Ensures visual consistency across all product displays. Any design update to the product card automatically propagates everywhere. Matches the reference website where all product cards share identical styling.
- **Status:** Confirmed

### DEC-005: Marketing Collections Architecture
- **Decision:** Marketing collections (New Arrivals, Best Sellers, Trending Now, Kixro Essentials) implemented as Shopify automated collections using product tags
- **Rationale:** Product tags allow dynamic collection membership without manual curation. The same collection template handles all views, with the collection handle determining which products display. These collections are navigated to via navbar links, not exposed as filter options.
- **Tags:** `new-arrivals`, `best-sellers`, `trending-now`, `kixro-essentials`
- **Status:** Confirmed

### DEC-006: Section Order — Discover Picks Before Featured Collection
- **Decision:** "Discover Your Kixro Picks" (promotional editorial cards) comes BEFORE "Featured Collection" (product grid)
- **Rationale:** User requirement. This creates a rhythm: product grid → promotional cards → product grid, breaking visual monotony. The discover picks serve as editorial marketing break between two product-focused sections.
- **Status:** Confirmed

### DEC-007: Footer Built with Homepage
- **Decision:** Footer is developed as part of Phase 2 (Homepage Development), not as a final-phase task
- **Rationale:** User requirement. The footer is a global element that should be completed early so it's available across all pages as they're built.
- **Status:** Confirmed

### DEC-008: Logo Fallback
- **Decision:** Use text-based "KIXRO" wordmark as fallback since `asset/logo/` is empty
- **Rationale:** No logo files provided. A styled text wordmark using the heading font (Playfair Display, bold) in Brand Blue (#1B4965) provides a clean fallback that can be easily swapped when logo assets are available.
- **Status:** Active

### DEC-009: Color Derivations
- **Decision:** Added derived colors not in the original palette: `--color-text-muted` (#1A1A1A99), `--color-border` (#1A1A1A15), `--color-surface` (#F5EDE5)
- **Rationale:** The 5 provided brand colors are insufficient for a complete UI. Muted text at 60% opacity provides proper hierarchy. A subtle border color at 8% opacity provides dividers without visual weight. A slightly darker surface (#F5EDE5) provides section contrast against the cream background.
- **Status:** Proposed, awaiting approval

### DEC-010: Asset Directory Naming
- **Decision:** Reference asset paths as-is despite typos (`lofer`, `sandels`)
- **Rationale:** These are the actual directory names in the filesystem. Renaming would break existing references and require owner coordination. Product images will be uploaded to Shopify admin anyway, so directory names don't affect the final theme.
- **Status:** Confirmed

### DEC-011: Color Filter — Shopify Variant Option Only (2026-07-23)
- **Decision:** Color swatches and filtering use **only** Shopify `Color` variant option values from `collections.all.products`. No title/tag inference. One swatch per normalized color (Grey=Gray). Do not inject theme settings palette as swatches.
- **Rationale:** Title inference (e.g. Nubuck→Brown) mislabeled products and broke trust. Forcing settings palette caused duplicate swatches. Full-store catalog JSON ensures filter matches all products on page.
- **Mistakes documented in:** `workflows/color_filter.md`
- **Status:** Confirmed


### DEC-012: Color Swatches, Metafield Fallback & PDP Gallery Refinements (2026-11-03)
- **Decision:** (1) Add category metafield and title/tag fallbacks in color extraction so single-default products (e.g., Red) populate the collection filter. (2) Expand swatch hex mapping and substring matchers to prevent any color defaulting to light grey (#cccccc). (3) PDP gallery set to 	humbnail_slider with hide_variants: false so all color variants appear as clickable sub-images. (4) Header back button allocated dedicated margin on desktop to avoid navbar overlap. (5) Unified sticky scrolling on .product__info-container to stop description text slipping under purchase buttons. (6) Labeled Navy Blue boots accurately on product and filter.
- **Rationale:** Directly addresses customer feedback on missing red swatch, grey filter swatches, broken PDP scrolling overlap, hidden variant thumbnails, and back button collision.
- **Status:** Confirmed & Pushed

### DEC-013: Header Nav Flow, Sticky Gallery, Large Sub-images & Empty Filter State (2026-11-03)
- **Decision:** (1) Integrate desktop PDP back button as first flex item in .header__inline-menu list to permanently prevent overlap with navbar links. (2) Set PDP left gallery to position: sticky and remove info container max-height / internal scrollbar so the description scrolls naturally with the page. (3) Enlarge PDP thumbnails to 104x104px with 12px rounded corners and active brand highlights. (4) Add dynamic empty state to client-side color filtering when 0 products match. (5) Enforce #1B4965 for all navy variants in swatch logic and fix delimiter concatenation in store color list. (6) Remove collection banner section from collection template for a clean catalog layout.
- **Rationale:** Directly fulfills user feedback regarding navbar overlap, tiny thumbnails, internal scrollbar defect, collection banner suppression, and empty filter state.
- **Status:** Confirmed & Pushed


### DEC-014: Category Filter Architecture (2026-11-06)
- **Decision:** (1) Add a client-side Category filter to the catalog sidebar and mobile drawer (Shoes/Boots/Loafers/Sandals/All) using `kixro-category-filter.liquid` and `kixro-category-filter-mobile.liquid`. (2) Embed product category in `KixroCatalogColors` JSON as a `category` field for JS access. (3) Homepage category card links route to `?category=<slug>` via `kixro-category-url.liquid` using the block's label string. (4) On catalog page load, `kixro-facets.js` reads `?category=` URL param and auto-selects that category filter, showing only matching products. (5) Color and category filters compose (AND logic): selecting both a color and a category shows products matching both.
- **Rationale:** Fulfils user request for category filter in catalog and auto-selection when clicking homepage category cards. Client-side approach is consistent with existing color filter pattern and avoids Shopify Search & Discovery dependency.
- **Status:** Confirmed & Pushed

### DEC-015: Premium Profile Page Design (2026-11-06)
- **Decision:** Fully replace Dawn's default `main-account.liquid` (plain table layout) with Kixro-branded premium profile page. Sections: (1) Navy gradient profile header with initials avatar, customer name, email, sign-out link. (2) Tab navigation (Order History / Account Settings) with JS tab switching. (3) Order History: premium order cards with status badge colors, item preview, total, animated "View Details" link. Empty state: illustrated empty state note (no table). (4) Account Settings: two info cards — Personal Info (name/email/order count/spend) and Saved Addresses (default address + manage link). No Shopify default styling used.
- **Rationale:** User requested a premium custom profile page "not like Shopify profile" with Past Orders, Account Settings, and a simple note when no orders exist.
- **Status:** Confirmed & Pushed


### DEC-016: Header Alignment, Sequential Filter Stacking & Mobile Card Buttons (2026-11-06)
- **Decision:** (1) Hide desktop leading back button via `medium-hide large-up-hide` so only the inline navigation back button renders on PDP desktop. (2) Center and align the mobile header back arrow and hamburger menu with uniform 40x40px touch targets and 4px gap. (3) Force `.facets-container` to flex-column so Category, Color, Availability, and Price stack sequentially in one vertical column instead of parallel grid columns. (4) Override product card action buttons with compact padding (7px 2px on mobile) and 9.5–10.5px font size so both "ADD TO CART" and "BUY NOW" fit comfortably on two-column mobile screens without text clipping. (5) Remove duplicate "About Us" from footer Help & Legal column.
- **Rationale:** Addresses user-provided screenshots and feedback regarding double back button, parallel filter columns, button text cutoff on mobile, footer redundancy, and mobile header spacing.
- **Status:** Confirmed & Pushed


### DEC-017: Simple Native Arrow for PDP Back Navigation (2026-11-06)
- **Decision:** Replace the rotated `icon-caret.svg` in `snippets/kixro-pdp-back-nav.liquid` with a native SVG simple left arrow (`←`). Remove rotate transforms in `assets/kixro.css` and enforce `text-decoration: none` so no underlines or artifacts strike through the arrow.
- **Rationale:** Addresses user feedback and screenshot showing the rotated caret rendering with distorted horizontal stroke lines on the desktop header bar.
- **Status:** Confirmed & Pushed


### DEC-018: Pure Simple Chevron Back Arrow & Underline Elimination (2026-11-06)
- **Decision:** Replace the stem-based arrow (`<line>` + `<polyline>`) in `snippets/kixro-pdp-back-nav.liquid` with a crisp, minimalist SVG chevron (`M8 2L2 8l6 6` on a `10 16` viewBox). Remove classes `link` and `focus-inset` from the anchor tag and enforce `text-decoration: none !important` across all pseudo-states in `assets/kixro.css`.
- **Rationale:** The previous stem arrow combined with Dawn's `.link` text underline produced 3 stacked horizontal bars that looked like "wires" / `E-` to the user. A pure left chevron `<` with zero underlines provides the clean, standard, minimal back button the user requested.
- **Status:** Confirmed & Pushed

---

### DEC-019: Theme Store Preparation & Zero Visual Regression Architecture (2026-11-06)
- **Decision:** (1) Keep Google Fonts (Playfair Display + Inter) and brand color palettes completely unchanged to preserve 100% visual fidelity per user mandate. (2) Implement global `color_scheme` setting and `.color-{{ section.settings.color_scheme }}` root wrapper class on all 21 `kixro-*` sections to satisfy Shopify Theme Store requirements without altering custom `--kixro-*` styling. (3) Fully localize all 225+ section schema strings, settings labels, headers, block settings, and presets with `t:` translation keys registered in `locales/en.default.schema.json`. (4) De-brand all internal demo defaults (e.g., 'Discover Your Kixro Picks' -> 'Discover Our Picks', 'The Kixro Promise' -> 'Our Promise', 'Welcome to Kixro' -> 'Welcome Back', and dynamic meta description). (5) Rename section schema names and presets to clean, generic friendly names (e.g., 'Hero slideshow', 'Category grid', 'Editorial picks'). (6) Replace hardcoded IDs in 404, contact, and search templates with dynamic `{{ section.id }}` tokens. (7) Verified 0 offenses with `shopify theme check` across all 213 files.
- **Rationale:** Resolves all Theme Store blocking requirements while strictly preserving every font, color, layout, and visual design element requested by the user.
- **Status:** Complete on `theme-store-submission` branch.

---

### DEC-020: Footer Color Scheme Isolation, Multi-Color Swatch Matching, Equal Card Heights & Marketing Category Integration (2026-11-06)
- **Decision:**
  1. Footer Contrast Isolation: In `sections/kixro-footer.liquid` and `assets/kixro.css`, enforced `!important` on `.kixro-footer { background: var(--kixro-primary) !important; color: #FBF5EF !important; }` to prevent Dawn's `.color-scheme-1` from painting the footer cream and rendering light text invisible.
  2. Multi-Color & Compound Swatch Matching: Updated `colorsMatch()` in `assets/kixro-facets.js` with special handling for `'multi'`, `'multicolor'`, `'multi-color'`, `'patchwork'`, and `'earth tones'` alongside bi-directional containment and delimiter token splitting (`[\/\,\-\s]+`). Products like `Urban Retro Platform Sneakers – Multi-Color Earth Tones` now correctly match the Multi rainbow swatch.
  3. Product Card Height Normalization & Button Baseline Alignment: In `assets/kixro.css`, standardized `.kixro-product-card__title` with `min-height: 2.8em !important; line-height: 1.4 !important; flex: 0 0 auto !important;`, flex column layout with `height: 100% !important;` on cards and grid items, and `margin-top: auto !important;` on `.kixro-product-card__actions`. All cards across all rows now maintain identical heights and bottom-aligned purchase buttons regardless of title length (1 vs 2 lines).
  4. Marketing Collections Filter Integration: Added "New Arrivals" (10), "Best Sellers" (11), "Trending Now" (12), and "Curated Essentials" (10) to `snippets/kixro-category-filter.liquid` and `snippets/kixro-category-filter-mobile.liquid` with dynamic product counts. Clicking them filters products and updates active states. Updated `snippets/kixro-category-url.liquid` and `sections/kixro-discover-picks.liquid` so homepage editorial cards link directly to these filtered catalog views.
- **Rationale:** Resolves user-reported defects regarding blank footer, empty multi-color filter, misaligned product card heights, and missing marketing categories in the sidebar/mobile filters.
- **Status:** Complete & Deployed to Preview Theme `#150540124336`.

---

### DEC-021: Client-Side Facet Display Override & Color Match Precision (2026-11-06)
- **Decision:**
  1. Hiding Inactive Products: Resolved issue where unselected products were not being hidden because `.kixro-shop__grid-item` had `display: flex !important;` which defeated user-agent `[hidden] { display: none; }`. Added `.kixro-shop__grid-item[hidden], .kixro-shop__grid-item.is-hidden { display: none !important; }` in `assets/kixro.css`, and in `assets/kixro-facets.js` explicitly applied `item.classList.add('is-hidden')` and `item.style.setProperty('display', 'none', 'important')`.
  2. Precision Color Matching: Replaced loose space-delimited token matching with compound slash-separated parsing (`[\/,]+`) and exact shade matching. Specific filters (e.g. `Navy Blue`) no longer falsely match other blue shades (like `Light Blue` or `Sky Blue`). Generic `Blue` matches all blue variants.
  3. Combined Color & Category Metadata: In `getItemColors()` and `getItemCategory()`, merged grid item data attributes (`data-kixro-colors`, `data-kixro-category`) with catalog JSON cache (`catalogByHandle`) using Sets for guaranteed completeness.
  4. Explicit Option Name Fallback: Passed `color_option_name` in `sections/kixro-collection-grid.liquid` so color extraction always uses `'Color'` even when `section.settings.color_option_name` is empty in theme settings data.
- **Rationale:** Addresses user feedback that clicking color filter swatches did not filter products properly.
- **Status:** Complete & Deployed to Preview Theme `#150540124336`.

---

### DEC-022: Asset Compression for Shopify Partners Submission (2026-11-06)
- **Decision:** Compress 11 high-resolution non-alpha image assets in `assets/` (`banner-cta.png`, `category-loafers.png`, `category-sandals.png`, `category-shoes.png`, `hero-1.png`, `hero-2.png`, `hero-3.png`, `pick-best-sellers.png`, `pick-kixro-essentials.png`, `pick-new-arrivals.png`, `pick-trending-now.png`) to web-optimized 88% JPEG encoding while keeping file names and transparency on icons/logos (`category-boots.png`, `logo-brand.png`, `logo.png`).
- **Rationale:** Shopify Partners Theme Store submission web endpoint (`/services/v2/themes`) rejected the initial 25.74 MB zip file with HTTP 413 Payload Too Large. Compressing these 11 assets reduced the package size from 25.74 MB down to 5.85 MB (a 77% reduction), ensuring smooth submission without exceeding ingress body limits while preserving 0 offenses on `shopify theme check`.
- **Status:** Complete & Committed (`aa85c5c`) on `theme-store-submission`.
