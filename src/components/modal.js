import { pageEl } from './index';

const disablePageScroll = () => pageEl.classList.add('hide-overflow');
const enablePageScroll = () => pageEl.classList.remove('hide-overflow');

const openedModals = [];
const hasOpenedModals = () => openedModals.length > 0;

const closeModal = (e) => {
  if (e.key === 'Escape' || e.target.matches('.modal') || e.target.matches('.modal__close-btn')) {
    openedModals.pop()
      .classList
      .remove('modal_opened');
  }
  if (!hasOpenedModals()) {
    document.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModal);
  }
  enablePageScroll();
};

const openModal = (modal) => {
  if (!hasOpenedModals()) {
    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
  }
  openedModals.push(modal);
  modal.classList.add('modal_opened');
  disablePageScroll();
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

const openImageInModalWindow = (
  modalImageEl,
  modalImageCoverEl,
  modalImageHeadingEl,
  imageSrc,
  headingText,
) => {
  fillImageData(modalImageHeadingEl, modalImageCoverEl, headingText, imageSrc);
  openModal(modalImageEl);
};

export {
  closeModal,
  openModal,
  openImageInModalWindow,
};
