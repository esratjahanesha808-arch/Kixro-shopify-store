{%- comment -%}
  Mistakes made in color filter work — read before changing color filter code.
{%- endcomment -%}

# Color Filter — Do Not Repeat These Mistakes

## Source of truth
- **ONLY** use Shopify **Color variant option values** (`product.options_with_values` where option name is Color/colour).
- **NEVER** infer colors from product titles/tags (e.g. "Nubuck" → Brown). This mislabels products and breaks user trust.
- **NEVER** show colors from theme settings unless that exact value exists on at least one product variant.

## Deduplication
- **One swatch per color** — normalize `Grey` and `Gray` to the same key; keep the Shopify casing from the first product found.
- **Do NOT** append the full settings palette to the swatch list (caused duplicate Beige/Grey/Bronze).
- Dedupe at **build time** (`kixro-store-color-list.liquid`) and at **render time** (swatch loop) — not one OR the other.

## Product matching
- Build catalog JSON from **`collections.all.products`** (full store), not only `collection.products`.
- Every grid `<li>` must have `data-kixro-colors` from `kixro-product-colors` (Shopify variants only).
- Client filter shows products where **any variant color** equals the selected swatch (exact match, case-insensitive; Grey=Gray).

## If a color is "missing" (e.g. Red)
- Verify in Shopify Admin: product must have **Option name: Color** with value **Red** — not just color in the product title.
- Run: `GET /collections/all/products.json` and inspect `options` / `variants`.

## Debug / DevTools errors
- **NEVER** add debug `fetch('http://127.0.0.1:...')` in production JS — causes infinite "local network requests" errors when combined with MutationObserver.
- MutationObserver must watch **`#product-grid` only** (not `#ProductGridContainer` toolbar) to avoid filter loops.

## Files
- `snippets/kixro-product-colors.liquid` — reads Shopify Color option
- `snippets/kixro-store-color-list.liquid` — deduped swatch list for entire store
- `snippets/kixro-product-color-variants.liquid` — variant images for swatch swap
- `assets/kixro-facets.js` — client-side filter (virtual categories + swatch UX)
