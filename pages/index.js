const data = {
  profile: {
    name: 'Жак-Ив Кусто',
    caption: 'Исследователь океана',
    avatar: './images/profile-avatar.jpg',
  },

  places: [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
  ],
};

const popupImage = document.querySelector('#popup-image');
const popupNewPlace = document.querySelector('#popup-new-place');
const popupProfile = document.querySelector('#popup-profile');

const popupProfileName = popupProfile.querySelector('#profile-name');
const popupProfileCaption = popupProfile.querySelector('#profile-caption');

const profile = document.querySelector('.profile');
const profileAddPlaceButton = profile.querySelector('.profile__add-btn');
const profileEditButton = profile.querySelector('.profile__edit-btn');

const formProfile = popupProfile.querySelector('#form-profile');
const formNewPlace = popupNewPlace.querySelector('#form-new-place');

const placesContainer = document.querySelector('.places');

const openPopup = (popup) => popup.classList.add('popup_opened');
const closePopup = (e) => e.target.closest('.popup').classList.remove('popup_opened');

const renderProfile = () => {
  profile.querySelector('.profile__name').textContent = data.profile.name;
  profile.querySelector('.profile__caption').textContent = data.profile.caption;
  profile.querySelector('.profile__avatar').src = data.profile.avatar;
};

const setProfileData = (name, caption, avatar = './images/profile-avatar.jpg') => {
  data.profile.name = name;
  data.profile.caption = caption;
  data.profile.avatar = avatar;
  renderProfile();
};

const likeThisPlace = (e) => {
  e.target.classList.toggle('place__like-btn_active');
};

const removeThisPlace = (e) => {
  e.target.closest('.place').remove();
};

const openImagePopup = (e) => {
  const heading = e.target.closest('.place').querySelector('.place__heading').textContent;
  popupImage.querySelector('.popup__cover-image').src = e.target.src;
  popupImage.querySelector('.popup__heading').textContent = heading;
  openPopup(popupImage);
};

const createPlaceNode = (name, link) => {
  const placeTemplate = document.querySelector('#place-template').content;
  const place = placeTemplate.querySelector('.place').cloneNode(true);

  place.querySelector('.place__image').src = link;
  place.querySelector('.place__heading').textContent = name;
  place.querySelector('.place__like-btn').addEventListener('click', likeThisPlace);
  place.querySelector('.place__remove-btn').addEventListener('click', removeThisPlace);
  place.querySelector('.place__image').addEventListener('click', openImagePopup);

  return place;
};

const insertPlaceInContainer = (place) => placesContainer.prepend(place);

const renderPlaces = () => {
  data.places.forEach((placeObj) => {
    const placeNode = createPlaceNode(placeObj.name, placeObj.link);
    insertPlaceInContainer(placeNode);
  });
};

const formNewPlaceSubmitHandler = (e) => {
  e.preventDefault();
  const heading = formNewPlace.querySelector('#new-place-heading');
  const link = formNewPlace.querySelector('#new-place-link');
  const placeNode = createPlaceNode(heading.value, link.value);
  insertPlaceInContainer(placeNode);
  formNewPlace.reset();
  closePopup(e);
};

const formProfileSubmitHandler = (e) => {
  e.preventDefault();
  setProfileData(popupProfileName.value, popupProfileCaption.value);
  closePopup(e);
};

const loadPage = () => {
  renderProfile();
  renderPlaces();
};

document.querySelectorAll('.popup__close-btn').forEach((el) => el.addEventListener('click', closePopup));

profileAddPlaceButton.addEventListener('click', () => openPopup(popupNewPlace));

profileEditButton.addEventListener('click', () => {
  popupProfileName.value = data.profile.name;
  popupProfileCaption.value = data.profile.caption;
  openPopup(popupProfile);
});

formNewPlace.addEventListener('submit', formNewPlaceSubmitHandler);
formProfile.addEventListener('submit', formProfileSubmitHandler);

loadPage();
