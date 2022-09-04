const config = {
  token: 'a9c10068-1239-4b61-97d8-9278a4fcdf82',
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
};

const headers = {
  authorization: config.token,
  'Content-Type': 'application/json',
};

const processResponse = (res) => {
  if (res.status === 200) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

export const fetchUserInfo = () => fetch(
  `${config.baseUrl}/users/me`,
  { headers },
)
  .then((res) => processResponse(res));

export const fetchCards = () => fetch(
  `${config.baseUrl}/cards`,
  { headers },
)
  .then((res) => processResponse(res));

export const updateUserData = ({
  name,
  about,
}) => fetch(
  `${config.baseUrl}/users/me`,
  {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      about,
    }),
  },
)
  .then(processResponse);

export const createCard = ({
  name,
  link,
}) => fetch(
  `${config.baseUrl}/cards`,
  {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      link,
    }),
  },
)
  .then(processResponse);

export const deleteCard = (id) => fetch(
  `${config.baseUrl}/cards/${id}`,
  {
    method: 'DELETE',
    headers,
    body: JSON.stringify({ _id: id }),
  },
)
  .then(processResponse);

export const setLike = (id) => fetch(
  `${config.baseUrl}/cards/likes/${id}`,
  {
    method: 'PUT',
    headers,
    body: JSON.stringify({ _id: id }),
  },
)
  .then(processResponse);

export const unsetLike = (id) => fetch(
  `${config.baseUrl}/cards/likes/${id}`,
  {
    method: 'DELETE',
    headers,
    body: JSON.stringify({ _id: id }),
  },
)
  .then(processResponse);

export const updateAvatar = (avatar) => fetch(
  `${config.baseUrl}/users/me/avatar`,
  {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ avatar }),
  },
)
  .then(processResponse);
