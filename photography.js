const photographyImages = [
  '9592202F-202A-4B05-A0D2-8E47264C4D82-47703-00000B934BD6C464.jpg',
  'B3FF609B-499A-4E60-B97A-2EC7EA7D2E1C.jpg',
  'DSCF0018.jpg',
  'DSCF0050.jpg',
  'DSCF0220.jpg',
  'DSCF0273.jpg',
  'DSCF0960.jpg',
  'DSCF0996.jpg',
  'DSCF1091.jpg',
  'DSCF1614.jpg',
  'DSCF1660.jpg',
  'DSCF1682.jpg',
  'DSCF2678.jpg',
  'DSCF2955.jpg',
  'DSCF6590.jpg',
  'DSCF2970.jpg',
  'DSCF3339.jpg',
  'DSCF3871.jpg',
  'DSCF4925.jpg',
  'DSCF5155.jpg',
  'DSCF5292.jpg',
  'DSCF5398.jpg',
  'DSCF5745.jpg',
  'DSCF5829.jpg',
  'DSCF5884.jpg',
  'DSCF9547.jpg',
  'DSCF6085.jpg',
  'DSCF6121.jpg',
  'DSCF6346.jpg',
  'DSCF6350.jpg',
  'DSCF6351.jpg',
  'DSCF6403.jpg',
  'DSCF6495.jpg',
  'DSCF6517.jpg',
  'DSCF6563.jpg',
  'DSCF6713.jpg',
  'DSCF6754.jpg',
  'DSCF7180.jpg',
  'DSCF7191.jpg',
  'DSCF8008.jpg',
  'DSCF8032.jpg',
  'DSCF8075.jpg',
  'DSCF6598.jpg',
  'DSCF8097.jpg',
  'DSCF8176.jpg',
  'DSCF8799.jpg',
  'DSCF9143.jpg',
  'DSCF9277.jpg',
  'DSCF9336.jpg',
  'DSCF9480.jpg',
  'DSCF9522.jpg',
  'DSCF9629.jpg',
  'DSCF9662.jpg',
  'DSCF9562.jpg',
  'DSCF9714.jpg',
  'DSCF9803.jpg',
  'DSCF9858.jpg',
  'DSCF9879.jpg',
  'DSCF9985.jpg',
  'DSCF9988.jpg',
  'IMG_2185.jpg',
  'img017.jpg',
].map((filename) => ({
  src: `assets/photography/${filename}`,
}));

const photographyGallery = document.querySelector('[data-photography-gallery]');

if (photographyGallery) {
  photographyGallery.innerHTML = photographyImages.map(({ src }, index) => `
    <li class="photo-item">
      <button class="photo-card" type="button" aria-pressed="false">
        <img src="${src}" alt="" data-i18n-attr="alt:photography.photoAlt" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async">
        <span class="photo-count" aria-hidden="true">${index + 1}/${photographyImages.length}</span>
      </button>
    </li>
  `).join('');

  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const photoItems = Array.from(photographyGallery.querySelectorAll('.photo-item'));
  let lastPointerType = 'mouse';
  let clearTimer;

  photoItems.forEach((item) => {
    const image = item.querySelector('img');
    const setPhotoRatio = () => {
      if (!image.naturalWidth || !image.naturalHeight) return;
      item.style.setProperty('--photo-ratio', image.naturalWidth / image.naturalHeight);
      item.classList.toggle('is-portrait', image.naturalHeight > image.naturalWidth);
    };

    if (image.complete) setPhotoRatio();
    else image.addEventListener('load', setPhotoRatio, { once: true });
  });

  const setActiveImage = (item) => {
    photographyGallery.querySelectorAll('.photo-item').forEach((photoItem) => {
      const isActive = photoItem === item;
      photoItem.classList.toggle('is-active', isActive);
      photoItem.querySelector('.photo-card').setAttribute('aria-pressed', String(isActive));
    });
  };

  const clearActiveImage = () => setActiveImage(null);

  if (supportsHover) {
    photoItems.forEach((item) => {
      item.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'touch') return;
        window.clearTimeout(clearTimer);
        setActiveImage(item);
      });

      item.addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'touch') return;
        clearTimer = window.setTimeout(() => {
          if (!photographyGallery.querySelector('.photo-item:hover')) clearActiveImage();
        }, 70);
      });
    });

    photographyGallery.addEventListener('pointerleave', () => {
      window.clearTimeout(clearTimer);
      clearActiveImage();
    });
  }

  photographyGallery.addEventListener('pointerdown', (event) => {
    lastPointerType = event.pointerType;
  }, { passive: true });

  photographyGallery.addEventListener('click', (event) => {
    const card = event.target.closest('.photo-card');
    if (!card || (supportsHover && lastPointerType !== 'touch')) return;
    const item = card.closest('.photo-item');
    setActiveImage(item.classList.contains('is-active') ? null : item);
  });
}
