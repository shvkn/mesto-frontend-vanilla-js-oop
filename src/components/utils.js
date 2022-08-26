import {
  cardsContainerEl,
} from './index';

import { data } from './data';
import { createCardNode } from './card';

const profileEl = document.querySelector('.profile');
const profileNameEl = profileEl.querySelector('.profile__name');
const profileCaptionEl = profileEl.querySelector('.profile__caption');



export const addCardToContainer = (card) => {
  cardsContainerEl.prepend(card);
};



