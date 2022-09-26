export default class Card {

  constructor({
    data,
    selector,
    handleLike,
    isLiked,
    handleRemove,
    isOwner,
    handleClick,
  }) {
    this._selector = selector;
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._handleLike = handleLike;
    this._id = data._id;
    this._isLiked = isLiked;
    this._handleRemove = handleRemove;
    this._isOwner = isOwner;
    this._handleClick = handleClick;
  }

  _getElement() {
    return document.querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  isLiked() {
    return this._isLiked;
  }

  setLikes(likes) {
    this._likes = likes;
    this._likesCounterElement.textContent = likes.length;
  }

  toggleLikes() {
    this._isLiked = !this._isLiked;
    this._likeButtonElement.classList.toggle('card__like-button_active');
  }

  generate() {
    this._element = this._getElement();

    this._imageElement = this._element.querySelector('.card__image');
    this._nameElement = this._element.querySelector('.card__heading');
    this._likesCounterElement = this._element.querySelector('.card__like-counter');
    this._likeButtonElement = this._element.querySelector('.card__like-button');
    this._removeButtonElement = this._element.querySelector('.card__remove-button');

    this._nameElement.textContent = this._name;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._name;
    this._likesCounterElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButtonElement.classList.add('card__like-button_active');
    }

    if (!this._isOwner) {
      this._removeButtonElement.remove();
      this._removeButtonElement = null;
    }

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener('mousedown', () => {
      this._handleLike(this._id);
    });

    if (this._isOwner) {
      this._removeButtonElement.addEventListener('mousedown', () => {
        this._handleRemove(this._id);
      });
    }

    this._imageElement.addEventListener('mousedown', () => {
      this._handleClick(this._image, this._name);
    });
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
