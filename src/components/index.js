import { enableValidation, formChangedEvent } from './validation';
import { createCardNode } from './card';
import { closeModal, openModal } from './modal';
import { initModals } from './utils';
import { cards } from './initial-cards';

const cardsContainerEl = document.querySelector('.cards');
const modalNewCardEl = document.querySelector('#modal-new-card');
const addCardButtonEl = document.querySelector('.profile__add-button');

const newCardFormEl = document.querySelector('#form-new-card');
const newCardFormHeadingEl = newCardFormEl.querySelector('#new-card-heading');
const newCardFormImageLink = newCardFormEl.querySelector('#new-card-link');

const modalProfileEl = document.querySelector('#modal-profile');
const profileFormEl = modalProfileEl.querySelector('#form-profile');
const profileFormNameEl = profileFormEl.querySelector('#profile-name');
const profileFormCaptionEl = profileFormEl.querySelector('#profile-caption');

const profileEl = document.querySelector('.profile');
const profileEditButtonEl = profileEl.querySelector('.profile__edit-button');
const profileNameEl = profileEl.querySelector('.profile__name');
const profileCaptionEl = profileEl.querySelector('.profile__caption');

const getProfileData = () => {
  profileFormNameEl.value = profileNameEl.textContent;
  profileFormCaptionEl.value = profileCaptionEl.textContent;
  profileFormEl.dispatchEvent(formChangedEvent);
};

const setProfileData = ({
  name,
  caption,
}) => {
  profileNameEl.textContent = name;
  profileCaptionEl.textContent = caption;
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
});

const profileEditButtonHandler = () => {
  getProfileData();
  openModal(modalProfileEl);
};

const profileFormSubmitHandler = (e) => {
  e.preventDefault();
  setProfileData({
    name: profileFormNameEl.value,
    caption: profileFormCaptionEl.value,
  });
  profileFormEl.reset();
  closeModal(modalProfileEl);
};

profileEditButtonEl.addEventListener('click', profileEditButtonHandler);
profileFormEl.addEventListener('submit', profileFormSubmitHandler);

const addCardButtonHandler = () => {
  openModal(modalNewCardEl);
};

addCardButtonEl.addEventListener('click', addCardButtonHandler);

const addCardToContainer = (card) => {
  cardsContainerEl.prepend(card);
};

const formNewCardSubmitHandler = (e) => {
  e.preventDefault();
  const cardNode = createCardNode({
    heading: newCardFormHeadingEl.value,
    imageLink: newCardFormImageLink.value,
  });
  addCardToContainer(cardNode);
  newCardFormEl.reset();
  closeModal(modalNewCardEl);
};

newCardFormEl.addEventListener('submit', formNewCardSubmitHandler);

const renderCards = () => {
  cards.forEach((cardObj) => {
    const cardNode = createCardNode({
      heading: cardObj.name,
      imageLink: cardObj.link,
    });
    addCardToContainer(cardNode);
  });
};

renderCards();
initModals();

setProfileData({
  name: 'Жак-Ив Кусто',
  caption: 'Исследователь океана',
});
