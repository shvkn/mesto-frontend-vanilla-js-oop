export default class UserInfo {
  constructor(selectors) {
    this._avatarElement = document.querySelector(selectors.avatar);
    this._nameElement = document.querySelector(selectors.name);
    this._aboutElement = document.querySelector(selectors.about);
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._nameElement.textContent,
      avatar: this._avatarElement.src,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo(user) {
    this._id = user._id;
    this._avatarElement.src = user.avatar;
    this._nameElement.textContent = user.name;
    this._aboutElement.textContent = user.about;
  }
}
