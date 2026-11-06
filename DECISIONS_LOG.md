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
