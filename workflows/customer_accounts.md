# Customer Accounts — Empty State (No Product Image)

## Problem
New Shopify Customer Accounts (`shopify.com/.../account`) show a welcome card with a **product image** from a configured collection. This is **not controlled by theme Liquid**.

## Fix A — Remove image on Shopify account (Admin, ~2 min)

1. **Shopify Admin → Settings → Checkout**
2. Click **Customize** on your checkout configuration
3. Page selector → **Orders**
4. Sidebar → **Main** → **No orders** section
5. **Clear / remove the Collection** (this removes the product image)
6. **Save**

Result: card shows only **Welcome**, **Ready to shop?**, and **Shop now** (links to store homepage).

## Fix B — Kixro custom account page (theme-controlled)

Use the theme page **`page.account-dashboard`** so the header account icon opens a Kixro-branded page with **no product image**.

### One-time Admin setup
1. **Online Store → Pages → Add page**
2. Title: `Account` (or `My Account`)
3. Handle: **`account-dashboard`** (must match template suffix)
4. Theme template: **`account-dashboard`**
5. Save

### Theme behavior
- Header account icon links to `/pages/account-dashboard` when that page exists
- Logged-in customers see Welcome / Ready to shop? / Shop now (no image)
- Order history appears after first purchase

## Shop now destination
Theme redirects `/collections/frontpage` → `/` so legacy Shop now links land on the real homepage.
