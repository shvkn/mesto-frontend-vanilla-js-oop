import { deactivateButton, enableValidation } from './validation';
import { createCardNode } from './card';
import { closeModal, openModal } from './modal';
import { clearForm, initModals } from './utils';
import { cards } from './initial-cards';

const cardsContainerEl = document.querySelector('.cards');
const modalNewCardEl = document.querySelector('#modal-new-card');
const addCardButtonEl = document.querySelector('.profile__add-button');

const newCardFormEl = document.querySelector('#form-new-card');
const newCardFormHeadingEl = newCardFormEl.querySelector('#new-card-heading');
const newCardFormImageLinkEl = newCardFormEl.querySelector('#new-card-link');
const newCardFormSubmitEl = newCardFormEl.querySelector('.form__submit');

const modalProfileEl = document.querySelector('#modal-profile');
const profileFormEl = modalProfileEl.querySelector('#form-profile');
const profileFormNameEl = profileFormEl.querySelector('#profile-name');
const profileFormCaptionEl = profileFormEl.querySelector('#profile-caption');
const profileFormSubmitEl = profileFormEl.querySelector('.form__submit');

const profileEl = document.querySelector('.profile');
const profileEditButtonEl = profileEl.querySelector('.profile__edit-button');
const profileNameEl = profileEl.querySelector('.profile__name');
const profileCaptionEl = profileEl.querySelector('.profile__caption');

const formSelectorClass = '.form';
const inputSelectorClass = '.form__input';
const submitButtonSelectorClass = '.form__submit';
const inactiveButtonClass = 'form__submit_inactive';
const inputErrorClass = 'form__input_type_error';
const errorClass = 'form__input-error_active';

const getProfileData = () => {
  profileFormNameEl.value = profileNameEl.textContent;
  profileFormCaptionEl.value = profileCaptionEl.textContent;
};

const setProfileData = ({
  name,
  caption,
}) => {
  profileNameEl.textContent = name;
  profileCaptionEl.textContent = caption;
};

const profileEditButtonHandler = () => {
  clearForm({
    formElement: profileFormEl,
    inputSelectorClass,
    inputErrorClass,
    errorClass,
  });
  getProfileData();
  openModal(modalProfileEl);
  deactivateButton(profileFormSubmitEl, inactiveButtonClass);
};

const profileFormSubmitHandler = (e) => {
  e.preventDefault();
  setProfileData({
    name: profileFormNameEl.value,
    caption: profileFormCaptionEl.value,
  });
  closeModal(modalProfileEl);
};

const newCardButtonHandler = () => {
  clearForm({
    formElement: newCardFormEl,
    inputSelectorClass,
    inputErrorClass,
    errorClass,
  });
  openModal(modalNewCardEl);
  deactivateButton(newCardFormSubmitEl, inactiveButtonClass);
};

const addCardToContainer = (card, container) => {
  container.prepend(card);
};

const formNewCardSubmitHandler = (e) => {
  e.preventDefault();
  const cardNode = createCardNode({
    heading: newCardFormHeadingEl.value,
    imageLink: newCardFormImageLinkEl.value,
  });
  addCardToContainer(cardNode, cardsContainerEl);
  closeModal(modalNewCardEl);
};

profileEditButtonEl.addEventListener('click', profileEditButtonHandler);
addCardButtonEl.addEventListener('click', newCardButtonHandler);
profileFormEl.addEventListener('submit', profileFormSubmitHandler);
newCardFormEl.addEventListener('submit', formNewCardSubmitHandler);

const renderCards = () => {
  cards.forEach((cardObj) => {
    const cardNode = createCardNode({
      heading: cardObj.name,
      imageLink: cardObj.link,
    });
    addCardToContainer(cardNode, cardsContainerEl);
  });
};

enableValidation({
  formSelectorClass,
  inputSelectorClass,
  submitButtonSelectorClass,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
});

renderCards();
initModals();

setProfileData({
  name: 'Жак-Ив Кусто',
  caption: 'Исследователь океана',
});
