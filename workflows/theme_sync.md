# Theme Sync — Single Live Theme

## One theme only

| What | Value |
|------|--------|
| **Theme name** | Kixro |
| **Theme ID** | `#151935877198` |
| **Role** | Live (Active) |
| **Store URL** | https://mcr0nu-c1.myshopify.com |
| **Editor** | Online Store → Themes → Kixro → **Edit theme** |

Horizon and the old Development duplicate were removed from the theme library.

## Code ↔ live (same theme)

```bash
shopify theme dev              # live sync while coding
shopify theme push --allow-live   # push local files → live Kixro
shopify theme pull             # pull theme editor changes → local
```

No `?preview_theme_id=` needed.

## Make the store public (anyone can visit)

If visitors see **"Opening soon"** / password page:

1. **Shopify Admin → Online Store → Preferences**
2. **Password protection** → **Uncheck** "Restrict access to visitors with the password"
3. Save

Your store is then live at https://mcr0nu-c1.myshopify.com for everyone.

## Custom domain (optional)

**Settings → Domains** → connect your domain → set as primary.  
Store works on both `.myshopify.com` and your custom domain once connected.
