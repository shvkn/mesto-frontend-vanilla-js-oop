import {
  cardsContainerEl,
  profileAvatarEl,
  profileCaptionEl,
  profileFormCaptionEl,
  profileFormNameEl,
  profileNameEl,
} from './index';
import { data } from './data';
import { createCardNode } from './card';

export const renderProfile = () => {
  profileNameEl.textContent = data.profile.name;
  profileCaptionEl.textContent = data.profile.caption;
  profileAvatarEl.src = data.profile.avatar;
  profileFormNameEl.value = data.profile.name;
  profileFormCaptionEl.value = data.profile.caption;
};

export const setProfileData = (name, caption, avatar) => {
  data.profile.name = name;
  data.profile.caption = caption;
  data.profile.avatar = avatar;
  renderProfile();
};

export const addCardToContainer = (card) => {
  cardsContainerEl.prepend(card);
};

export const renderCards = () => {
  data.places.forEach((cardObj) => {
    const cardNode = createCardNode(cardObj.name, cardObj.link);
    addCardToContainer(cardNode);
  });
};
