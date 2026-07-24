# Kixro — Agent Rules & Project Context

> **Last Updated:** 2026-07-21
> **Project:** Kixro Custom Shopify Online Store 2.0 Theme
> **Platform:** Shopify CLI / Liquid / Online Store 2.0

---

## 🧠 Memory System Protocol

Before starting ANY task:
1. Read ALL memory files in this directory.
2. Check `CURRENT_STATE.md` for the latest project status.
3. Verify dependencies in `IMPLEMENTATION_PLAN.md`.
4. Check `DECISIONS_LOG.md` for any design or technical decisions that affect the current task.

After completing ANY task:
1. Update `CURRENT_STATE.md` with: completed task, files modified, bugs found/fixed, next immediate action.
2. Update `IMPLEMENTATION_PLAN.md` by marking completed phases or subtasks.
3. Update `DECISIONS_LOG.md` if any design or technical decision changed.
4. **Append updates with dates** — never overwrite previous memory entries.
5. Summarize all memory file updates before ending the response.

If the chat or agent changes, the new agent must **read all memory files first** and continue from the latest state in `CURRENT_STATE.md`.

---

## 📁 Memory Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | This file — agent rules & project context |
| `PROJECT_BRIEF.md` | Full project requirements & scope |
| `BRAND_GUIDELINES.md` | Kixro brand identity, colors, tone |
| `DESIGN_SYSTEM.md` | Complete design token system |
| `CONTENT_STRUCTURE.md` | Page-by-page content mapping |
| `ASSET_MAP.md` | All asset paths and usage mapping |
| `IMPLEMENTATION_PLAN.md` | Phased build plan with dependencies |
| `CURRENT_STATE.md` | Living status tracker |
| `DECISIONS_LOG.md` | Chronological design & tech decisions |
| `PROMPT_LIBRARY.md` | Reusable prompt patterns for consistency |
| `ABOUT_US_CONTENT.md` | About Us page content |

---

## 🛒 Shopify OS 2.0 Conventions

- All sections must be **JSON schema-driven** with `{% schema %}` blocks.
- Use **section groups** for header and footer.
- Templates must use `.json` format (not `.liquid` for templates).
- Product cards must be a **reusable snippet** (`snippets/product-card.liquid`).
- All text must be **editable** through Shopify theme settings — no hardcoded copy.
- Use Shopify's native `{{ asset_url }}` filter for all theme assets.
- Follow Shopify's accessibility best practices (ARIA labels, semantic HTML, focus management).
- Use CSS custom properties for all design tokens.

---

## 🎨 Design System Enforcement

- All spacing, colors, typography, and component styles must reference `DESIGN_SYSTEM.md`.
- No ad-hoc pixel values — use the defined spacing scale.
- No ad-hoc colors — use CSS custom properties from the design system.
- Product card component must be **identical** on Homepage and Shop page.
- Typography must use the approved font pairing from the Design System.

---

## 🏗️ Build Order Rules

1. **Homepage FIRST** — complete all 8 sections including footer before moving on.
2. **Shop page SECOND** — reuse product card component from Homepage.
3. **About Us page THIRD**.
4. **Additional pages LAST** (Contact, Search, Cart, Account).

---

## 🔍 Quality Standards

- Every section must be **responsive** (mobile-first approach).
- Every interactive element must have **hover/focus states**.
- All images must have **alt text** (dynamic from Shopify or theme settings).
- Run `shopify theme check` before marking any phase complete.
- Test at breakpoints: 375px, 768px, 1024px, 1440px.
