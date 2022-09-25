export default class UserInfo {
  constructor(selectors) {
    this._avatarElement = document.querySelector(selectors.avatar);
    this._nameElement = document.querySelector(selectors.name);
    this._aboutElement = document.querySelector(selectors.about);
  }

  getUserInfo() {
    const user = {
      name: this._nameElement.textContent,
      avatar: this._avatarElement.src,
      about: this._aboutElement.textContent,
    };
    return user;
  }

  setUserInfo(user) {
    this._avatarElement.src = user.avatar;
    this._nameElement.textContent = user.name;
    this._aboutElement.textContent = user.about;
  }
}
