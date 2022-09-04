const modalImageEl = document.querySelector('#modal-image');
const modalImageCoverEl = modalImageEl.querySelector('.modal__cover-image');
const modalImageHeadingEl = modalImageEl.querySelector('.modal__heading');

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
  const listenerHandler = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  let isSubscribed = false;
  const checkModalInterval = setInterval(() => {
    if (modal.classList.contains('modal_opened')) {
      if (!isSubscribed) {
        confirmForm.addEventListener('submit', listenerHandler);
        isSubscribed = true;
      }
    } else {
      confirmForm.removeEventListener('submit', listenerHandler);
      clearInterval(checkModalInterval);
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
