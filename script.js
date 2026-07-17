const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
if (menuButton) menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

if (window.matchMedia('(pointer: fine)').matches) {
  const cursorStyles = document.createElement('link');
  cursorStyles.rel = 'stylesheet';
  cursorStyles.href = 'cursor.css';
  document.head.append(cursorStyles);

  const cursorLens = document.querySelector('.cursor-lens') || document.createElement('div');
  cursorLens.className = 'cursor-lens';
  cursorLens.setAttribute('aria-hidden', 'true');
  document.body.append(cursorLens);
  document.documentElement.classList.add('has-water-cursor');

  document.addEventListener('pointermove', (event) => {
    cursorLens.style.left = `${event.clientX}px`;
    cursorLens.style.top = `${event.clientY}px`;
    cursorLens.classList.add('active');
    cursorLens.classList.toggle('is-hovering', Boolean(event.target.closest('a, button, summary, input, select, textarea, [role="button"]')));
  });

  document.addEventListener('pointerleave', () => cursorLens.classList.remove('active'));
  document.addEventListener('pointerenter', () => cursorLens.classList.add('active'));
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

const studioWindow = document.querySelector('.hero-room');
const aboutSection = document.querySelector('.about-section');

if (studioWindow && aboutSection) {
  let animationFrame;
  const updateSceneScale = () => {
    const viewportCenter = window.innerHeight / 2;
    const proximity = (element) => {
      const bounds = element.getBoundingClientRect();
      const elementCenter = bounds.top + bounds.height / 2;
      return Math.max(0, 1 - Math.abs(elementCenter - viewportCenter) / (window.innerHeight * .8));
    };

    studioWindow.style.setProperty('--studio-scale', (1 + proximity(studioWindow) * .065).toFixed(3));
    aboutSection.style.setProperty('--about-scale', (1 + proximity(aboutSection) * .1).toFixed(3));
    animationFrame = undefined;
  };

  const requestSceneUpdate = () => {
    if (!animationFrame) animationFrame = requestAnimationFrame(updateSceneScale);
  };

  window.addEventListener('scroll', requestSceneUpdate, { passive: true });
  window.addEventListener('resize', requestSceneUpdate);
  requestSceneUpdate();
}
