import Card from './Card';
import Api from './Api';
import FormValidator from './FormValidator';
import Section from './Section';
import PopupWithImage from './PopupWithImage';
import UserInfo from './UserInfo';
import PopupWithForm from './PopupWithForm';
import {
  addCardButtonElement,
  avatarFormElement,
  cardsContainerSelector,
  cardTemplateSelector,
  errorClass,
  formSelector,
  inactiveButtonClass,
  inputErrorClass,
  inputSelector,
  modalAvatarSelector,
  modalImageSelector,
  modalNewCardSelector,
  modalProfileSelector,
  newCardFormElement,
  profileAboutSelector,
  profileAvatarButtonElement,
  profileAvatarSelector,
  profileEditButtonElement,
  profileFormElement,
  profileNameSelector,
  submitButtonSelector,
} from './utils/constants';

import { switchText } from './utils/utils';

const validatorConfig = {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
};

const profileInfoFormValidator = new FormValidator({
  config: validatorConfig,
  formElement: profileFormElement,
});
profileInfoFormValidator.enableValidation();

const avatarFormValidator = new FormValidator({
  config: validatorConfig,
  formElement: avatarFormElement,
});
avatarFormValidator.enableValidation();

const newCardFormValidator = new FormValidator({
  config: validatorConfig,
  formElement: newCardFormElement,
});
newCardFormValidator.enableValidation();

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  token: 'a9c10068-1239-4b61-97d8-9278a4fcdf82',
});

const userInfo = new UserInfo({
  name: profileNameSelector,
  about: profileAboutSelector,
  avatar: profileAvatarSelector,
});

const createCard = (cardData, isLiked, isOwner) => {
  const card = new Card({
    data: cardData,
    selector: cardTemplateSelector,
    handleClick: (image, text) => {
      popupWithImage.open(image, text);
    },
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
    handleRemove: (id) => {
      api.deleteCard(id)
        .then(() => {
          card.remove();
        });
    },
    isLiked,
    isOwner,
  });
  return card;
};

const cardSectionList = new Section({
  items: [],
  renderer: (cardData) => {
    const userId = userInfo.getUserInfo().id;
    const isOwner = cardData.owner._id === userId;
    const isLiked = cardData.likes.some((like) => like._id === userId);
    const card = createCard(cardData, isLiked, isOwner);
    const cardElement = card.generate();
    cardSectionList.addItem(cardElement);
  },

}, cardsContainerSelector);

const popupWithImage = new PopupWithImage(modalImageSelector);
popupWithImage.setEventListeners();

const popupProfile = new PopupWithForm({
  selector: modalProfileSelector,
  handleSubmit: (values) => {
    const {
      'profile-name': name,
      'profile-caption': about
    } = values;

    const submitButton = popupProfile.getSubmitButton();
    const prevText = submitButton.textContent;
    switchText(submitButton, 'Сохранение...');

    api.updateUserData({
      name,
      about,
    })
      .then((user) => {
        userInfo.setUserInfo(user);
      })
      .finally(() => {
        switchText(submitButton, prevText);
      })
      .catch(console.log);
  },
});
popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm({
  selector: modalAvatarSelector,
  handleSubmit: (values) => {
    const { 'avatar-link': link } = values;
    const submitButton = popupAvatar.getSubmitButton();
    const prevText = submitButton.textContent;
    switchText(submitButton, 'Сохранение...');

    api.updateAvatar(link)
      .then((user) => {
        userInfo.setUserInfo(user);
      })
      .finally(() => {
        switchText(submitButton, prevText);
      })
      .catch(console.log);
  },
});

popupAvatar.setEventListeners();

const popupNewCard = new PopupWithForm({
  selector: modalNewCardSelector,
  handleSubmit: (values) => {
    const submitButton = popupNewCard.getSubmitButton();
    const prevText = submitButton.textContent;
    switchText(submitButton, 'Сохранение...');

    const {
      'new-card-heading': name,
      'new-card-link': link
    } = values;

    api.createCard({
      name,
      link
    })
      .then((cardData) => {
        const card = createCard(cardData, false, true);
        const cardElement = card.generate();
        cardSectionList.addItem(cardElement);
      })
      .finally(() => {
        switchText(submitButton, prevText);
      })
      .catch(console.log);
  },
});

popupNewCard.setEventListeners();

profileEditButtonElement.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  popupProfile.setInputValues({
    'profile-name': user.name,
    'profile-caption': user.about,
  });
  popupProfile.open();
});

profileAvatarButtonElement.addEventListener('click', () => {
  popupAvatar.open();
});

addCardButtonElement.addEventListener('click', () => {
  popupNewCard.open();
});

Promise.all([
  api.fetchUserInfo(),
  api.fetchCards(),
])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    cardSectionList.renderItems(cards.reverse());
  })
  .catch(console.log);
