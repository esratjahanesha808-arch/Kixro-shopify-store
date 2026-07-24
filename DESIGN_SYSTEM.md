# Kixro — Design System

> **Last Updated:** 2026-07-21
> **Status:** AWAITING APPROVAL — Do not build any UI until this Design System is approved.

---

## Reference Image Analysis

The reference website (`asset/reference/homepage-reference.png`) exhibits the following design characteristics that inform Kixro's Design System:

### Typography
- **Display headings** use a bold serif/display typeface with high visual impact — large, editorial, and expressive
- **Body text** uses a clean sans-serif with generous line height
- **Section headings** are centered with decorative separators
- **Product card text** is compact: price prominent, name smaller, clean hierarchy
- **CTA button text** is uppercase, small, tracking-wide

### Layout & Spacing
- **Generous vertical spacing** between sections (~80–120px)
- **Maximum content width** approximately 1280px centered
- **Product grid** uses 3 columns on desktop
- **Category section** uses an asymmetric card layout (mixed sizes)
- **Promotional cards** use large imagery with overlaid text and CTAs
- **Hero section** uses a large composite image with overlaid editorial heading
- **Banner CTA** is a full-width dark section with overlaid text

### Color Usage
- Warm cream/beige background (similar to Kixro's `#FBF5EF`)
- Dark text on light backgrounds
- White text on dark/image backgrounds
- Brown accent tones (Kixro adapts this to Brand Blue `#1B4965` and Accent Teal `#4EC9C6`)
- Dark footer section

### Interaction Patterns
- "Add to Cart" and "Buy Now" dual-button pattern on product cards
- "See More Collections" centered CTA after product grids
- "Shop Now" CTAs on promotional cards
- Minimal hover effects — clean and intentional

---

## 1. Typography System

### Font Pairing

| Role | Font | Fallback | Rationale |
|------|------|----------|-----------|
| **Display / Headings** | **Playfair Display** | Georgia, serif | Editorial serif that captures the reference's expressive headline style while maintaining youthful-premium feel |
| **Body / UI** | **Inter** | -apple-system, system-ui, sans-serif | Clean modern sans-serif with excellent readability and extensive weight range |

### Loading Strategy
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Type Scale

| Token | Size (Desktop) | Size (Mobile) | CSS Variable | Usage |
|-------|---------------|---------------|-------------|-------|
| `hero` | 72px / 4.5rem | 40px / 2.5rem | `--text-hero` | Hero headline only |
| `display` | 56px / 3.5rem | 32px / 2rem | `--text-display` | Section headings |
| `h1` | 48px / 3rem | 28px / 1.75rem | `--text-h1` | Page titles |
| `h2` | 36px / 2.25rem | 24px / 1.5rem | `--text-h2` | Sub-section headings |
| `h3` | 28px / 1.75rem | 22px / 1.375rem | `--text-h3` | Card titles, feature headings |
| `h4` | 22px / 1.375rem | 18px / 1.125rem | `--text-h4` | Minor headings |
| `body-lg` | 18px / 1.125rem | 16px / 1rem | `--text-body-lg` | Lead paragraphs, subtitles |
| `body` | 16px / 1rem | 15px / 0.9375rem | `--text-body` | Default body text |
| `body-sm` | 14px / 0.875rem | 13px / 0.8125rem | `--text-body-sm` | Captions, meta, helpers |
| `caption` | 12px / 0.75rem | 12px / 0.75rem | `--text-caption` | Labels, badges, fine print |
| `button` | 14px / 0.875rem | 14px / 0.875rem | `--text-button` | Button text |

### Font Weights

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| Regular | 400 | `--weight-regular` | Body text |
| Medium | 500 | `--weight-medium` | Subtitles, navigation |
| Semibold | 600 | `--weight-semibold` | Button text, labels |
| Bold | 700 | `--weight-bold` | Section headings |
| Extrabold | 800 | `--weight-extrabold` | Hero headings, display text |

### Line Heights

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| Tight | 1.1 | `--leading-tight` | Display/hero headings |
| Snug | 1.25 | `--leading-snug` | Section headings, h2–h4 |
| Normal | 1.5 | `--leading-normal` | Body text |
| Relaxed | 1.65 | `--leading-relaxed` | Long-form reading |

### Letter Spacing

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| Tight | -0.02em | `--tracking-tight` | Display/hero headings |
| Normal | 0 | `--tracking-normal` | Body text |
| Wide | 0.05em | `--tracking-wide` | Button text, labels |
| Wider | 0.1em | `--tracking-wider` | Uppercase labels, badges |

---

## 2. Spacing Scale

Inspired by the reference website's generous whitespace. Uses an 8px base unit.

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| `2xs` | 4px | `--space-2xs` | Icon gaps, badge padding |
| `xs` | 8px | `--space-xs` | Tight gaps, inline spacing |
| `sm` | 12px | `--space-sm` | Card internal padding (tight) |
| `md` | 16px | `--space-md` | Default element spacing |
| `lg` | 24px | `--space-lg` | Card padding, group spacing |
| `xl` | 32px | `--space-xl` | Section inner spacing |
| `2xl` | 48px | `--space-2xl` | Between section elements |
| `3xl` | 64px | `--space-3xl` | Section vertical padding (mobile) |
| `4xl` | 80px | `--space-4xl` | Section vertical padding (tablet) |
| `5xl` | 96px | `--space-5xl` | Section vertical padding (desktop) |
| `6xl` | 120px | `--space-6xl` | Hero section vertical padding |

### Section Spacing Guidelines

| Context | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Between sections | `--space-5xl` (96px) | `--space-4xl` (80px) | `--space-3xl` (64px) |
| Section internal top/bottom | `--space-4xl` (80px) | `--space-3xl` (64px) | `--space-2xl` (48px) |
| Between heading and content | `--space-2xl` (48px) | `--space-xl` (32px) | `--space-lg` (24px) |
| Between grid items | `--space-lg` (24px) | `--space-md` (16px) | `--space-md` (16px) |

---

## 3. Border Radius System

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| `sm` | 4px | `--radius-sm` | Input fields, small elements |
| `md` | 8px | `--radius-md` | Buttons, badges |
| `lg` | 12px | `--radius-lg` | Cards, containers |
| `xl` | 16px | `--radius-xl` | Featured cards, modals |
| `2xl` | 24px | `--radius-2xl` | Promotional cards, hero |
| `full` | 9999px | `--radius-full` | Pills, avatars, circular |

---

## 4. Shadow System

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| `sm` | `0 1px 3px var(--color-shadow)` | `--shadow-sm` | Subtle elevation |
| `md` | `0 4px 12px var(--color-shadow)` | `--shadow-md` | Cards at rest |
| `lg` | `0 8px 24px var(--color-shadow)` | `--shadow-lg` | Cards on hover |
| `xl` | `0 16px 48px var(--color-shadow)` | `--shadow-xl` | Modals, dropdowns |

---

## 5. Transition System

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| `fast` | 150ms ease | `--transition-fast` | Hover states, color changes |
| `base` | 250ms ease | `--transition-base` | Card hover, button hover |
| `slow` | 400ms ease | `--transition-slow` | Layout shifts, reveals |
| `smooth` | 500ms cubic-bezier(0.4, 0, 0.2, 1) | `--transition-smooth` | Hero transitions, page entrance |

---

## 6. Layout & Grid System

### Container

| Token | Value | CSS Variable |
|-------|-------|-------------|
| Max Width | 1280px | `--container-max` |
| Padding (Desktop) | 48px | `--container-pad-desktop` |
| Padding (Tablet) | 32px | `--container-pad-tablet` |
| Padding (Mobile) | 20px | `--container-pad-mobile` |

### Grid

| Context | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Product Grid | 3 columns | 2 columns | 1 column (2 on wider mobile) |
| Category Grid | 4 columns (or asymmetric) | 2 columns | 1 column |
| Discover Picks | 2×2 grid or staggered | 2 columns | 1 column |
| Featured Collection | 3 columns | 2 columns | 1 column |

### Grid Gap
- Default: `--space-lg` (24px)
- Tight: `--space-md` (16px)

---

## 7. Button System

### Primary Button

```css
.btn-primary {
  background: var(--color-primary);          /* #1B4965 */
  color: var(--color-white);
  font-family: var(--font-body);             /* Inter */
  font-size: var(--text-button);             /* 14px */
  font-weight: var(--weight-semibold);       /* 600 */
  letter-spacing: var(--tracking-wide);      /* 0.05em */
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: var(--radius-md);           /* 8px */
  border: none;
  cursor: pointer;
  transition: var(--transition-base);
}

.btn-primary:hover {
  background: var(--color-primary-hover);    /* #052E5A */
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

### Secondary Button (Outline)

```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
  font-family: var(--font-body);
  font-size: var(--text-button);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-base);
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: var(--color-white);
}
```

### Buy Now Button (Accent)

```css
.btn-accent {
  background: var(--color-accent);           /* #4EC9C6 */
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-button);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: var(--transition-base);
}

.btn-accent:hover {
  background: #3AB5B2;
  transform: translateY(-1px);
}
```

### Button Sizes

| Size | Padding | Font Size |
|------|---------|-----------|
| Small | 10px 20px | 12px |
| Default | 14px 32px | 14px |
| Large | 18px 40px | 16px |

---

## 8. Product Card System

The product card is a **reusable snippet** used identically across all pages.

### Structure
```
┌─────────────────────────┐
│                         │
│     Product Image       │
│   (3:4 aspect ratio)    │
│                         │
├─────────────────────────┤
│ $229.96                 │ ← Price (prominent)
│ Product Name            │ ← Title (secondary)
│                         │
│ ┌──────────┐ ┌────────┐│
│ │ Add to   │ │ Buy    ││ ← Dual CTA
│ │ Cart     │ │ Now    ││
│ └──────────┘ └────────┘│
└─────────────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Image Aspect Ratio | 3:4 (portrait) |
| Card Background | `var(--color-white)` |
| Card Border Radius | `var(--radius-lg)` (12px) |
| Card Shadow (rest) | `var(--shadow-sm)` |
| Card Shadow (hover) | `var(--shadow-lg)` |
| Card Padding | `var(--space-md)` (16px) |
| Image Border Radius | `var(--radius-md)` (8px) |
| Price Font | Inter, `var(--weight-bold)`, `var(--text-body-lg)` |
| Title Font | Inter, `var(--weight-medium)`, `var(--text-body-sm)` |
| Title Color | `var(--color-text-muted)` |
| Button Area Gap | `var(--space-xs)` (8px) |
| Hover Transform | `translateY(-4px)` |
| Hover Transition | `var(--transition-base)` |

### Product Card CSS Reference

```css
.product-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: var(--transition-base);
}

.product-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.product-card__image-wrapper {
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: var(--radius-md);
  margin: var(--space-sm);
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-slow);
}

.product-card:hover .product-card__image {
  transform: scale(1.03);
}

.product-card__info {
  padding: var(--space-sm) var(--space-md) var(--space-md);
}

.product-card__price {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  font-weight: var(--weight-bold);
  color: var(--color-text);
}

.product-card__title {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-muted);
  margin-top: var(--space-2xs);
}

.product-card__actions {
  display: flex;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
}
```

---

## 9. Promotional Card System (Discover Picks / Featured)

Inspired by the reference website's editorial collection cards.

### Structure
```
┌──────────────────────────────┐
│                              │
│                              │
│     Large Lifestyle Image    │
│                              │
│                              │
│      Collection Label ────── │ ← Text overlay or below
│   ┌──────────────────┐       │
│   │   View All  →    │       │
│   └──────────────────┘       │
│                              │
└──────────────────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Image Aspect Ratio | Varies by layout (16:9, 4:3, 1:1) |
| Card Border Radius | `var(--radius-xl)` (16px) |
| Overlay | Semi-transparent gradient from bottom |
| Label Font | Playfair Display, `var(--weight-bold)`, `var(--text-h3)` |
| CTA | Small pill button or text link with arrow |
| Hover | Subtle image scale + shadow increase |

---

## 10. CSS Custom Properties Declaration

```css
:root {
  /* Colors */
  --color-bg: #FBF5EF;
  --color-text: #1A1A1A;
  --color-primary: #1B4965;
  --color-accent: #4EC9C6;
  --color-white: #FFFFFF;
  --color-shadow: #1B496520;
  --color-primary-hover: #052E5A;
  --color-text-muted: #1A1A1A99;
  --color-border: #1A1A1A15;
  --color-surface: #F5EDE5;

  /* Typography — Fonts */
  --font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Typography — Scale (Desktop) */
  --text-hero: 4.5rem;
  --text-display: 3.5rem;
  --text-h1: 3rem;
  --text-h2: 2.25rem;
  --text-h3: 1.75rem;
  --text-h4: 1.375rem;
  --text-body-lg: 1.125rem;
  --text-body: 1rem;
  --text-body-sm: 0.875rem;
  --text-caption: 0.75rem;
  --text-button: 0.875rem;

  /* Typography — Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;

  /* Typography — Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;

  /* Typography — Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;

  /* Spacing */
  --space-2xs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 80px;
  --space-5xl: 96px;
  --space-6xl: 120px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px var(--color-shadow);
  --shadow-md: 0 4px 12px var(--color-shadow);
  --shadow-lg: 0 8px 24px var(--color-shadow);
  --shadow-xl: 0 16px 48px var(--color-shadow);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
  --transition-smooth: 500ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Layout */
  --container-max: 1280px;
  --container-pad-desktop: 48px;
  --container-pad-tablet: 32px;
  --container-pad-mobile: 20px;

  /* Grid */
  --grid-gap: var(--space-lg);
  --grid-gap-tight: var(--space-md);
}

/* Responsive Typography Overrides */
@media (max-width: 1024px) {
  :root {
    --text-hero: 3rem;
    --text-display: 2.5rem;
    --text-h1: 2.25rem;
    --text-h2: 1.75rem;
    --text-h3: 1.5rem;
    --text-h4: 1.25rem;
  }
}

@media (max-width: 768px) {
  :root {
    --text-hero: 2.5rem;
    --text-display: 2rem;
    --text-h1: 1.75rem;
    --text-h2: 1.5rem;
    --text-h3: 1.375rem;
    --text-h4: 1.125rem;
    --text-body-lg: 1rem;
    --text-body: 0.9375rem;
    --text-body-sm: 0.8125rem;
  }
}
```

---

## 11. Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| Mobile | ≤ 767px | Single column, stacked layout |
| Tablet | 768px – 1023px | 2-column grids, adjusted spacing |
| Desktop | 1024px – 1439px | Full grid, standard layout |
| Wide | ≥ 1440px | Max-width container, generous margins |

---

## 12. Accessibility Standards

- **Minimum contrast ratio:** 4.5:1 for normal text, 3:1 for large text
- **Focus indicators:** 2px solid outline with `var(--color-accent)` and 2px offset
- **Touch targets:** Minimum 44×44px
- **Reduced motion:** Respect `prefers-reduced-motion`
- **Semantic HTML:** Use proper heading hierarchy, ARIA labels, and roles
- **Skip navigation:** Include a skip-to-content link

---

## Approval Checklist

- [ ] Typography pairing (Playfair Display + Inter) approved
- [ ] Type scale values approved
- [ ] Spacing scale approved
- [ ] Color usage rules approved
- [ ] Button system approved
- [ ] Product card system approved
- [ ] Promotional card system approved
- [ ] Border radius system approved
- [ ] Shadow system approved
- [ ] Grid system approved

> ⚠️ **No UI development may begin until this Design System is approved.**
