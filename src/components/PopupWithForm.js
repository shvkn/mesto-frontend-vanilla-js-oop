import Popup from './Popup';

export default class PopupWithForm extends Popup {

  constructor({
    selector,
    handleSubmit
  }) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._element.querySelector('.form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
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
      const values = this._getInputValues();
      this._handleSubmit(values);
      this.close();
    });
  }

  getSubmitButton() {
    return this._formElement.querySelector('.form__submit');
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
