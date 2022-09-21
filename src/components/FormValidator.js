export default class FormValidator {

  constructor({
    config,
    formElement
  }) {
    this._config = config;
    this._formElement = formElement;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _deactivateButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }

  _activateButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      this._deactivateButton(buttonElement, inactiveButtonClass);
    } else {
      this._activateButton(buttonElement, inactiveButtonClass);
    }
  }

  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
  }

  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
  }

  _isValid(formElement, inputElement, inputErrorClass, errorClass) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        inputErrorClass,
        errorClass,
      );
    } else {
      this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  }

  _setEventListeners(
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  ) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);

    this._toggleButtonState(inputList, submitButton, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement, inputErrorClass, errorClass);
        this._toggleButtonState(inputList, submitButton, inactiveButtonClass);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(
      this._formElement,
      this._config.inputSelectorClass,
      this._config.submitButtonSelectorClass,
      this._config.inactiveButtonClass,
      this._config.inputErrorClass,
      this._config.errorClass
    );
  }
}
