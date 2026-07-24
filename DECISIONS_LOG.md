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
