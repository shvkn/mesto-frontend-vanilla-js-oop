const config = {
  token: 'a9c10068-1239-4b61-97d8-9278a4fcdf82',
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
};

const headers = {
  authorization: config.token,
  'Content-Type': 'application/json',
};

const response = (res) => {
  if (res.status === 200) {
    return res.json();
  }
  return new Promise.reject((r) => console.log(`Error in promise. Reason: ${r.errorCode}`));
};

export const fetchUserInfo = () => fetch(`${config.baseUrl}/users/me`, { headers })
  .then((res) => response(res));

export const fetchCards = () => fetch(`${config.baseUrl}/cards`, { headers })
  .then((res) => response(res));

export const updateUserData = ({
  name,
  about,
}) => fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers,
  body: JSON.stringify({
    name,
    about,
  }),
})
  .then(response);

export const createCard = ({
  name,
  link,
}) => fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    name,
    link,
  }),
})
  .then(response);

export const deleteCard = (id) => fetch(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers,
  body: JSON.stringify({ _id: id }),
})
  .then(response);

export const likeCard = (id) => fetch(`${config.baseUrl}/cards/likes/${id}`, {
  method: 'PUT',
  headers,
  body: JSON.stringify({ _id: id }),
})
  .then(response);

export const unlikeCard = (id) => fetch(`${config.baseUrl}/cards/likes/${id}`, {
  method: 'DELETE',
  headers,
  body: JSON.stringify({ _id: id }),
})
  .then(response);

export const updateAvatar = (avatar) => fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers,
  body: JSON.stringify({ avatar }),
})
  .then(response);
