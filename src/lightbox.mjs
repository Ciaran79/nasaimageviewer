let overlay, imgEl, captionEl;

function buildLightbox() {
  overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image lightbox');

  imgEl = document.createElement('img');
  imgEl.id = 'lightbox-img';
  imgEl.alt = '';

  captionEl = document.createElement('p');
  captionEl.id = 'lightbox-caption';

  const closeBtn = document.createElement('button');
  closeBtn.id = 'lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close lightbox');
  closeBtn.textContent = '✕';
  closeBtn.addEventListener('click', closeLightbox);

  overlay.appendChild(closeBtn);
  overlay.appendChild(imgEl);
  overlay.appendChild(captionEl);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

export function openLightbox(hdurl, title) {
  if (!overlay) buildLightbox();
  imgEl.src = hdurl;
  imgEl.alt = title;
  captionEl.textContent = title;
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

export function closeLightbox() {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
  imgEl.src = '';
}
