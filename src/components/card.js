import { closeModal, openImageInModalWindow } from './modal';
import {
  newCardFormImageLink,
  newCardFormHeadingEl,
  modalImageHeadingEl,
  modalImageCoverEl,
  modalImageEl,
  cardTemplate,
  newCardFormEl,
} from './index';

import { addCardToContainer } from './utils';
import { data } from './data';

const setLike = (e) => {
  e.target.classList.toggle('card__like-button_active');
};

const removeCard = (e) => {
  e.target.closest('.card')
    .remove();
};

export const createCardNode = (heading, imageLink) => {
  const card = cardTemplate.content.querySelector('.card')
    .cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardHeading = card.querySelector('.card__heading');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardRemoveButton = card.querySelector('.card__remove-button');

  cardImage.src = imageLink;
  cardImage.alt = heading;
  cardHeading.textContent = heading;
  cardLikeButton.addEventListener('click', setLike);
  cardRemoveButton.addEventListener('click', removeCard);

  cardImage.addEventListener('click', () => {
    openImageInModalWindow(
      modalImageEl,
      modalImageCoverEl,
      modalImageHeadingEl,
      imageLink,
      heading,
    );
  });
  return card;
};

export const formNewCardSubmitHandler = (e) => {
  e.preventDefault();
  const cardNode = createCardNode(newCardFormHeadingEl.value, newCardFormImageLink.value);
  addCardToContainer(cardNode);
  newCardFormEl.reset();
  closeModal(e);
};

