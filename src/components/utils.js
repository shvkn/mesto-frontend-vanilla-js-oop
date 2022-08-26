import { closeModal } from './modal';

export const initModals = () => {
  document.querySelectorAll('.modal')
    .forEach((modal) => {
      modal.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('modal') || e.target.classList.contains('modal__close-button')) {
          closeModal(modal);
        }
      });
    });
};
