const config = {
  token: ' a9c10068-1239-4b61-97d8-9278a4fcdf82',
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
};

const headers = {
  authorization: config.token,
  'Content-Type': 'application/json',
};

const response = (res, errorMessage) => {
  if (res.status === 200) {
    return res.json();
  }
  console.log(errorMessage);
};

export const fetchUserInfo = () => fetch(`${config.baseUrl}/users/me`, { headers })
  .then((res) => response(res, 'Error in fetchUserInfo'));

export const fetchCards = () => fetch(`${config.baseUrl}/cards`, { headers })
  .then((res) => response(res, 'Error in fetchCards'));

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
});

export const addNewCard = ({
  name,
  link,
}) => fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    name,
    link,
  }),
});