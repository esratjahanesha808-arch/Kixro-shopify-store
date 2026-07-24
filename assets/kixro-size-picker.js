/**
 * Kixro size picker — enforces Shoe size category metafield availability.
 */
(function () {
  function initSizePicker(root = document) {
    root.querySelectorAll('[data-kixro-size-picker]').forEach((picker) => {
      if (picker.dataset.kixroBound === 'true') return;
      picker.dataset.kixroBound = 'true';

      const statusEl = picker.querySelector('[data-kixro-size-status]');
      const formId = picker.querySelector('[data-kixro-size-option]')?.getAttribute('form');
      const productForm = formId ? document.getElementById(formId)?.closest('product-form') : null;
      const submitButton = productForm?.querySelector('[type="submit"]');

      function updateState() {
        const selected = picker.querySelector('[data-kixro-size-option]:checked');
        const unavailable = selected && selected.dataset.sizeAvailable === 'false';

        if (statusEl) {
          if (unavailable) {
            statusEl.textContent = 'This size is out of stock. Please choose another size.';
            statusEl.hidden = false;
          } else {
            statusEl.textContent = '';
            statusEl.hidden = true;
          }
        }

        if (submitButton) {
          if (unavailable) {
            submitButton.setAttribute('disabled', 'disabled');
            submitButton.setAttribute('aria-disabled', 'true');
          } else {
            submitButton.removeAttribute('disabled');
            submitButton.removeAttribute('aria-disabled');
          }
        }
      }

      picker.querySelectorAll('[data-kixro-size-option]').forEach((input) => {
        input.addEventListener('change', updateState);
      });

      updateState();
    });
  }

  document.addEventListener('DOMContentLoaded', () => initSizePicker());
  document.addEventListener('shopify:section:load', (event) => initSizePicker(event.target));
})();
