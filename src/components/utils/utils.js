import { closeModal } from '../modal';
import { hideInputError } from '../validation';

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

function hideInputErrors(formElement, inputSelectorClass, inputErrorClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelectorClass));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  });
}

export const clearForm = ({
  formElement,
  inputSelectorClass,
  inputErrorClass,
  errorClass,
}) => {
  hideInputErrors(formElement, inputSelectorClass, inputErrorClass, errorClass);
  formElement.reset();
};
