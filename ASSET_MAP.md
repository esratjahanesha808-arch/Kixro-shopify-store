# Kixro — Asset Map

> **Last Updated:** 2026-07-21

---

## Directory Structure

All assets are in the `asset/` directory (note: singular, not `assets/`).

```
asset/
├── reference/
│   └── homepage-reference.png          (2.2 MB) — Design reference only, not for theme
├── hero/
│   ├── hero-image-1.png                (1.9 MB) — Basketball court, blue Jordans
│   ├── hero-image-2.png                (1.9 MB) — Mountain landscape, retro sneaker
│   └── hero-image-3.png                (2.3 MB) — Urban cityscape, blue clogs
├── Category Images/
│   ├── category-shoes.png              (2.1 MB) — Green/yellow/cream sneaker on pedestal
│   ├── category-boots.png              (492 KB) — Boot product image
│   ├── category-loafers.png            (2.1 MB) — Loafer product image
│   └── category-sandals.png           (2.0 MB) — Sandal product image
├── discover-picks/
│   ├── pick-new-arrivals.png           (1.9 MB) — Lifestyle, person seated with white sneakers
│   ├── pick-best-sellers.png           (2.5 MB) — Unboxing sneakers, dark blue background
│   ├── pick-trending-now.png           (2.4 MB) — Product lifestyle shot
│   └── pick-kixro-essentials.png       (2.1 MB) — Essentials collection shot
├── banner/
│   └── banner-style-cta.png            (2.1 MB) — Banner background for CTA section
├── product images/
│   ├── shoe/                           (7 images) — Shoe product photography
│   ├── boots/                          (4 images) — Boot product photography
│   ├── lofer/                          (4 images) — Loafer product photography
│   └── sandels/                        (5 images) — Sandal product photography
└── logo/
    └── (empty)                         — Logo files pending
```

---

## Asset Usage Map

### Hero Section
| Slide | Asset Path | Description |
|-------|-----------|-------------|
| 1 | `asset/hero/hero-image-1.png` | Dynamic low-angle basketball court shot, blue/red Jordans |
| 2 | `asset/hero/hero-image-2.png` | Warm outdoor shot, olive jacket, orange/white retro sneaker |
| 3 | `asset/hero/hero-image-3.png` | Urban vertical shot, blue clogs, city skyscrapers |

### Category Section
| Category | Asset Path |
|----------|-----------|
| Shoes | `asset/Category Images/category-shoes.png` |
| Boots | `asset/Category Images/category-boots.png` |
| Loafers | `asset/Category Images/category-loafers.png` |
| Sandals | `asset/Category Images/category-sandals.png` |

### Discover Your Kixro Picks
| Collection | Asset Path |
|-----------|-----------|
| New Arrivals | `asset/discover-picks/pick-new-arrivals.png` |
| Best Sellers | `asset/discover-picks/pick-best-sellers.png` |
| Trending Now | `asset/discover-picks/pick-trending-now.png` |
| Kixro Essentials | `asset/discover-picks/pick-kixro-essentials.png` |

### Brand CTA Banner
| Element | Asset Path |
|---------|-----------|
| Banner BG | `asset/banner/banner-style-cta.png` |

### Product Images (for Shopify admin upload)
| Category | Directory | Count |
|----------|----------|-------|
| Shoes | `asset/product images/shoe/` | 7 |
| Boots | `asset/product images/boots/` | 4 |
| Loafers | `asset/product images/lofer/` | 4 |
| Sandals | `asset/product images/sandels/` | 5 |

---

## Notes

- **Logo:** The `asset/logo/` directory is empty. A text-based "KIXRO" wordmark will be used as a fallback.
- **Product images** are for Shopify admin upload — they are not theme assets. They'll be served through Shopify's CDN via the product object.
- **Reference image** (`asset/reference/homepage-reference.png`) is for design direction only and must NOT be included in the final theme.
- All hero, category, discover-picks, and banner images will need to be uploaded to Shopify as theme assets or through the Shopify admin content management.
- **Directory naming inconsistencies:** `lofer` (should be "loafer"), `sandels` (should be "sandals") — these are the actual directory names and must be referenced as-is.
