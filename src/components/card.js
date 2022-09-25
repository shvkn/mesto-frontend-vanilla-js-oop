import {
  closeModal, getConfirm, openImageModal, openModal,
} from './modal';
// import { deleteCard, setLike, unsetLike } from './Api';
import {cardLikeButtonActiveClass, cardTemplate, modalConfirm} from './utils/constants';

export class Card {
  constructor({
                data, selector, handleLike, isLiked, handleRemove, isOwner, handleClick
              }) {
    this._data = data;
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
    return document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
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
    this._nameElement.textContent = this._name;
    this._likesCounterElement = this._element.querySelector('.card__like-counter');
    this._likeButtonElement = this._element.querySelector('.card__like-button');
    this._removeButtonElement = this._element.querySelector('.card__remove-button');
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
    this._likeButtonElement.addEventListener('click', () => {
      this._handleLike(this._id);
    });
    if (this._isOwner) {
      this._removeButtonElement.addEventListener('click', () => {
        this._handleRemove(this._id);
      });
    }
    this._imageElement.addEventListener('click', () => {
      this._handleClick(this._image, this._name);
    });
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}

function handleLikeButtonClick(e) {
  const {id} = e.target.dataset;
  const likeContainer = e.target.closest('.card')
    .querySelector('.card__like-counter');

  const liked = e.target.classList.contains(cardLikeButtonActiveClass);

  if (liked) {
    unsetLike(id)
      .then((card) => {
        e.target.classList.remove(cardLikeButtonActiveClass);
        likeContainer.textContent = card.likes.length;
      })
      .catch((error) => console.log(error));
  } else {
    setLike(id)
      .then((card) => {
        e.target.classList.add(cardLikeButtonActiveClass);
        likeContainer.textContent = card.likes.length;
      })
      .catch((error) => console.log(error));
  }
}

const handleRemoveCardClick = (e) => {
  openModal(modalConfirm);
  getConfirm(modalConfirm, () => {
    const {id} = e.target.dataset;
    deleteCard(id)
      .then(() => {
        e.target.closest('.card')
          .remove();
        closeModal(modalConfirm);
      })
      .catch((error) => console.log(error));
  });
};

export const createCardNode = ({
                                 heading,
                                 imageLink,
                                 id,
  likes = 0,
  ownCard = false,
  liked = false,
}) => {
  const card = cardTemplate.content.querySelector('.card')
    .cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardHeading = card.querySelector('.card__heading');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardRemoveButton = card.querySelector('.card__remove-button');
  const cardLikes = card.querySelector('.card__like-counter');
  cardImage.src = imageLink;
  cardImage.alt = heading;
  cardHeading.textContent = heading;
  cardLikes.textContent = likes;
  cardLikeButton.addEventListener('click', handleLikeButtonClick);
  cardLikeButton.dataset.id = id;

  if (liked) {
    cardLikeButton.classList.add(cardLikeButtonActiveClass);
  }
  if (ownCard) {
    cardRemoveButton.addEventListener('click', handleRemoveCardClick);
    cardRemoveButton.dataset.id = id;
  } else {
    cardRemoveButton.setAttribute('disabled', '');
  }
  cardImage.addEventListener('click', () => openImageModal(imageLink, heading));
  return card;
};
