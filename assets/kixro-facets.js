/**
 * Kixro color filter — exact match on Shopify Color variant values.
 * Swaps product card images to the matching color variant when filtered.
 */
(function () {
  let activeColor = '';
  let activeColorLabel = '';
  let catalogByHandle = {};
  let variantsByHandle = {};

  function normalizeColor(value) {
    return (value || '').toString().trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function normalizeColorAlias(value) {
    const normalized = normalizeColor(value);
    if (normalized === 'grey') return 'gray';
    return normalized;
  }

  function colorsMatch(productColor, filterColor) {
    const product = normalizeColorAlias(productColor);
    const filter = normalizeColorAlias(filterColor);
    if (!filter) return true;
    if (!product) return false;
    return product === filter;
  }

  function colorMatches(productColors, filterColor) {
    if (!filterColor) return true;
    return productColors.some((color) => colorsMatch(color, filterColor));
  }

  function readCatalogJson() {
    const node = document.getElementById('KixroCatalogColors');
    if (!node) return;

    try {
      const rows = JSON.parse(node.textContent || '[]');
      catalogByHandle = {};
      variantsByHandle = {};
      rows.forEach((row) => {
        if (row && row.handle) {
          catalogByHandle[row.handle] = (row.colors || []).map((c) => c.toString().trim()).filter(Boolean);
          variantsByHandle[row.handle] = row.variants || {};
        }
      });
    } catch (error) {
      catalogByHandle = {};
      variantsByHandle = {};
    }
  }

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

  function parseVariantMap(item) {
    const handle = item.dataset.productHandle;
    if (handle && variantsByHandle[handle]) {
      return variantsByHandle[handle];
    }
    return null;
  }

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

  function filterGrid(colorLabel) {
    const normalized = normalizeColor(colorLabel);
    activeColor = normalized;
    activeColorLabel = normalized ? (colorLabel || '').trim() : '';

    const items = document.querySelectorAll('.kixro-shop__grid-item');
    let visibleCount = 0;

    items.forEach((item) => {
      const colors = getItemColors(item);
      const show = colorMatches(colors, colorLabel);
      item.hidden = !show;
      if (show) visibleCount += 1;
    });

    updateCardVariants(normalized ? colorLabel : '');

    const range = document.querySelector('.kixro-shop__range');
    if (range) {
      const defaultRange = (range.dataset.kixroDefaultRange || '').trim();
      range.textContent = normalized
        ? `${visibleCount} product${visibleCount === 1 ? '' : 's'}`
        : defaultRange || range.textContent;
    }

    document.querySelectorAll('[data-kixro-color-clear]').forEach((btn) => {
      btn.classList.toggle('hidden', !normalized);
    });

    document.querySelectorAll('[data-kixro-color-selected]').forEach((el) => {
      el.textContent = activeColorLabel ? `Selected: ${activeColorLabel}` : '';
    });

    document.querySelectorAll('[data-kixro-color-btn]').forEach((btn) => {
      const btnColor = normalizeColorAlias(btn.dataset.colorLabel);
      const isActive = normalized && btnColor === normalizeColorAlias(activeColorLabel || activeColor);
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

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
          filterGrid(active && active === btnColor ? '' : label);
        });
      });

      container.querySelectorAll('[data-kixro-color-clear]').forEach((btn) => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          filterGrid('');
        });
      });
    });
  }

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

  function refreshAfterGridUpdate() {
    initColorFilter();
    if (activeColor) filterGrid(activeColorLabel || activeColor);
  }

  if (stripNativeColorFilterFromUrl()) {
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    readCatalogJson();
    initColorFilter();

    const pending = sessionStorage.getItem('kixro_pending_color');
    if (pending) {
      sessionStorage.removeItem('kixro_pending_color');
      filterGrid(pending);
    }
  });

  document.addEventListener('shopify:section:load', (event) => {
    readCatalogJson();
    initColorFilter(event.target);
  });

  const productGrid = document.getElementById('product-grid');
  if (productGrid && typeof MutationObserver !== 'undefined') {
    let refreshTimer;
    const observer = new MutationObserver(() => {
      if (!document.querySelector('.kixro-color-filter[data-kixro-filter-mode="client"], .kixro-color-filter-mobile[data-kixro-filter-mode="client"]')) return;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(refreshAfterGridUpdate, 50);
    });
    observer.observe(productGrid, { childList: true });
  }
})();
