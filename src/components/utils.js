import { profileAvatarEl, profileCaptionEl, profileNameEl } from './index';
import { data } from './data';

const renderProfile = () => {
  profileNameEl.textContent = data.profile.name;
  profileCaptionEl.textContent = data.profile.caption;
  profileAvatarEl.src = data.profile.avatar;
};

const setProfileData = (name, caption, avatar) => {
  data.profile.name = name;
  data.profile.caption = caption;
  data.profile.avatar = avatar;
  renderProfile();
};

export {
  renderProfile,
  setProfileData,
};
