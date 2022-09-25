import Popup from "./Popup";

export default class PopupWithImage extends Popup {

 constructor(selector) {
   super(selector);
   this._imageElement = this._element.querySelector('.modal__cover-image');
   this._headingElement = this._element.querySelector('.modal__heading');
 }

  open(src, text) {
   super.open();
   this._imageElement.src = src;
   this._imageElement.alt = text;
   this._headingElement.textContent = text;
 }
}
