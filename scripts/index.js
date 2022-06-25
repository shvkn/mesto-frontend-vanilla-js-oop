const page = document.querySelector('.page');
const placesContainer = document.querySelector('.places');
const placeTemplate = document.querySelector('#place-template');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

const popupProfile = document.querySelector('#popup-profile');
const formProfile = popupProfile.querySelector('#form-profile');
const formProfileName = formProfile.querySelector('#profile-name');
const formProfileCaption = formProfile.querySelector('#profile-caption');

const popupNewPlace = document.querySelector('#popup-new-place');
const formNewPlace = popupNewPlace.querySelector('#form-new-place');
const formNewPlaceHeading = formNewPlace.querySelector('#new-place-heading');
const formNewPlaceLink = formNewPlace.querySelector('#new-place-link');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCaption = profile.querySelector('.profile__caption');
const profileAvatar = profile.querySelector('.profile__avatar');
const profileAddPlaceButton = profile.querySelector('.profile__add-btn');
const profileEditButton = profile.querySelector('.profile__edit-btn');

const popupImage = document.querySelector('#popup-image');
const popupImageCover = popupImage.querySelector('.popup__cover-image');
const popupImageHeading = popupImage.querySelector('.popup__heading');

const openPopup = (popup) => {
  page.classList.add('hide-overflow');
  popup.classList.add('popup_opened');
};

const closePopup = (e) => {
  page.classList.remove('hide-overflow');
  e.target.closest('.popup').classList.remove('popup_opened');
};

const renderProfile = () => {
  profileName.textContent = data.profile.name;
  profileCaption.textContent = data.profile.caption;
  profileAvatar.src = data.profile.avatar;
};

const setProfileData = (name, caption, avatar = './images/profile-avatar.jpg') => {
  data.profile.name = name;
  data.profile.caption = caption;
  data.profile.avatar = avatar;
  renderProfile();
};

const toggleLike = (e) => {
  e.target.classList.toggle('place__like-btn_active');
};

const removePlace = (e) => {
  e.target.closest('.place').remove();
};

const openImagePopup = (e) => {
  const heading = e.target.closest('.place').querySelector('.place__heading').textContent;
  popupImageCover.src = e.target.src;
  popupImageCover.alt = heading;
  popupImageHeading.textContent = heading;
  openPopup(popupImage);
};

const createPlaceNode = (name, link) => {
  const place = placeTemplate.content.querySelector('.place').cloneNode(true);
  const placeImage = place.querySelector('.place__image');
  placeImage.src = link;
  placeImage.alt = name;
  place.querySelector('.place__heading').textContent = name;
  place.querySelector('.place__like-btn').addEventListener('click', toggleLike);
  place.querySelector('.place__remove-btn').addEventListener('click', removePlace);
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

  const placeNode = createPlaceNode(formNewPlaceHeading.value, formNewPlaceLink.value);
  insertPlaceInContainer(placeNode);
  formNewPlace.reset();
  closePopup(e);
};

const formProfileSubmitHandler = (e) => {
  e.preventDefault();
  setProfileData(formProfileName.value, formProfileCaption.value);
  closePopup(e);
};

const loadPage = () => {
  renderProfile();
  renderPlaces();
};

popupCloseButtons.forEach((el) => el.addEventListener('click', closePopup));

profileAddPlaceButton.addEventListener('click', () => openPopup(popupNewPlace));

profileEditButton.addEventListener('click', () => {
  formProfileName.value = data.profile.name;
  formProfileCaption.value = data.profile.caption;
  openPopup(popupProfile);
});

formNewPlace.addEventListener('submit', formNewPlaceSubmitHandler);
formProfile.addEventListener('submit', formProfileSubmitHandler);

loadPage();
