import { openImageModal } from './modal';
import { deleteCard } from './api';

const cardTemplate = document.querySelector('#card-template');

const setLike = (e) => {
  e.target.classList.toggle('card__like-button_active');
};

const removeCard = (e) => {
  const { id } = e.target.dataset;
  deleteCard(id)
    .then(() => {
      e.target.closest('.card')
        .remove();
    });
};

export const createCardNode = ({
  heading,
  imageLink,
  likes = 0,
  id,
  ownCard,
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
  cardLikeButton.addEventListener('click', setLike);
  if (ownCard) {
    cardRemoveButton.addEventListener('click', removeCard);
    cardRemoveButton.dataset.id = id;
  } else {
    cardRemoveButton.setAttribute('disabled', '');
  }
  cardImage.addEventListener('click', () => openImageModal(imageLink, heading));
  return card;
};
