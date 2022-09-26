export default class FormValidator {

  constructor({
    config,
    formElement
  }) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _deactivateButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }

  _activateButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._deactivateButton(buttonElement, this._inactiveButtonClass);
    } else {
      this._activateButton(buttonElement, this._inactiveButtonClass);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage,);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement,);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
