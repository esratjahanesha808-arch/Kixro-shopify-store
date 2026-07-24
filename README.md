# Kixro — Custom Shopify Online Store 2.0 Theme

![CI](https://github.com/esratjahanesha808-arch/Kixro-shopify-store/actions/workflows/ci.yml/badge.svg)

A fully custom Shopify theme for **Kixro**, a premium footwear and lifestyle brand. Built on Online Store 2.0 with JSON templates, section groups, and a reusable design system.

**Live store:** [mcr0nu-c1.myshopify.com](https://mcr0nu-c1.myshopify.com)

| Page | Link |
|------|------|
| Homepage | [mcr0nu-c1.myshopify.com](https://mcr0nu-c1.myshopify.com) |
| Shop | [mcr0nu-c1.myshopify.com/collections/all](https://mcr0nu-c1.myshopify.com/collections/all) |
| About Us | [mcr0nu-c1.myshopify.com/pages/about-us](https://mcr0nu-c1.myshopify.com/pages/about-us) |

---

## Highlights

- **Custom homepage** — hero, category grid, newly dropped carousel, discover picks, brand CTA, and footer
- **Shop & collection pages** — custom color swatch filter with client-side exact matching and variant image swap on product cards
- **Product detail page** — color swatches, size pills, metafield-driven shoe size availability, and line-item size properties
- **Cart, search, About, Contact, and policy pages** — branded layouts with editable theme settings
- **SEO & accessibility** — JSON-LD, semantic headings, keyboard navigation, focus states, and cart announcements
- **Performance** — async font loading, optimized images, theme check clean (0 offenses)

---

## Stack

| Layer | Technology |
|-------|------------|
| Platform | Shopify Online Store 2.0 |
| Templating | Liquid |
| Styling | CSS custom properties (design token system) |
| Interactivity | Vanilla JavaScript (facets, size picker, product cards) |
| Tooling | Shopify CLI, Theme Check |

---

## Project structure

```
assets/          # CSS, JS, and theme assets
config/          # Theme settings (settings_schema.json, settings_data.json)
layout/          # theme.liquid, password.liquid
locales/         # Translation strings
sections/        # Kixro custom sections + Dawn base sections
snippets/        # Reusable components (product-card, color filter, size picker)
templates/       # JSON page templates
workflows/       # Build SOPs (WAT framework)
tools/           # Helper scripts for collections and content
```

---

## Key custom features

### Color filter
Client-side filtering in `assets/kixro-facets.js` with swatches sourced from the product catalog (`snippets/kixro-color-filter.liquid`). Selecting a color updates the grid without full page reload and swaps each card to that variant's image.

### Shoe size availability
Sizes are driven by Shopify's **Shoe size** category metafield (`snippets/kixro-product-shoe-sizes.liquid`). Unavailable sizes are disabled on the PDP and blocked at add-to-cart (`assets/kixro-size-picker.js`).

### Reusable product card
`snippets/product-card.liquid` is shared across homepage, shop, search, and collection grids for consistent layout and behavior.

---

## Local development

**Requirements:** [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)

```bash
# Clone the repo
git clone https://github.com/esratjahanesha808-arch/Kixro-shopify-store.git
cd Kixro-shopify-store

# Log in and connect to the store (requires collaborator access)
shopify auth login
shopify theme dev
```

Copy `shopify.theme.toml` locally with your store and theme IDs (see `shopify.theme.toml` in this repo for the live theme pattern).

Run theme check before pushing:

```bash
shopify theme check
```

---

## Pages

| Page | Template / section |
|------|-------------------|
| Homepage | `templates/index.json` |
| Shop / collections | `templates/collection.json` |
| Product (PDP) | `templates/product.json` |
| Cart | `templates/cart.json` |
| Search | `templates/search.json` |
| About Us | `templates/page.about-us.json` |
| Contact | `templates/page.contact.json` |
| Policies | `templates/page.*-policy.json` |

---

## License

Theme code © Kixro. All brand assets and content belong to the store owner.
