import { pageEl } from './index';

const disablePageScroll = () => pageEl.classList.add('hide-overflow');
const enablePageScroll = () => pageEl.classList.remove('hide-overflow');

const openedModals = [];
const hasOpenedModals = () => openedModals.length > 0;

const isClosingElement = (element) => {
  const closingElements = ['.modal', '.modal__close-button', '.form__submit'];
  return closingElements.some((closingElement) => element.matches(closingElement));
};

export const closeModal = (e) => {
  if (e.key === 'Escape' || isClosingElement(e.target)) {
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

export const openModal = (modal) => {
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
