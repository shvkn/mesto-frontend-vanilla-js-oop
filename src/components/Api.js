export default class Api {

  constructor({
    baseUrl,
    token
  }) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._headers = {
      authorization: this._token,
      'Content-Type': 'application/json',
    };
  }

  _processResponse(res) {
    if (res.status === 200) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  fetchUserInfo() {
    return fetch(
      `${this._baseUrl}/users/me`,
      { headers: this._headers },
    )
      .then(this._processResponse);
  }

  fetchCards() {
    return fetch(
      `${this._baseUrl}/cards`,
      { headers: this._headers },
    )
      .then(this._processResponse);
  }

  updateUserData({
    name,
    about
  }) {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about,
        }),
      },
    )
      .then(this._processResponse);
  }

  createCard({
    name,
    link,
  }) {
    return fetch(
      `${this._baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name,
          link,
        }),
      },
    )
      .then(this._processResponse);
  }

  deleteCard(id) {
    return fetch(
      `${this._baseUrl}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this._headers,
        body: JSON.stringify({ _id: id }),
      },
    )
      .then(this._processResponse);
  }

  setLike(id) {
    return fetch(
      `${this._baseUrl}/cards/likes/${id}`,
      {
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify({ _id: id }),
      },
    )
      .then(this._processResponse);
  }

  unsetLike(id) {
    return fetch(
      `${this._baseUrl}/cards/likes/${id}`,
      {
        method: 'DELETE',
        headers: this._headers,
        body: JSON.stringify({ _id: id }),
      },
    )
      .then(this._processResponse);
  }

  updateAvatar(avatar) {
    return fetch(
      `${this._baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ avatar }),
      },
    )
      .then(this._processResponse);
  }
}
