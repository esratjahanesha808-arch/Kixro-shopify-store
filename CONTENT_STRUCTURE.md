# Kixro — Content Structure

> **Last Updated:** 2026-07-21

---

## Homepage Content Map

### 1. Header & Navigation

| Element | Content | Source |
|---------|---------|--------|
| Logo | Kixro wordmark / logo image | Theme settings |
| Nav Links | Home, Shop (dropdown), New Arrivals, Best Sellers, About Us, Contact | Navigation menu |
| Shop Dropdown | Shoes, Boots, Loafers, Sandals | Menu items |
| Icons | Search, Account, Cart | Theme settings |

### 2. Hero Section

| Element | Content | Source |
|---------|---------|--------|
| Hero Image 1 | `asset/hero/hero-image-1.png` — Basketball court, Jordan sneaker | Section settings (slide 1) |
| Hero Image 2 | `asset/hero/hero-image-2.png` — Mountain landscape, retro sneaker | Section settings (slide 2) |
| Hero Image 3 | `asset/hero/hero-image-3.png` — Urban cityscape, blue clogs | Section settings (slide 3) |
| Headline | Editable (e.g., "Step Into Your Next Move") | Section settings |
| Supporting Text | Editable (e.g., "Curated footwear for every moment") | Section settings |
| CTA Button | Editable text + URL | Section settings |

### 3. Category Section

| Category | Image | Link |
|----------|-------|------|
| Shoes | `asset/Category Images/category-shoes.png` | `/collections/shoes` |
| Boots | `asset/Category Images/category-boots.png` | `/collections/boots` |
| Loafers | `asset/Category Images/category-loafers.png` | `/collections/loafers` |
| Sandals | `asset/Category Images/category-sandals.png` | `/collections/sandals` |

### 4. Newly Dropped Collections

| Element | Content | Source |
|---------|---------|--------|
| Section Title | "Newly Dropped Collections" | Section settings |
| Subtitle | Editable supporting text | Section settings |
| Products | 6 products from selected collection | Collection picker |
| Product Card | Price, name, Add to Cart, Buy Now | Product data |
| View More CTA | "See More Collections" button | Section settings |

### 5. Discover Your Kixro Picks

| Card | Image | Label |
|------|-------|-------|
| New Arrivals | `asset/discover-picks/pick-new-arrivals.png` | "New Arrivals" |
| Best Sellers | `asset/discover-picks/pick-best-sellers.png` | "Best Sellers" |
| Trending Now | `asset/discover-picks/pick-trending-now.png` | "Trending Now" |
| Kixro Essentials | `asset/discover-picks/pick-kixro-essentials.png` | "Kixro Essentials" |

Each card links to the Shop page filtered by the corresponding product tag.

### 6. Featured Collection

| Element | Content | Source |
|---------|---------|--------|
| Section Title | "Featured Collection" or custom | Section settings |
| Subtitle | Editable | Section settings |
| Products | 6 products from selected collection | Collection picker |
| Product Card | Same component as Newly Dropped | Snippet reuse |
| View More CTA | Button with editable text/URL | Section settings |

### 7. Brand CTA Banner

| Element | Content | Source |
|---------|---------|--------|
| Background Image | `asset/banner/banner-style-cta.png` | Section settings |
| Headline | Editable (editorial-style) | Section settings |
| CTA Button | Editable text + URL | Section settings |

### 8. Footer

| Element | Content | Source |
|---------|---------|--------|
| Brand Description | Short brand tagline / description | Section settings |
| Company Links | About Us, Careers, Press | Footer menu |
| Legal Links | Privacy Policy, Terms of Service, Refund Policy | Footer menu |
| Help Links | FAQ, Shipping, Returns, Contact | Footer menu |
| Newsletter | Email signup with CTA | Section settings |
| Social Links | Instagram, Twitter, Facebook, TikTok | Theme settings |
| Copyright | Dynamic year + Kixro | Automatic |

---

## Shop Page Content Map

| Element | Content | Source |
|---------|---------|--------|
| Collection Banner | Editorial image + collection title | Collection metafields / settings |
| Product Grid | Products from collection | Collection data |
| Product Card | Same snippet as Homepage | `snippets/product-card.liquid` |
| Filters | Size, Color, Price, Availability | Storefront filtering API |
| Sort | Dropdown: Featured, Price Low-High, Price High-Low, Newest, Best Selling | URL params |
| Mobile Filter | Drawer/modal with all filters | JavaScript |
| Pagination | Load more or numbered pages | Collection pagination |

---

## About Us Page Content Map

| Element | Content | Source |
|---------|---------|--------|
| Hero Banner | Brand image + page title | Section settings |
| Brand Story | Content from `ABOUT_US_CONTENT.md` | Section settings / metaobjects |
| Values | Brand values with icons | Section settings (blocks) |
| Team | Team photos and bios (if provided) | Section settings (blocks) |
| CTA | Shop or Contact CTA | Section settings |

---

## Additional Pages

| Page | Key Elements |
|------|-------------|
| Contact | Contact form, store info, map (optional) |
| Search | Search bar, results grid using product card snippet |
| Cart | Cart items, quantity controls, subtotal, checkout CTA |
| Account | Login/register, order history |
