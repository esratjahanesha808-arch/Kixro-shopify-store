/**
 * Kixro filter JS — color filter + category filter.
 * Color: exact match on Shopify Color variant values.
 * Category: client-side by data-kixro-category on grid items.
 * Swaps product card images to the matching color variant when filtered.
 */
(function () {
  let activeColor = '';
  let activeColorLabel = '';
  let activeCategory = '';
  let catalogByHandle = {};
  let variantsByHandle = {};
  let categoryByHandle = {};

  // ─── Normalize helpers ────────────────────────────────────────────────────

  function normalizeColor(value) {
    return (value || '').toString().trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function normalizeColorAlias(value) {
    const normalized = normalizeColor(value);
    if (normalized === 'grey') return 'gray';
    return normalized;
  }

  function normalizeCategory(value) {
    return (value || '').toString().trim().toLowerCase();
  }

  function colorsMatch(productColor, filterColor) {
    const product = normalizeColorAlias(productColor);
    const filter = normalizeColorAlias(filterColor);
    if (!filter) return true;
    if (!product) return false;
    if (product === filter) return true;

    // Multi-color matching: multi, multicolor, multi-color, earth tones, patchwork
    if (filter === 'multi' || filter.includes('multi')) {
      if (product.includes('multi') || product.includes('earth') || product.includes('patchwork')) {
        return true;
      }
    }
    if (product === 'multi' || product.includes('multi')) {
      if (filter.includes('multi')) {
        return true;
      }
    }

    // Direct containment (e.g. "navy" matches "navy blue", "red" matches "scarlet red")
    if (product.includes(filter) || filter.includes(product)) {
      return true;
    }

    // Token matching (e.g. "off-white / indigo / ocean blue" matches "blue")
    const productTokens = product.split(/[\/\,\-\s]+/).filter(Boolean);
    const filterTokens = filter.split(/[\/\,\-\s]+/).filter(Boolean);
    return productTokens.some((p) => filterTokens.includes(p));
  }

  function colorMatches(productColors, filterColor) {
    if (!filterColor) return true;
    return productColors.some((color) => colorsMatch(color, filterColor));
  }

  function categoryMatches(productCategory, filterCategory) {
    if (!filterCategory || filterCategory === 'all' || filterCategory === 'all-categories') return true;
    if (!productCategory) return false;
    const normFilter = normalizeCategory(filterCategory);
    if (!normFilter || normFilter === 'all' || normFilter === 'all-categories') return true;

    const cats = productCategory.split(/[\s\|,]+/).map(normalizeCategory).filter(Boolean);
    if (cats.includes(normFilter)) return true;

    // Handle aliases and variations
    if ((normFilter === 'essentials' || normFilter === 'curated-essentials') && cats.includes('kixro-essentials')) return true;
    if (normFilter === 'kixro-essentials' && (cats.includes('essentials') || cats.includes('curated-essentials'))) return true;
    if (normFilter === 'new-arrivals' && (cats.includes('new-arrivals') || cats.includes('new-arrival') || cats.includes('new arrivals'))) return true;
    if (normFilter === 'best-sellers' && (cats.includes('best-sellers') || cats.includes('bestseller') || cats.includes('best sellers'))) return true;
    if (normFilter === 'trending-now' && (cats.includes('trending-now') || cats.includes('trending') || cats.includes('trending now'))) return true;

    return cats.some((c) => c.includes(normFilter) || normFilter.includes(c));
  }

  // ─── Read catalog JSON ─────────────────────────────────────────────────────

  function readCatalogJson() {
    const node = document.getElementById('KixroCatalogColors');
    if (!node) return;

    try {
      const rows = JSON.parse(node.textContent || '[]');
      catalogByHandle = {};
      variantsByHandle = {};
      categoryByHandle = {};
      rows.forEach((row) => {
        if (row && row.handle) {
          catalogByHandle[row.handle] = (row.colors || []).map((c) => c.toString().trim()).filter(Boolean);
          variantsByHandle[row.handle] = row.variants || {};
          categoryByHandle[row.handle] = (row.category || '').toString().trim().toLowerCase();
        }
      });
    } catch (error) {
      catalogByHandle = {};
      variantsByHandle = {};
      categoryByHandle = {};
    }
  }

  // ─── Item data helpers ─────────────────────────────────────────────────────

  function getItemColors(item) {
    const fromData = (item.dataset.kixroColors || '')
      .split('|')
      .map((c) => c.trim())
      .filter(Boolean);

    if (fromData.length) return fromData;

    const handle = item.dataset.productHandle;
    if (handle && catalogByHandle[handle]) {
      return catalogByHandle[handle];
    }

    return [];
  }

  function getItemCategory(item) {
    if (item.dataset.kixroCategory) {
      return item.dataset.kixroCategory.trim().toLowerCase();
    }
    const handle = item.dataset.productHandle;
    if (handle && categoryByHandle[handle]) {
      return categoryByHandle[handle];
    }
    return '';
  }

  function parseVariantMap(item) {
    const handle = item.dataset.productHandle;
    if (handle && variantsByHandle[handle]) {
      return variantsByHandle[handle];
    }
    return null;
  }

  // ─── Card variant swap ────────────────────────────────────────────────────

  function resetCardVariant(item) {
    const img = item.querySelector('.kixro-product-card__image');
    const addBtn = item.querySelector('[data-kixro-add-to-cart]');

    if (img && img.dataset.defaultSrc) {
      img.src = img.dataset.defaultSrc;
      if (img.dataset.defaultSrcset) img.srcset = img.dataset.defaultSrcset;
      if (img.dataset.defaultWidth) img.width = Number(img.dataset.defaultWidth);
      if (img.dataset.defaultHeight) img.height = Number(img.dataset.defaultHeight);
      if (img.dataset.defaultAlt) img.alt = img.dataset.defaultAlt;
    }

    if (addBtn && addBtn.dataset.defaultVariantId) {
      addBtn.dataset.variantId = addBtn.dataset.defaultVariantId;
    }
  }

  function applyCardVariant(item, colorLabel) {
    const map = parseVariantMap(item);
    const key = normalizeColorAlias(colorLabel);
    if (!map || !key || !map[key]) return;

    const variant = map[key];
    const img = item.querySelector('.kixro-product-card__image');
    const addBtn = item.querySelector('[data-kixro-add-to-cart]');

    if (img) {
      if (variant.src) img.src = variant.src;
      if (variant.srcset) img.srcset = variant.srcset;
      if (variant.width) img.width = variant.width;
      if (variant.height) img.height = variant.height;
      if (variant.alt) img.alt = variant.alt;
    }

    if (addBtn && variant.id) {
      addBtn.dataset.variantId = String(variant.id);
    }
  }

  function updateCardVariants(colorLabel) {
    document.querySelectorAll('.kixro-shop__grid-item').forEach((item) => {
      if (item.hidden) return;
      if (colorLabel) {
        applyCardVariant(item, colorLabel);
      } else {
        resetCardVariant(item);
      }
    });
  }

  // ─── Core filter grid ─────────────────────────────────────────────────────

  function filterGrid(colorLabel, categoryLabel) {
    const normalizedColor = normalizeColor(colorLabel);
    const normalizedCategory = normalizeCategory(categoryLabel);

    activeColor = normalizedColor;
    activeColorLabel = normalizedColor ? (colorLabel || '').trim() : '';
    activeCategory = normalizedCategory;

    const items = document.querySelectorAll('.kixro-shop__grid-item');
    let visibleCount = 0;

    items.forEach((item) => {
      const colors = getItemColors(item);
      const category = getItemCategory(item);
      const colorOk = colorMatches(colors, normalizedColor ? colorLabel : '');
      const catOk = categoryMatches(category, normalizedCategory ? categoryLabel : '');
      const show = colorOk && catOk;
      item.hidden = !show;
      if (show) visibleCount += 1;
    });

    updateCardVariants(normalizedColor ? colorLabel : '');

    // Empty state notice
    const emptyNotice = document.querySelector('[data-kixro-empty-state]');
    if (emptyNotice) {
      emptyNotice.classList.toggle('hidden', visibleCount > 0);
    }

    // Product count range
    const range = document.querySelector('.kixro-shop__range');
    if (range) {
      const defaultRange = (range.dataset.kixroDefaultRange || '').trim();
      range.textContent = (normalizedColor || normalizedCategory)
        ? `${visibleCount} product${visibleCount === 1 ? '' : 's'}`
        : defaultRange || range.textContent;
    }

    // Color clear btn visibility
    document.querySelectorAll('[data-kixro-color-clear]').forEach((btn) => {
      btn.classList.toggle('hidden', !normalizedColor);
    });

    // Color selected label
    document.querySelectorAll('[data-kixro-color-selected]').forEach((el) => {
      el.textContent = activeColorLabel ? `Selected: ${activeColorLabel}` : '';
    });

    // Color swatch active states
    document.querySelectorAll('[data-kixro-color-btn]').forEach((btn) => {
      const btnColor = normalizeColorAlias(btn.dataset.colorLabel);
      const isActive = normalizedColor && btnColor === normalizeColorAlias(activeColorLabel || activeColor);
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Category button active states
    document.querySelectorAll('[data-kixro-category-btn]').forEach((btn) => {
      const btnCat = normalizeCategory(btn.dataset.kixroCategoryBtn || btn.getAttribute('data-kixro-category-btn'));
      const isActive = (!normalizedCategory && !btnCat) ||
        (normalizedCategory && (
          btnCat === normalizedCategory ||
          (btnCat === 'kixro-essentials' && normalizedCategory === 'essentials') ||
          (btnCat === 'essentials' && normalizedCategory === 'kixro-essentials')
        ));
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  // ─── Bind color filter ─────────────────────────────────────────────────────

  function initColorFilter(root = document) {
    const selectors = '.kixro-color-filter[data-kixro-filter-mode="client"], .kixro-color-filter-mobile[data-kixro-filter-mode="client"]';
    root.querySelectorAll(selectors).forEach((container) => {
      if (container.dataset.kixroBound === 'true') return;
      container.dataset.kixroBound = 'true';

      container.querySelectorAll('[data-kixro-color-btn]').forEach((btn) => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          const label = btn.dataset.colorLabel || '';
          const btnColor = normalizeColorAlias(label);
          const active = normalizeColorAlias(activeColorLabel || activeColor);
          const newColor = active && active === btnColor ? '' : label;
          filterGrid(newColor, activeCategory);
        });
      });

      document.querySelectorAll('[data-kixro-color-clear-btn]').forEach((btn) => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          const url = new URL(window.location.href);
          url.searchParams.delete('category');
          window.history.replaceState({}, '', url.toString());
          filterGrid('', '');
        });
      });

      container.querySelectorAll('[data-kixro-color-clear]').forEach((btn) => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          filterGrid('', activeCategory);
        });
      });
    });
  }

  // ─── Bind category filter ──────────────────────────────────────────────────

  function initCategoryFilter(root = document) {
    const selectors = '.kixro-category-filter[data-kixro-filter-mode="client"], .kixro-category-filter-mobile[data-kixro-filter-mode="client"]';
    root.querySelectorAll(selectors).forEach((container) => {
      if (container.dataset.kixroCatBound === 'true') return;
      container.dataset.kixroCatBound = 'true';

      container.querySelectorAll('[data-kixro-category-btn]').forEach((btn) => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          const label = btn.getAttribute('data-kixro-category-btn') || '';
          // Toggle: clicking active category clears it
          const newCategory = (normalizeCategory(label) === activeCategory) ? '' : label;

          // Update URL without page reload
          const url = new URL(window.location.href);
          if (newCategory) {
            url.searchParams.set('category', newCategory.toLowerCase());
          } else {
            url.searchParams.delete('category');
          }
          window.history.replaceState({}, '', url.toString());

          filterGrid(activeColorLabel || activeColor, newCategory);
        });
      });
    });
  }

  // ─── Strip native color filter from URL ───────────────────────────────────

  function stripNativeColorFilterFromUrl() {
    const url = new URL(window.location.href);
    let changed = false;
    let pendingColor = '';

    [...url.searchParams.keys()].forEach((key) => {
      const keyDown = key.toLowerCase();
      if (keyDown.includes('color') || keyDown.includes('colour')) {
        pendingColor = pendingColor || url.searchParams.get(key) || '';
        url.searchParams.delete(key);
        changed = true;
      }
    });

    if (changed) {
      if (pendingColor) {
        sessionStorage.setItem('kixro_pending_color', pendingColor);
      }
      window.location.replace(url.toString());
      return true;
    }

    return false;
  }

  // ─── After grid DOM update (AJAX pagination / Shopify facets) ─────────────

  function refreshAfterGridUpdate() {
    initColorFilter();
    initCategoryFilter();
    if (activeColor || activeCategory) {
      filterGrid(activeColorLabel || activeColor, activeCategory);
    }
  }

  // ─── Bootstrap ─────────────────────────────────────────────────────────────

  if (stripNativeColorFilterFromUrl()) {
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    readCatalogJson();
    initColorFilter();
    initCategoryFilter();

    // Apply pending color (redirected from native URL filter)
    const pendingColor = sessionStorage.getItem('kixro_pending_color');
    if (pendingColor) {
      sessionStorage.removeItem('kixro_pending_color');
      filterGrid(pendingColor, activeCategory);
    }

    // Auto-apply category from ?category= URL param (for homepage category cards)
    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get('category');
    if (urlCategory) {
      filterGrid(activeColorLabel || activeColor, urlCategory);
    }
  });

  document.addEventListener('shopify:section:load', (event) => {
    readCatalogJson();
    initColorFilter(event.target);
    initCategoryFilter(event.target);
  });

  const productGrid = document.getElementById('product-grid');
  if (productGrid && typeof MutationObserver !== 'undefined') {
    let refreshTimer;
    const observer = new MutationObserver(() => {
      if (!document.querySelector('.kixro-color-filter[data-kixro-filter-mode="client"], .kixro-color-filter-mobile[data-kixro-filter-mode="client"], .kixro-category-filter[data-kixro-filter-mode="client"]')) return;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(refreshAfterGridUpdate, 50);
    });
    observer.observe(productGrid, { childList: true });
  }
})();
