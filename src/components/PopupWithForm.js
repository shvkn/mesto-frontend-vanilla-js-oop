import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor({
    selector,
    handleSubmit,
  }) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._element.querySelector('.form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
    this._submitButton = this._element.querySelector('.form__submit');
    this._submitButtonInitText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputList = this._inputList;
    const inputValues = {};
    inputList.forEach((input) => inputValues[input.name] = input.value);
    return inputValues;
  }

  setInputValues(values) {
    this._inputList.forEach((input) => input.value = values[input.name]);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this.renderLoading(true);
      this._handleSubmit(this._getInputValues())
        .then(() => this.close())
        .finally(() => this.renderLoading(false));
    });
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    this._submitButton.textContent = isLoading ? loadingText : this._submitButtonInitText;
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
