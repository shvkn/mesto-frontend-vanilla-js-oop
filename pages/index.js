const data = {
  profile: {
    name: 'Жак-Ив Кусто',
    caption: 'Исследователь океана',
    avatar: 'images/profile-avatar.jpg',
  },

  places: [
    {
      heading: 'Гора Эльбрус',
      img: { src: './images/elements-elbrus.jpg', alt: 'Гора Эльбрус на закате.' },
      liked: true,
    },
    {
      heading: 'Домбай',
      img: { src: './images/elements-dombay.jpg', alt: 'Гора Пик Инэ, Домбай.' },
      liked: false,
    },
    {
      heading: 'Карачаево-Черкессия',
      img: { src: './images/elements-karachay.jpg', alt: 'Древний храм в Карачаево-Черкессии.' },
      liked: true,
    },
    {
      heading: 'Алтай',
      img: { src: './images/elements-altay.jpg', alt: 'Бирбзовая Катунь, Алтай.' },
      liked: false,
    },
    {
      heading: 'Бурятия',
      img: { src: './images/elements-buratia.jpg', alt: 'Буддистский дацан, Бурятия.' },
      liked: false,
    },
    {
      heading: 'Сочи',
      img: { src: './images/elements-sochi.jpg', alt: 'Пирс, Сочи.' },
      liked: false,
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

editProfilePopup.querySelector('.popup__close-btn').addEventListener('click', (e) => closePopup(e));

editProfilePopup.querySelector('.popup__submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const name = editProfilePopup.querySelector('input[name=profile-name]');
  const caption = editProfilePopup.querySelector('input[name=profile-caption]');
  setProfileData(name.value, caption.value);
  closePopup(e);
});

const addNewPlace = (imageLink, imageDesc, heading, liked) => {
  const placeTemplate = document.querySelector('#place-template').content;
  const place = placeTemplate.querySelector('.place').cloneNode(true);

  const likeButton = place.querySelector('.place__like-btn');

  place.querySelector('.place__image').src = imageLink;
  place.querySelector('.place__image').alt = imageDesc;
  place.querySelector('.place__heading').textContent = heading;

  if (liked) {
    likeButton.classList.add('place__like-btn_active');
  }

  placesContainer.append(place);
};

const renderPlaces = () => data.places.forEach((placeObj) => addNewPlace(
  placeObj.img.src,
  placeObj.img.desc,
  placeObj.heading,
  placeObj.liked,
));

renderProfile();
renderPlaces();
