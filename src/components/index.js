import { addCardToContainer } from './utils';

import { enableValidation } from './validation';
import { createCardNode, formNewCardSubmitHandler } from './card';
import { closeModal, openModal } from './modal';
import { cards } from './data';

export const cardsContainerEl = document.querySelector('.cards');
export const cardTemplate = document.querySelector('#card-template');
export const modalNewCardEl = document.querySelector('#modal-new-card');
const profileAddCardButtonEl = document.querySelector('.profile__add-button');

export const modalImageEl = document.querySelector('#modal-image');
export const modalImageCoverEl = modalImageEl.querySelector('.modal__cover-image');
export const modalImageHeadingEl = modalImageEl.querySelector('.modal__heading');

export const newCardFormEl = document.querySelector('#form-new-card');
export const newCardFormHeadingEl = newCardFormEl.querySelector('#new-card-heading');
export const newCardFormImageLink = newCardFormEl.querySelector('#new-card-link');

export const modalProfileEl = document.querySelector('#modal-profile');
const profileFormEl = modalProfileEl.querySelector('#form-profile');
export const profileFormNameEl = profileFormEl.querySelector('#profile-name');
export const profileFormCaptionEl = profileFormEl.querySelector('#profile-caption');

const profileEl = document.querySelector('.profile');
const profileEditButtonEl = profileEl.querySelector('.profile__edit-button');
const profileNameEl = profileEl.querySelector('.profile__name');
const profileCaptionEl = profileEl.querySelector('.profile__caption');

const getProfileData = () => {
  profileFormNameEl.value = profileNameEl.textContent;
  profileFormCaptionEl.value = profileCaptionEl.textContent;
};

const setProfileData = (name, caption) => {
  profileNameEl.textContent = name;
  profileCaptionEl.textContent = caption;
};

const profileEditButtonHandler = () => {
  getProfileData();
  openModal(modalProfileEl);
};

const profileFormSubmitHandler = (e) => {
  e.preventDefault();
  profileNameEl.textContent = profileFormNameEl.value;
  profileCaptionEl.textContent = profileFormCaptionEl.value;
  profileFormEl.reset();
  closeModal(modalProfileEl);
};

const profileAddCardButtonHandler = () => {
  openModal(modalNewCardEl);
};

profileAddCardButtonEl.addEventListener('click', profileAddCardButtonHandler);
profileEditButtonEl.addEventListener('click', profileEditButtonHandler);
profileFormEl.addEventListener('submit', profileFormSubmitHandler);
newCardFormEl.addEventListener('submit', formNewCardSubmitHandler);

cards.forEach((cardObj) => {
  const cardNode = createCardNode(cardObj.name, cardObj.link);
  addCardToContainer(cardNode);
});

setProfileData('Жак-Ив Кусто', 'Исследователь океана');

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
});

document.querySelectorAll('.modal')
  .forEach((modal) => {
    modal.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('modal') || e.target.classList.contains('modal__close-button')) {
        closeModal(modal);
      }
    });
  });
