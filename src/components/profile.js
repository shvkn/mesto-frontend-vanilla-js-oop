import {
  profileFormCaptionEl,
  profileFormNameEl, modalNewCardEl,
  modalProfileEl,
} from './index';
import { closeModal, openModal } from './modal';
import { setProfileData } from './utils';
import { avatarLink } from './data';

export const profileFormSubmitHandler = (e) => {
  e.preventDefault();
  setProfileData(profileFormNameEl.value, profileFormCaptionEl.value, avatarLink);
  closeModal(e);
};

export const profileEditButtonHandler = () => {
  openModal(modalProfileEl);
};

export const profileAddCardButtonHandler = () => {
  openModal(modalNewCardEl);
};
