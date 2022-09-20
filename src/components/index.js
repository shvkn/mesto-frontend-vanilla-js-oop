import { deactivateButton, enableValidation } from './validation';
import { createCardNode } from './card';
import { closeModal, openModal } from './modal';
import { clearForm, initModals } from './utils/utils';
import { createCard, fetchCards, fetchUserInfo, updateAvatar, updateUserData, } from './api';
import {
  addCardButtonEl,
  avatarFormEl,
  avatarFormLink,
  avatarSubmitButton,
  cardsContainerEl,
  errorClass,
  formSelectorClass,
  inactiveButtonClass,
  inputErrorClass,
  inputSelectorClass,
  modalAvatarEl,
  modalNewCardEl,
  modalProfileEl,
  newCardFormEl,
  newCardFormHeadingEl,
  newCardFormImageLinkEl,
  newCardFormSubmitEl,
  profileAvatarButton,
  profileAvatarImageEl,
  profileCaptionEl,
  profileEditButtonEl,
  profileEl,
  profileFormCaptionEl,
  profileFormEl,
  profileFormNameEl,
  profileFormSubmitEl,
  profileNameEl,
  submitButtonSelectorClass
} from './utils/constants';

const getProfileData = () => {
  profileFormNameEl.value = profileNameEl.textContent;
  profileFormCaptionEl.value = profileCaptionEl.textContent;
};

function setAvatar({
  avatar,
  alt,
}) {
  profileAvatarImageEl.src = avatar;
  profileAvatarImageEl.alt = alt;
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
}) => updateUserData({
  name,
  about,
})
  .then((userData) => {
    renderUserData({
      name: userData.name,
      about: userData.about,
    });
  })
  .catch((error) => console.log(error));

const handleProfileEditButtonClick = () => {
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

const switchText = (element, text) => {
  element.textContent = text;
};

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  const prevText = profileFormSubmitEl.textContent;
  switchText(profileFormSubmitEl, 'Сохранение...');
  updateProfileData({
    name: profileFormNameEl.value,
    about: profileFormCaptionEl.value,
  })
    .then(() => closeModal(modalProfileEl))
    .catch((error) => console.log(error))
    .finally(() => {
      switchText(profileFormSubmitEl, prevText);
    });
};

const handleNewCardButtonClick = () => {
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

const handleNewCardFormSubmit = (e) => {
  e.preventDefault();
  const name = newCardFormHeadingEl.value;
  const link = newCardFormImageLinkEl.value;
  const prevText = newCardFormSubmitEl.textContent;
  switchText(newCardFormSubmitEl, 'Сохранение...');
  createCard({
    name,
    link,
  })
    .then((card) => {
      const cardNode = createCardNode({
        heading: card.name,
        imageLink: card.link,
        id: card._id,
        ownCard: true,
      });
      addCardToContainer(cardNode, cardsContainerEl);
      closeModal(modalNewCardEl);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      switchText(newCardFormSubmitEl, prevText);
    });
};

const handleAvatarChangeButtonClick = () => {
  openModal(modalAvatarEl);
};

const handleAvatarFormSubmit = (e) => {
  e.preventDefault();
  const avatarLink = avatarFormLink.value;
  const prevText = avatarSubmitButton.textContent;
  switchText(avatarSubmitButton, 'Сохранение...');
  updateAvatar(avatarLink)
    .then((user) => {
      setAvatar({
        avatar: user.avatar,
        alt: user.name,
      });
      closeModal(modalAvatarEl);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      switchText(avatarSubmitButton, prevText);
    });
};

profileAvatarButton.addEventListener('click', handleAvatarChangeButtonClick);
avatarFormEl.addEventListener('submit', handleAvatarFormSubmit);

profileEditButtonEl.addEventListener('click', handleProfileEditButtonClick);
addCardButtonEl.addEventListener('click', handleNewCardButtonClick);
profileFormEl.addEventListener('submit', handleProfileFormSubmit);
newCardFormEl.addEventListener('submit', handleNewCardFormSubmit);

const renderCards = (cards) => {
  const profileId = getProfileId();

  cards.slice()
    .reverse()
    .forEach((card) => {
      const cardNode = createCardNode({
        heading: card.name,
        imageLink: card.link,
        likes: card.likes.length,
        id: card._id,
        ownCard: (profileId === card.owner._id),
        liked: (card.likes.find((user) => user._id === profileId)),
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

Promise.all([
  fetchUserInfo(),
  fetchCards(),
])
  .then(([user, cards]) => {
    renderUserData({
      name: user.name,
      about: user.about,
      id: user._id,
    });
    setAvatar({
      avatar: user.avatar,
      alt: user.name,
    });
    renderCards(cards);
  })
  .catch((error) => console.log(error));
