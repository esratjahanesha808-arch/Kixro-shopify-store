# Kixro — Project Brief

> **Last Updated:** 2026-07-24
> **Status:** ✅ Complete — live at mcr0nu-c1.myshopify.com
> **Brand:** Kixro — Premium Youthful Footwear
> **Platform:** Shopify CLI

---

## Project Overview

Build a custom Shopify Online Store 2.0 theme for the footwear brand **Kixro**. The design must feel **youthful, premium, clean, minimal, and modern** — inspired by the reference website at `asset/reference/homepage-reference.png` but adapted to Kixro's own brand identity.

---

## Brand Positioning

- **Not** overly luxurious, **not** cheap
- Youthful-premium editorial aesthetic
- Clean, minimal, modern design language
- Confident, aspirational brand tone

---

## Page Priority Order

1. **Homepage** (complete with footer before moving on)
2. **Shop Page**
3. **About Us Page**
4. **Additional Pages** (Contact, Search, Cart, Account)

---

## Homepage Section Order (Exact)

1. Header & Navigation
2. Hero Section (3 PNG hero images, editorial composition)
3. Category Section (Shoes, Boots, Loafers, Sandals)
4. Newly Dropped Collections
5. Discover Your Kixro Picks
6. Featured Collection
7. Brand CTA Banner
8. Footer

---

## Navbar Structure

| Item | Behavior |
|------|----------|
| Home | Links to homepage |
| Shop | Dropdown: Shoes, Boots, Loafers, Sandals |
| New Arrivals | Links to Shop page filtered by New Arrivals tag |
| Best Sellers | Links to Shop page filtered by Best Sellers tag |
| About Us | Links to About Us page |
| Contact | Links to Contact page |
| Search icon | Opens search |
| Account icon | Links to customer account |
| Cart icon | Opens cart drawer |

---

## Shop Page Requirements

- Reuse the **exact same product card snippet** from the Homepage
- **Filters:** Size, Color, Price, Availability (In Stock)
- **Sort dropdown**
- **Mobile filter drawer**
- **Editorial-style collection banner** at the top
- Marketing collections (New Arrivals, Best Sellers, Trending Now, Kixro Essentials) use the **same Shop page template**, filtered by product tags
- Marketing collections are **Shopify automated collections** using product tags
- Marketing collections do **NOT** appear as filter options

### Marketing Collection URL Behavior

| Navbar Click | Result |
|---|---|
| Shop | Shows all products |
| New Arrivals | Shop page → filtered to `tag:new-arrivals` |
| Best Sellers | Shop page → filtered to `tag:best-sellers` |
| Trending Now | Shop page → filtered to `tag:trending-now` |
| Kixro Essentials | Shop page → filtered to `tag:kixro-essentials` |

---

## Hero Section Requirements

- Support **3 editable PNG hero images** via Shopify settings
- Main headline (editable)
- Supporting text (editable)
- Primary CTA button (editable)
- Responsive image handling
- Subtle animations only if they enhance the experience
- Premium editorial-style composition

---

## Promotional Collection Design

The **Discover Your Kixro Picks** and **Featured Collection** sections must use an editorial-style promotional card design:
- Large image-led cards
- Clean typography overlay
- Balanced whitespace
- Strong CTA placement
- Premium but youthful visual presentation

---

## Product Categories

- Shoes
- Boots
- Loafers
- Sandals

---

## Marketing Collections

- New Arrivals
- Best Sellers
- Trending Now
- Kixro Essentials

---

## Technical Requirements

- Shopify Online Store 2.0 architecture
- JSON templates
- Section schema with full customizer support
- Reusable snippets for components (product card, buttons, etc.)
- CSS custom properties for design tokens
- Mobile-first responsive design
- Semantic HTML with accessibility support
- Performance-optimized images and code
