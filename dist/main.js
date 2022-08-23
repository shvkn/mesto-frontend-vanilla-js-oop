/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _scripts_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/index */ \"./src/scripts/index.js\");\n/* harmony import */ var _scripts_initial_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/initial-cards */ \"./src/scripts/initial-cards.js\");\n\n\n\n\n//# sourceURL=webpack://how-to-learn-plus/./src/index.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _initial_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial-cards */ \"./src/scripts/initial-cards.js\");\n\nvar page = document.querySelector('.page');\nvar placesContainer = document.querySelector('.places');\nvar placeTemplate = document.querySelector('#place-template');\nvar popupCloseButtons = document.querySelectorAll('.popup__close-btn');\nvar popupProfile = document.querySelector('#popup-profile');\nvar formProfile = popupProfile.querySelector('#form-profile');\nvar formProfileName = formProfile.querySelector('#profile-name');\nvar formProfileCaption = formProfile.querySelector('#profile-caption');\nvar popupNewPlace = document.querySelector('#popup-new-place');\nvar formNewPlace = popupNewPlace.querySelector('#form-new-place');\nvar formNewPlaceHeading = formNewPlace.querySelector('#new-place-heading');\nvar formNewPlaceLink = formNewPlace.querySelector('#new-place-link');\nvar profile = document.querySelector('.profile');\nvar profileName = profile.querySelector('.profile__name');\nvar profileCaption = profile.querySelector('.profile__caption');\nvar profileAvatar = profile.querySelector('.profile__avatar');\nvar profileAddPlaceButton = profile.querySelector('.profile__add-btn');\nvar profileEditButton = profile.querySelector('.profile__edit-btn');\nvar popupImage = document.querySelector('#popup-image');\nvar popupImageCover = popupImage.querySelector('.popup__cover-image');\nvar popupImageHeading = popupImage.querySelector('.popup__heading');\n\nvar openPopup = function openPopup(popup) {\n  page.classList.add('hide-overflow');\n  popup.classList.add('popup_opened');\n};\n\nvar closePopup = function closePopup(e) {\n  page.classList.remove('hide-overflow');\n  e.target.closest('.popup').classList.remove('popup_opened');\n};\n\nvar renderProfile = function renderProfile() {\n  profileName.textContent = _initial_cards__WEBPACK_IMPORTED_MODULE_0__.data.profile.name;\n  profileCaption.textContent = _initial_cards__WEBPACK_IMPORTED_MODULE_0__.data.profile.caption;\n  profileAvatar.src = _initial_cards__WEBPACK_IMPORTED_MODULE_0__.data.profile.avatar;\n};\n\nvar setProfileData = function setProfileData(name, caption) {\n  var avatar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : './images/profile-avatar.jpg';\n  _initial_cards__WEBPACK_IMPORTED_MODULE_0__.data.profile.name = name;\n  _initial_cards__WEBPACK_IMPORTED_MODULE_0__.data.profile.caption = caption;\n  _initial_cards__WEBPACK_IMPORTED_MODULE_0__.data.profile.avatar = avatar;\n  renderProfile();\n};\n\nvar toggleLike = function toggleLike(e) {\n  e.target.classList.toggle('place__like-btn_active');\n};\n\nvar removePlace = function removePlace(e) {\n  e.target.closest('.place').remove();\n};\n\nvar openImagePopup = function openImagePopup(e) {\n  var heading = e.target.closest('.place').querySelector('.place__heading').textContent;\n  popupImageCover.src = e.target.src;\n  popupImageCover.alt = heading;\n  popupImageHeading.textContent = heading;\n  openPopup(popupImage);\n};\n\nvar createPlaceNode = function createPlaceNode(name, link) {\n  var place = placeTemplate.content.querySelector('.place').cloneNode(true);\n  var placeImage = place.querySelector('.place__image');\n  placeImage.src = link;\n  placeImage.alt = name;\n  place.querySelector('.place__heading').textContent = name;\n  place.querySelector('.place__like-btn').addEventListener('click', toggleLike);\n  place.querySelector('.place__remove-btn').addEventListener('click', removePlace);\n  place.querySelector('.place__image').addEventListener('click', openImagePopup);\n  return place;\n};\n\nvar insertPlaceInContainer = function insertPlaceInContainer(place) {\n  return placesContainer.prepend(place);\n};\n\nvar renderPlaces = function renderPlaces() {\n  _initial_cards__WEBPACK_IMPORTED_MODULE_0__.data.places.forEach(function (placeObj) {\n    var placeNode = createPlaceNode(placeObj.name, placeObj.link);\n    insertPlaceInContainer(placeNode);\n  });\n};\n\nvar formNewPlaceSubmitHandler = function formNewPlaceSubmitHandler(e) {\n  e.preventDefault();\n  var placeNode = createPlaceNode(formNewPlaceHeading.value, formNewPlaceLink.value);\n  insertPlaceInContainer(placeNode);\n  formNewPlace.reset();\n  closePopup(e);\n};\n\nvar formProfileSubmitHandler = function formProfileSubmitHandler(e) {\n  e.preventDefault();\n  setProfileData(formProfileName.value, formProfileCaption.value);\n  closePopup(e);\n};\n\nvar loadPage = function loadPage() {\n  renderProfile();\n  renderPlaces();\n};\n\npopupCloseButtons.forEach(function (el) {\n  return el.addEventListener('click', closePopup);\n});\nprofileAddPlaceButton.addEventListener('click', function () {\n  return openPopup(popupNewPlace);\n});\nprofileEditButton.addEventListener('click', function () {\n  formProfileName.value = _initial_cards__WEBPACK_IMPORTED_MODULE_0__.data.profile.name;\n  formProfileCaption.value = _initial_cards__WEBPACK_IMPORTED_MODULE_0__.data.profile.caption;\n  openPopup(popupProfile);\n});\nformNewPlace.addEventListener('submit', formNewPlaceSubmitHandler);\nformProfile.addEventListener('submit', formProfileSubmitHandler);\nloadPage();\n\n//# sourceURL=webpack://how-to-learn-plus/./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/initial-cards.js":
/*!**************************************!*\
  !*** ./src/scripts/initial-cards.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"data\": () => (/* binding */ data)\n/* harmony export */ });\nvar data = {\n  profile: {\n    name: 'Жак-Ив Кусто',\n    caption: 'Исследователь океана',\n    avatar: new URL(/* asset import */ __webpack_require__(/*! ../images/profile-avatar.jpg */ \"./src/images/profile-avatar.jpg\"), __webpack_require__.b)\n  },\n  places: [{\n    name: 'Архыз',\n    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'\n  }, {\n    name: 'Челябинская область',\n    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'\n  }, {\n    name: 'Иваново',\n    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'\n  }, {\n    name: 'Камчатка',\n    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'\n  }, {\n    name: 'Холмогорский район',\n    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'\n  }, {\n    name: 'Байкал',\n    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'\n  }]\n};\n\n//# sourceURL=webpack://how-to-learn-plus/./src/scripts/initial-cards.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://how-to-learn-plus/./src/pages/index.css?");

/***/ }),

/***/ "./src/images/profile-avatar.jpg":
/*!***************************************!*\
  !*** ./src/images/profile-avatar.jpg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"717ae23a264d020be959.jpg\";\n\n//# sourceURL=webpack://how-to-learn-plus/./src/images/profile-avatar.jpg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;