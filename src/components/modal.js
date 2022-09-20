import { modalImageCoverEl, modalImageEl, modalImageHeadingEl } from './utils/constants';

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

export const getConfirm = (modal, handleSubmit) => {
  const confirmForm = modal.querySelector('.form');
  const handleConfirm = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  let isSubscribed = false;
  const openedModalCheckInterval = setInterval(() => {
    if (modal.classList.contains('modal_opened')) {
      if (!isSubscribed) {
        confirmForm.addEventListener('submit', handleConfirm);
        isSubscribed = true;
      }
    } else {
      confirmForm.removeEventListener('submit', handleConfirm);
      clearInterval(openedModalCheckInterval);
    }
  });
};

function fillImageData({
  imageSrc,
  headingText,
  imageAlt = headingText,
}) {
  modalImageCoverEl.src = imageSrc;
  modalImageCoverEl.alt = imageAlt;
  modalImageHeadingEl.textContent = headingText;
}

export const openImageModal = (imageSrc, headingText) => {
  fillImageData({
    imageSrc,
    headingText,
  });
  openModal(modalImageEl);
};
