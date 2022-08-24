import { data } from './data';
import {
  profileFormCaptionEl,
  profileFormNameEl, modalNewCardEl,
  modalProfileEl,
} from './index';
import { closeModal, openModal } from './modal';
import { setProfileData } from './utils';

const profileFormSubmitHandler = (e) => {
  e.preventDefault();
  setProfileData(profileFormNameEl.value, profileFormCaptionEl.value, '');
  closeModal(modalProfileEl);
};

const fillProfileForm = () => {
  profileFormNameEl.value = data.profile.name;
  profileFormCaptionEl.value = data.profile.caption;
};

const profileEditButtonHandler = () => {
  fillProfileForm();
  openModal(modalProfileEl);
};

const profileAddCardButtonHandler = () => {
  openModal(modalNewCardEl);
};

export {
  profileFormSubmitHandler,
  profileEditButtonHandler,
  profileAddCardButtonHandler,
};
