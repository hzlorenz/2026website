const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
if (menuButton) menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

const hero = document.querySelector('.hero');
const cursorLens = document.querySelector('.cursor-lens');

if (hero && cursorLens && window.matchMedia('(pointer: fine)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    cursorLens.style.left = `${event.clientX - bounds.left}px`;
    cursorLens.style.top = `${event.clientY - bounds.top}px`;
    cursorLens.classList.add('active');
  });

  hero.addEventListener('pointerleave', () => cursorLens.classList.remove('active'));
}

const projectCovers = [
  ['.image-a', 'assets/marcellus-cover.jpg', 'XR reconstruction of the Theater of Marcellus'],
  ['.image-b', 'assets/parallel-bridges-cover.png', 'Parallel Bridges augmented-reality project'],
  ['.image-c', 'assets/reassembled-cover.png', 'reAssembled virtual exhibition'],
];

projectCovers.forEach(([selector, src, alt]) => {
  document.querySelectorAll(selector).forEach((cover) => {
    const image = document.createElement('img');
    image.src = src;
    image.alt = alt;
    image.loading = 'lazy';
    image.style.cssText = 'height:100%; object-fit:cover; object-position:center;';
    cover.replaceChildren(image);
  });
});
