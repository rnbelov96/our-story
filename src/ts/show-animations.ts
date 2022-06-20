export {};

const animationElList = [
  ...document.querySelectorAll('.animateX'),
  ...document.querySelectorAll('.animateY'),
  ...document.querySelectorAll('.animateX-reverse'),
  ...document.querySelectorAll('.animateY-reverse'),
  ...document.querySelectorAll('.animateZ'),
];

const windowHeight = document.documentElement.clientHeight;

setTimeout(() => {
  window.addEventListener('scroll', () => {
    const winTop = window.pageYOffset;

    animationElList.forEach(elem => {
      if (elem.classList.contains('animated')) {
        return;
      }

      const topCoords = elem.getBoundingClientRect().top + window.pageYOffset;

      if (winTop > topCoords - windowHeight * 0.75) {
        elem.classList.add('animated');
      }
    });
  });
}, 500);
