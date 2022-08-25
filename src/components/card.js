import { closeModal, openImageInModalWindow } from './modal';
import { data } from './data';
import {
  cardsContainerEl,
  newCardFormImageLink,
  newCardFormEl,
  newCardFormHeadingEl, modalImageHeadingEl, modalImageCoverEl, modalImageEl, cardTemplate,
} from './index';

const setLike = (e) => {
  e.target.classList.toggle('place__like-btn_active');
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
  const cardLikeButton = card.querySelector('.card__like-btn');
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

const addCardToContainer = (card) => {
  cardsContainerEl.prepend(card);
};

export const renderCards = () => {
  data.places.forEach((cardObj) => {
    const cardNode = createCardNode(cardObj.name, cardObj.link);
    addCardToContainer(cardNode);
  });
};

const formNewCardSubmitHandler = (e) => {
  e.preventDefault();
  const cardNode = createCardNode(newCardFormHeadingEl.value, newCardFormImageLink.value);
  addCardToContainer(cardNode);
  newCardFormEl.reset();
  closeModal(e);
};

newCardFormEl.addEventListener('submit', formNewCardSubmitHandler);
