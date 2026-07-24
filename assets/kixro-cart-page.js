(function () {
  function updateMinusState(stepper) {
    const input = stepper.querySelector('.kixro-cart-qty__input');
    const minus = stepper.querySelector('[data-qty-minus]');
    if (!input || !minus) return;

    const value = parseInt(input.value, 10) || 1;
    minus.disabled = value <= 1;
  }

  function announceCartUpdate(message) {
    const region = document.querySelector('[data-cart-live-region]');
    if (!region) return;
    region.textContent = message;
  }

  function submitCartUpdate(stepper, message) {
    const form = stepper.closest('form');
    if (!form) return;

    if (message) announceCartUpdate(message);

    const updateButton = form.querySelector('[data-cart-update]');
    if (updateButton) {
      updateButton.click();
      return;
    }

    form.requestSubmit();
  }

  function initQtyStepper(stepper) {
    const input = stepper.querySelector('.kixro-cart-qty__input');
    const minus = stepper.querySelector('[data-qty-minus]');
    const plus = stepper.querySelector('[data-qty-plus]');
    if (!input || !minus || !plus) return;

    updateMinusState(stepper);

    minus.addEventListener('click', () => {
      const value = parseInt(input.value, 10) || 1;
      if (value <= 1) return;
      input.value = value - 1;
      updateMinusState(stepper);
      submitCartUpdate(stepper, `Quantity updated to ${input.value}. Updating cart.`);
    });

    plus.addEventListener('click', () => {
      const value = parseInt(input.value, 10) || 1;
      input.value = value + 1;
      updateMinusState(stepper);
      submitCartUpdate(stepper, `Quantity updated to ${input.value}. Updating cart.`);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-kixro-qty-stepper]').forEach(initQtyStepper);
  });
})();
