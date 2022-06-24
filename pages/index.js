const data = {
  profile: {
    name: 'Жак-Ив Кусто',
    caption: 'Исследователь океана',
    avatar: 'images/profile-avatar.jpg',
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

const editProfilePopup = document.querySelector('#edit-profile-popup');
const profile = document.querySelector('.profile');
const placesContainer = document.querySelector('.places');

const renderProfile = () => {
  profile.querySelector('.profile__name').textContent = data.profile.name;
  profile.querySelector('.profile__caption').textContent = data.profile.caption;
  profile.querySelector('.profile__avatar').src = data.profile.avatar;
};

const openPopup = (popupId) => {
  document.querySelector(popupId).classList.add('popup_opened');
};

const closePopup = (e) => {
  e.target.closest('.popup').classList.remove('popup_opened');
};

document.querySelectorAll('.popup__close-btn').forEach((popup) => popup.addEventListener('click', (e) => closePopup(e)));

const setProfileData = (name, caption, avatar = 'images/profile-avatar.jpg') => {
  data.profile.name = name;
  data.profile.caption = caption;
  data.profile.avatar = avatar;
  renderProfile();
};

const renderEditPopupData = () => {
  editProfilePopup.querySelector('input[name=profile-name]').value = data.profile.name;
  editProfilePopup.querySelector('input[name=profile-caption]').value = data.profile.caption;
};

profile.querySelector('.profile__edit-btn').addEventListener('click', () => {
  renderEditPopupData();
  openPopup('#edit-profile-popup');
});

document.querySelector('.profile__add-btn').addEventListener('click', (e) => {
  openPopup('#add-new-place-popup');
});

editProfilePopup.querySelector('.popup__submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const name = editProfilePopup.querySelector('input[name=profile-name]');
  const caption = editProfilePopup.querySelector('input[name=profile-caption]');
  setProfileData(name.value, caption.value);
  closePopup(e);
});

const likeThisPlace = (e) => {
  e.target.classList.toggle('place__like-btn_active');
};

const removeThisPlace = (e) => {
  e.target.closest('.place').remove();
};

const createPlaceNode = (name, link) => {
  const placeTemplate = document.querySelector('#place-template').content;
  const place = placeTemplate.querySelector('.place').cloneNode(true);

  place.querySelector('.place__image').src = link;
  place.querySelector('.place__heading').textContent = name;
  place.querySelector('.place__like-btn').addEventListener('click', likeThisPlace);
  place.querySelector('.place__remove-btn').addEventListener('click', removeThisPlace);

  return place;
};

const insertPlaceInContainer = (place) => {
  placesContainer.prepend(place);
};

const renderPlaces = () => {
  data.places.forEach((placeObj) => {
    const placeNode = createPlaceNode(placeObj.name, placeObj.link);
    insertPlaceInContainer(placeNode);
  });
};

renderProfile();
renderPlaces();
