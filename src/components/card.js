import {
  closeModal, getConfirm, openImageModal, openModal,
} from './modal';
import { deleteCard, setLike, unsetLike } from './api';

const cardTemplate = document.querySelector('#card-template');
const cardLikeButtonActiveClass = 'card__like-button_active';
const modalConfirm = document.querySelector('#modal-confirm');

const onLikeButtonClick = (e) => {
  const { id } = e.target.dataset;
  const likeContainer = e.target.closest('.card')
    .querySelector('.card__like-counter');

  const liked = e.target.classList.contains(cardLikeButtonActiveClass);

  if (liked) {
    unsetLike(id)
      .then((card) => {
        e.target.classList.remove(cardLikeButtonActiveClass);
        likeContainer.textContent = card.likes.length;
      });
  } else {
    setLike(id)
      .then((card) => {
        e.target.classList.add(cardLikeButtonActiveClass);
        likeContainer.textContent = card.likes.length;
      });
  }
};

const onRemoveCardClick = (e) => {
  openModal(modalConfirm);
  getConfirm(modalConfirm, () => {
    const { id } = e.target.dataset;
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
  cardLikeButton.addEventListener('click', onLikeButtonClick);
  cardLikeButton.dataset.id = id;

  if (liked) {
    cardLikeButton.classList.add(cardLikeButtonActiveClass);
  }
  if (ownCard) {
    cardRemoveButton.addEventListener('click', onRemoveCardClick);
    cardRemoveButton.dataset.id = id;
  } else {
    cardRemoveButton.setAttribute('disabled', '');
  }
  cardImage.addEventListener('click', () => openImageModal(imageLink, heading));
  return card;
};
