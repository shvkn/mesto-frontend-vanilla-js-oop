export default class Popup {
  constructor(selector) {
    this._handleEscClose = this._handleEscClose.bind(this);
    this._element = document.querySelector(selector);
  }

  open() {
    this._element.classList.add('modal_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('modal') || e.target.classList.contains('modal__close-button')) {
        this.close();
      }
    });
  }
}
