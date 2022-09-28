import Card from './Card';
import Api from './Api';
import FormValidator from './FormValidator';
import Section from './Section';
import PopupWithImage from './PopupWithImage';
import UserInfo from './UserInfo';
import PopupWithForm from './PopupWithForm';
import {
  addCardButtonElement,
  cardsContainerSelector,
  cardTemplateSelector,
  errorClass,
  formAvatarNameAttr,
  formNewCardNameAttr,
  formProfileNameAttr,
  formSelector,
  inactiveButtonClass,
  inputErrorClass,
  inputSelector,
  modalAvatarSelector,
  modalImageSelector,
  modalNewCardSelector,
  modalProfileSelector,
  profileAboutSelector,
  profileAvatarButtonElement,
  profileAvatarSelector,
  profileEditButtonElement,
  profileNameSelector,
  submitButtonSelector,
} from '../utils/constants';

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator({ config, formElement });
    const formName = formElement.getAttribute('name');
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
};

enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
});

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  token: 'a9c10068-1239-4b61-97d8-9278a4fcdf82',
});

const userInfo = new UserInfo({
  name: profileNameSelector,
  about: profileAboutSelector,
  avatar: profileAvatarSelector,
});

const popupWithImage = new PopupWithImage(modalImageSelector);
popupWithImage.setEventListeners();

const cardSectionList = new Section({
  items: [],
  renderer: (cardData) => {
    const userId = userInfo.getUserInfo().id;
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
            }).catch(console.log);
        } else {
          api.setLike(id)
            .then((updatedCardData) => {
              card.setLikes(updatedCardData.likes);
              card.toggleLikes();
            }).catch(console.log);
        }
      },
      handleRemove: (id) => {
        api.deleteCard(id)
          .then(() => {
            card.remove();
          }).catch(console.log);
      },
      isLiked: cardData.likes.some((like) => like._id === userId),
      isOwner: cardData.owner._id === userId,
    });
    return card.generate();
  },

}, cardsContainerSelector);

const popupProfile = new PopupWithForm({
  selector: modalProfileSelector,
  handleSubmit: (values) => {
    const {
      'profile-name': name,
      'profile-caption': about,
    } = values;
    popupProfile.renderLoading(true);
    return api.updateUserData({
      name,
      about,
    })
      .then((user) => {
        userInfo.setUserInfo(user);
      })
      .catch(console.log);
  },
});
popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm({
  selector: modalAvatarSelector,
  handleSubmit: (values) => {
    const { 'avatar-link': link } = values;
    popupAvatar.renderLoading(true);
    return api.updateAvatar(link)
      .then((user) => {
        userInfo.setUserInfo(user);
      })
      .catch(console.log);
  },
});

popupAvatar.setEventListeners();

const popupNewCard = new PopupWithForm({
  selector: modalNewCardSelector,
  handleSubmit: (values) => {
    const {
      'new-card-heading': name,
      'new-card-link': link,
    } = values;
    popupNewCard.renderLoading(true);
    return api.createCard({
      name,
      link,
    })
      .then((cardData) => {
        cardSectionList.addItem(cardData);
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
  formValidators[formProfileNameAttr].resetValidation();
  popupProfile.open();
});

profileAvatarButtonElement.addEventListener('click', () => {
  formValidators[formAvatarNameAttr].resetValidation();
  popupAvatar.open();
});

addCardButtonElement.addEventListener('click', () => {
  formValidators[formNewCardNameAttr].resetValidation();
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
