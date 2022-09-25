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
import PopupWithImage from './PopupWithImage';
import UserInfo from './UserInfo';
import PopupWithForm from './PopupWithForm';

const switchText = (element, text) => {
  element.textContent = text;
};

// OOP Code

const validatorConfig = {
  formSelectorClass,
  inputSelectorClass,
  submitButtonSelectorClass,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
};
const profileFormElement = document.querySelector('#form-profile');
const profileInfoFormValidator = new FormValidator({
  config: validatorConfig,
  formElement: profileFormElement
});
profileInfoFormValidator.enableValidation();

const avatarFormElement = document.querySelector('#form-avatar');
const avatarFormValidator = new FormValidator({
  config: validatorConfig,
  formElement: avatarFormElement
});
avatarFormValidator.enableValidation();

const newCardFormElement = document.querySelector('#form-new-card');

const newCardFormValidator = new FormValidator({
  config: validatorConfig,
  formElement: newCardFormElement
});

newCardFormValidator.enableValidation();

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  token: 'a9c10068-1239-4b61-97d8-9278a4fcdf82',
});

const popupWithImage = new PopupWithImage('#modal-image');

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__caption',
  avatar: '.profile__avatar-image',
});

const popupProfile = new PopupWithForm({
  selector: '#modal-profile',
  handleSubmit: (values) => {
    const name = values['profile-name'];
    const about = values['profile-caption'];

    const submitButton = popupNewCard.getSubmitButton();
    const prevText = submitButton.textContent;
    switchText(submitButton, 'Сохранение...');

    api.updateUserData({
      name,
      about
    })
      .then((user) => {
        userInfo.setUserInfo(user);
      })
      .finally(() => {
        switchText(submitButton, prevText);
      })
      .catch((error) => console.log(error));
  }
});

popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm({
  selector: '#modal-avatar',
  handleSubmit: (values) => {
    const link = values['avatar-link'];

    const submitButton = popupNewCard.getSubmitButton();
    const prevText = submitButton.textContent;
    switchText(submitButton, 'Сохранение...');

    api.updateAvatar(link)
      .then((user) => {
        userInfo.setUserInfo(user);
      })
      .finally(() => {
        switchText(submitButton, prevText);
      })
      .catch((error) => console.log(error));
  }
});

popupAvatar.setEventListeners();

const popupNewCard = new PopupWithForm({
  selector: '#modal-new-card',
  handleSubmit: (values) => {

    const submitButton = popupNewCard.getSubmitButton();
    const prevText = submitButton.textContent;
    switchText(submitButton, 'Сохранение...');

    api.createCard({
      name: values['new-card-heading'],
      link: values['new-card-link']
    })
      .then((cardData) => {
        const card = createCard(cardData, false, true);
        const cardElement = card.generate();

      })
      .finally(() => {
        switchText(submitButton, prevText);
      })
      .catch((error) => console.log(error));
  }
});
profileEditButtonEl.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  popupProfile.setInputValues({
    'profile-name': user.name,
    'profile-caption': user.about
  });
  popupProfile.open();
});

profileAvatarButton.addEventListener('click', () => {
  popupAvatar.open();
});

addCardButtonEl.addEventListener('click', () => {

});

function createCard(cardData, isLiked, isOwner) {
  const card = new Card({
    data: cardData,
    selector: '#card-template',
    handleLike: (id) => {
      if (card.isLiked()) {
        api.unsetLike(id)
          .then((updatedCardData) => {
            card.setLikes(updatedCardData.likes);
            card.toggleLikes();
          });
      } else {
        api.setLike(id)
          .then((updatedCardData) => {
            card.setLikes(updatedCardData.likes);
            card.toggleLikes();
          });
      }
    },
    handleClick: (image, text) => {
      popupWithImage.open(image, text);
    },
    isLiked: isLiked,
    handleRemove: (id) => {
      api.deleteCard(id)
        .then(() => {
          card.remove();
        });
    },
    isOwner: isOwner,
  });
  return card;
}

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
        const card = createCard(cardData, isLiked, isOwner);
        const cardElement = card.generate();
        cardSectionList.addItem(cardElement);
      },
    }, '.cards');

    cardSectionList.renderItems(cards);
    userInfo.setUserInfo(user);
  })
  .catch((error) => console.log(error));
