# Kixro — Premium Shopify Online Store 2.0 Theme

![CI](https://github.com/esratjahanesha808-arch/Kixro-shopify-store/actions/workflows/ci.yml/badge.svg)

**Kixro** is a modern, high-performance Shopify Online Store 2.0 theme built for premium lifestyle and footwear brands. Featuring modular JSON templates, global color schemes, complete schema localization, dynamic product facets, and an editorial design system.

---

## Highlights

- **Online Store 2.0 Architecture** — 100% modular JSON templates, section groups (`header-group.json`, `footer-group.json`), and customizable blocks.
- **Global Color Schemes** — Full support for Shopify's color scheme system across all sections for seamless merchant styling.
- **Complete Schema Localization** — All section settings, block controls, and presets are fully localized with `t:` translation keys matching `locales/en.default.schema.json`.
- **Editorial Homepage** — Dynamic Hero slideshow, Category grid, New Arrivals grid, Editorial picks, Brand CTA banner, and multi-column Footer.
- **Advanced Collection Filtering** — High-speed facet filtering with visual swatches, price range, availability, and instant variant image switching.
- **Product Detail Experience** — Variant swatches, shoe size selectors with real-time stock availability, sticky gallery, and natural full-page scrolling.
- **Accessible & SEO Ready** — Semantic HTML5, WCAG 2.1 AA compliant contrast and keyboard navigation, JSON-LD schema (Organization, WebSite, SearchAction, Product), and canonical URLs.
- **Verified Code Quality** — Passes Shopify Theme Check with **0 offenses across 213 files**.

---

## Technical Stack

| Layer | Technology |
|---|---|
| **Platform** | Shopify Online Store 2.0 |
| **Templating** | Liquid OS 2.0, JSON Templates |
| **Styling** | Native CSS Custom Properties (Design Token System) |
| **Interactivity** | Vanilla JavaScript (ES6+, zero heavy framework dependencies) |
| **Tooling** | Shopify CLI v3, Shopify Theme Check |

---

## Project Structure

```
assets/          # CSS custom design tokens, JS modules, and theme assets
config/          # Global theme settings (settings_schema.json, settings_data.json)
layout/          # theme.liquid, password.liquid
locales/         # Storefront and schema localization files (51 locales supported)
sections/        # Custom modular sections + Dawn base sections
snippets/        # Reusable components (product-card, swatches, back-nav, search)
templates/       # JSON page templates
```

---

## Merchant Configuration & Customization

### Color Schemes
Kixro supports global color schemes configured in **Theme settings > Colors**. Each section can be assigned any active color scheme directly within the Shopify Theme Editor.

### Typography
Typography uses non-blocking asynchronous font loading ensuring rapid Largest Contentful Paint (LCP) and smooth rendering across all devices.

### Sections & Presets
All sections feature intuitive merchant controls with descriptive labels, helpful tooltips, and sensible defaults:
- **Hero slideshow** — Autoplay, slide timing, image pickers, fallback asset support, and dual call-to-action buttons.
- **Category grid** — Block-based category cards with hover animations and responsive layouts.
- **Editorial picks** — Promotional banners with curated collection tags and direct shop links.
- **Brand CTA banner** — Full-width statement banner with customizable background and overlay opacity.

---

## Local Development & Testing

### Requirements
- Node.js (v18+)
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) (v3+)

### Getting Started
```bash
# Clone the repository
git clone https://github.com/esratjahanesha808-arch/Kixro-shopify-store.git
cd Kixro-shopify-store

# Log in to your Shopify Partner or development store
shopify auth login --store your-store.myshopify.com

# Start local theme development server
shopify theme dev
```

### Theme Validation
Run Theme Check locally to verify code integrity:
```bash
shopify theme check
```
*Expected output: 0 offenses found.*

---

## License

Theme code © Kixro. Distributed under standard commercial terms.
