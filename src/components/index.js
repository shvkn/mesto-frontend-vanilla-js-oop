import { deactivateButton, enableValidation } from './validation';
import { createCardNode } from './card';
import { closeModal, openModal } from './modal';
import { clearForm, initModals } from './utils';
import {
  addNewCard, fetchCards, fetchUserInfo, updateUserData,
} from './api';

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
const profileAvatarEl = profileEl.querySelector('.profile__avatar');

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

function setAvatar({
  avatar,
  alt,
}) {
  profileAvatarEl.src = avatar;
  profileAvatarEl.alt = alt;
}

function renderUserData({
  name,
  about,
  id,
}) {
  profileEl.dataset.id = id;
  profileNameEl.textContent = name;
  profileCaptionEl.textContent = about;
}

const getProfileId = () => profileEl.dataset.id;

const updateProfileData = ({
  name,
  about,
}) => {
  updateUserData({
    name,
    about,
  })
    .then((userData) => userData.json())
    .then((userData) => {
      renderUserData({
        name: userData.name,
        about: userData.about,
      });
    });
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
  updateProfileData({
    name: profileFormNameEl.value,
    about: profileFormCaptionEl.value,
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

  const name = newCardFormHeadingEl.value;
  const link = newCardFormImageLinkEl.value;

  addNewCard({
    name,
    link,
  })
    .then((card) => card.json())
    .then((card) => {
      const cardNode = createCardNode({
        heading: card.name,
        imageLink: card.link,
      });
      addCardToContainer(cardNode, cardsContainerEl);
      closeModal(modalNewCardEl);
    });
};

profileEditButtonEl.addEventListener('click', profileEditButtonHandler);
addCardButtonEl.addEventListener('click', newCardButtonHandler);
profileFormEl.addEventListener('submit', profileFormSubmitHandler);
newCardFormEl.addEventListener('submit', formNewCardSubmitHandler);

const renderCards = (cards = []) => {
  const profileId = getProfileId();
  cards.slice()
    .reverse()
    .forEach((cardObj) => {
      const cardNode = createCardNode({
        heading: cardObj.name,
        imageLink: cardObj.link,
        likes: cardObj.likes.length,
        id: cardObj._id,
        ownCard: (profileId === cardObj.owner._id),
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

initModals();

fetchUserInfo()
  .then((user) => {
    renderUserData({
      name: user.name,
      about: user.about,
      id: user._id,
    });
    setAvatar({
      avatar: user.avatar,
      alt: user.name,
    });
  });

fetchCards()
  .then(renderCards);
