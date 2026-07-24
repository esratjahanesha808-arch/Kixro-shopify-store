(function () {
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-kixro-add-to-cart]');
    if (!button || button.disabled) return;

    const variantId = button.dataset.variantId;
    if (!variantId || !window.routes?.cart_add_url) return;

    event.preventDefault();
    button.disabled = true;
    const originalLabel = button.textContent;
    button.textContent = 'Adding…';
    button.setAttribute('aria-busy', 'true');

    try {
      const response = await fetch(`${window.routes.cart_add_url}.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          items: [{ id: parseInt(variantId, 10), quantity: 1 }],
        }),
      });

      if (!response.ok) throw new Error('Add to cart failed');

      window.location.href = window.routes.cart_url;
    } catch (error) {
      button.disabled = false;
      button.textContent = originalLabel;
      button.removeAttribute('aria-busy');
    }
  });
})();
