export {};

const yearLabelEl = document.querySelector('.js-year');
if (yearLabelEl) {
  yearLabelEl.textContent = String(new Date().getFullYear());
}
