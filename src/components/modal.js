const closeByEsc = (e) => {
  if (e.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened');
    closeModal(openedModal);
  }
};

export const closeModal = (modal) => {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', closeByEsc);
};

export const openModal = (modal) => {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeByEsc);
};

function fillImageData(
  imageCaptionEl,
  imageEl,
  headingText,
  imageSrc,
  imageAlt = headingText,
) {
  imageEl.src = imageSrc;
  imageEl.alt = imageAlt;
  imageCaptionEl.textContent = headingText;
}

export const openImageInModalWindow = (
  modalImageEl,
  modalImageCoverEl,
  modalImageHeadingEl,
  imageSrc,
  headingText,
) => {
  fillImageData(modalImageHeadingEl, modalImageCoverEl, headingText, imageSrc);
  openModal(modalImageEl);
};
