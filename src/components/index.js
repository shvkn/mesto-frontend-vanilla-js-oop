import { deactivateButton, enableValidation } from './validation';
import { createCardNode, Card } from './card';
import { closeModal, openModal } from './modal';
import { clearForm, initModals } from './utils/utils';
import Api from './Api';
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
  submitButtonSelectorClass,
} from './utils/constants';
import FormValidator from './FormValidator';
import Section from './Section';

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

/* enableValidation({
  formSelectorClass,
  inputSelectorClass,
  submitButtonSelectorClass,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}); */
const validatorConfig = {
  formSelectorClass,
  inputSelectorClass,
  submitButtonSelectorClass,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
};
const profileFormElement = document.querySelector('#form-profile');
const profileInfoFormValidator = new FormValidator({ config: validatorConfig, formElement: profileFormElement });
profileInfoFormValidator.enableValidation();

const avatarFormElement = document.querySelector('#form-avatar');
const avatarFormValidator = new FormValidator({ config: validatorConfig, formElement: avatarFormElement });
avatarFormValidator.enableValidation();

const newCardFormElement = document.querySelector('#form-new-card');
const newCardFormValidator = new FormValidator({ config: validatorConfig, formElement: avatarFormElement });
newCardFormValidator.enableValidation();

initModals();
// Code

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  token: 'a9c10068-1239-4b61-97d8-9278a4fcdf82',
});

Promise.all([
  api.fetchUserInfo(),
  api.fetchCards(),
])
  .then(([user, cards]) => {
    const cardSectionList = new Section({
      items: cards,
      renderer: (cardData) => {

        const isOwner = cardData.owner._id === user._id;
        const isLiked = cardData.likes.some((like) => like._id === user._id);
        const card = new Card({
          data: cardData,
          selector: '#card-template',
          handleLike: (id) => {
            if (card.isLiked()) {
              api.unsetLike(id).then((updatedCardData) => {
                card.setLikes(updatedCardData.likes);
                card.toggleLikes();
              });
            } else {
              api.setLike(id).then((updatedCardData) => {
                card.setLikes(updatedCardData.likes);
                card.toggleLikes();
              });
            }
          },
          isLiked: isLiked,
          handleRemove: (id) => {
            api.deleteCard(id).then(() => { card.remove(); });
          },
          isOwner: isOwner,
        });
        const cardElement = card.generate();
        cardSectionList.addItem(cardElement);
      },
    }, '.cards');

    cardSectionList.renderItems(cards);

    renderUserData({
      name: user.name,
      about: user.about,
      id: user._id,
    });
    setAvatar({
      avatar: user.avatar,
      alt: user.name,
    });
  })
  .catch((error) => console.log(error));
