# Kixro — Prompt Library

> **Last Updated:** 2026-07-21

---

## Purpose

Reusable prompt patterns for maintaining design and code consistency across all development tasks. Use these when starting new sections or components.

---

## Section Development Prompt

```
Before building [SECTION_NAME]:
1. Read DESIGN_SYSTEM.md for tokens.
2. Read CONTENT_STRUCTURE.md for content mapping.
3. Read ASSET_MAP.md for image paths.
4. Check BRAND_GUIDELINES.md for color usage rules.
5. Reference the homepage-reference.png for layout inspiration.

Build the section using:
- Shopify OS 2.0 section schema with editable settings.
- CSS custom properties from the design system.
- Semantic HTML with appropriate ARIA labels.
- Mobile-first responsive approach.
- The spacing scale from DESIGN_SYSTEM.md.
```

---

## Product Card Consistency Prompt

```
The product card MUST be implemented as a reusable snippet at snippets/product-card.liquid.

It must include:
- Product image with aspect ratio handling
- Price display (compare-at price support)
- Product title
- Add to Cart button
- Buy Now button
- Hover state with subtle elevation
- Responsive sizing

This exact snippet is used on:
- Homepage → Newly Dropped Collections
- Homepage → Featured Collection
- Shop Page → Product Grid
- Search Page → Results Grid
```

---

## Section Schema Prompt

```
Every section schema must include:
- Section name and class
- Settings array with:
  - Heading (text input)
  - Subheading (textarea, optional)
  - Collection picker (if applicable)
  - CTA text (text input)
  - CTA link (url input)
  - Color scheme override (if applicable)
- Blocks (if repeatable elements exist)
- Presets with default values
- Max blocks limit where appropriate
```

---

## Responsive Testing Prompt

```
Test at these breakpoints:
- 375px (mobile)
- 768px (tablet)
- 1024px (small desktop)
- 1440px (standard desktop)

Check for:
- Text overflow / truncation
- Image scaling and aspect ratio
- Grid column changes
- Spacing adjustments
- Touch target sizes (min 44x44px)
- Navigation collapse behavior
```

---

## Design System Enforcement Prompt

```
Before committing any CSS:
1. All colors use CSS custom properties from --color-*
2. All spacing uses the spacing scale (--space-*)
3. All typography uses the type scale (--text-*)
4. All border-radius uses --radius-*
5. All shadows use --shadow-*
6. All transitions use --transition-*
7. No magic numbers — every value maps to a token
```

---

## Memory Update Prompt

```
After completing any task, update:
1. CURRENT_STATE.md → What was done, what changed, what's next
2. IMPLEMENTATION_PLAN.md → Mark completed items
3. DECISIONS_LOG.md → Log any new decisions
4. Always APPEND with date — never overwrite
5. Summarize updates in your response
```
