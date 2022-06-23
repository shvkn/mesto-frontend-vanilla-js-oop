const data = {
  profile: {
    name: 'Жак-Ив Кусто',
    caption: 'Исследователь океана',
    avatar: 'images/profile-avatar.jpg',
  },
};

const editProfilePopup = document.querySelector('#edit-profile-popup');
const profile = document.querySelector('.profile');

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
