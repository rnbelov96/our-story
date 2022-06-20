export {};

const DOMAnimations = {
  slideUp: (element, duration = 500) =>
    new Promise((resolve, reject) => {
      element.style.height = `${element.offsetHeight}px`;
      element.style.transitionProperty = 'height, margin, padding';
      element.style.transitionDuration = `${duration}ms`;
      element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      window.setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
        resolve(false);
      }, duration);
    }),
  slideDown(element, duration = 500) {
    return new Promise((resolve, reject) => {
      element.style.removeProperty('display');
      let { display } = window.getComputedStyle(element);

      if (display === 'none') display = 'block';

      element.style.display = display;
      const height = element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      element.offsetHeight;
      element.style.transitionProperty = 'height, margin, padding';
      element.style.transitionDuration = `${duration}ms`;
      element.style.height = `${height}px`;
      element.style.removeProperty('padding-top');
      element.style.removeProperty('padding-bottom');
      element.style.removeProperty('margin-top');
      element.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
      }, duration);
    });
  },

  slideToggle(element, duration = 500) {
    if (window.getComputedStyle(element).display === 'none') {
      return this.slideDown(element, duration);
    }
    return this.slideUp(element, duration);
  },
};
