export default class Api {
  constructor({
    baseUrl,
    token,
  }) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._headers = {
      authorization: this._token,
      'Content-Type': 'application/json',
    };
  }

  _processResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  _request(url, options) {
    return fetch(url, options).then(this._processResponse);
  }

  fetchUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, { headers: this._headers });
  }

  fetchCards() {
    return this._request(`${this._baseUrl}/cards`, { headers: this._headers });
  }

  updateUserData({
    name,
    about,
  }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  createCard({
    name,
    link,
  }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({ _id: id }),
    });
  }

  setLike(id) {
    return this._request(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({ _id: id }),
    });
  }

  unsetLike(id) {
    return this._request(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({ _id: id }),
    });
  }

  updateAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  }
}
