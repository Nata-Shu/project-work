import "./index.css";
import Api from './js/API';
import Card from './js/Card';
import CardList from './js/CardList';
import FormValidator from './js/FormValidator';
import Popup from './js/Popup';
import UserInfo from './js/UserInfo';

(function() {
  const addForm = document.forms.new;
  const profileForm = document.forms.profile;
  const avatarForm = document.forms.avatar;

  const addPopup = document.querySelector('#add-form');
  const addFormSubmitBtn = addPopup.querySelector('.button_addSave');
  const addPopupCloseBtn = addPopup.querySelector('.popup__close');
  const addPopupOpenBtn = document.querySelector('.button_user-info');

  const placesList = document.querySelector('.places-list');
  const userName = document.querySelector('.user-info__name');
  const userAbout = document.querySelector('.user-info__job');
  const profileUserName = document.getElementById('authorName');
  const profileUserAbout = document.getElementById('about');
  const fieldsForValidation = ['name', 'link', 'authorName', 'about', 'avatarLink'];

  const userId = 'bda2fc246df305d6159eb0da';

  const profilePopup = document.querySelector('#profile-form');
  const profilePopupCloseBtn = profilePopup.querySelector('.popup__close');
  const profileFormSubmitBtn = profilePopup.querySelector('.button');
  const profilePopupOpenBtn = document.querySelector('.button_edit-button');
  const errorAuthorName = document.querySelector('#error-authorName');
  const errorAbout = document.querySelector('#error-about');

  const picturePopup = document.querySelector('.picture-popup');
  const picturePopupContentImage = document.querySelector('.picture-popup-content__image');
  const bgDimmer = document.querySelector('.background__picture');

  const avatarPopup = document.querySelector('#avatar-form');
  const avatarPopupOpenBtn = document.querySelector('.user-info__photo');
  const avatarPopupCloseBtn = avatarPopup.querySelector('.popup__close');
  const avatarPopupSubmitBtn = avatarPopup.querySelector('.button_avatarSave');

  const api = new Api(API_URL, 'cohort9', '246c23bd-e825-47d2-87a3-439fef42a916');

  const card = new Card();
  const popup = new Popup(addPopup, profilePopup, avatarPopup);
  const userInfo = new UserInfo(api, userName, userAbout);
  const elements = new FormValidator(fieldsForValidation);
  const cardList = new CardList(placesList);

  cardList.render(card, api, userId);

  placesList.addEventListener('click', () => {
    popup.openBigPic(event, picturePopup, picturePopupContentImage, bgDimmer);
  });

  document.addEventListener('keyup', () => {
    popup.closeBigPic(event, picturePopup, picturePopupContentImage, bgDimmer);
  });

  document.addEventListener('click', () => {
    popup.closeBigPic(event, picturePopup, picturePopupContentImage, bgDimmer);
  });

  elements.setEventListeners.call(elements);

  addForm.addEventListener('submit', addMorePicture);

  placesList.addEventListener('click', event => {
    card.delete(api, event);
  });

  placesList.addEventListener('click', event => {
    card.like(api, event);
  });

  addPopupOpenBtn.addEventListener('click', () => {
    popup.open.call(popup, event);
  });

  profilePopupOpenBtn.addEventListener('click', () => {
    popup.open.call(popup, event, userInfo, profileForm, errorAuthorName, errorAbout);
  });

  avatarPopupOpenBtn.addEventListener('click', () => {
    popup.open.call(popup, event);
  });

  addPopupCloseBtn.addEventListener('click', popup.close);
  profilePopupCloseBtn.addEventListener('click', popup.close);
  avatarPopupCloseBtn.addEventListener('click', popup.close);

  userInfo.setUserInfo(profileForm.authorName, profileForm.about);

  profileForm.addEventListener('submit', event => {
    event.preventDefault();
    profileFormSubmitBtn.textContent = 'Загрузка...';
    api.getUserInfo(profileUserName.value, profileUserAbout.value).then(() => {
      profileFormSubmitBtn.textContent = 'Сохранить';
      userName.textContent = profileForm.authorName.value;
      userAbout.textContent = profileForm.about.value;
      popup.close(event);
    });
  });

  userInfo.setInitialAvatar(api, avatarPopupOpenBtn);

  avatarForm.addEventListener('submit', event => {
    event.preventDefault();
    avatarPopupSubmitBtn.textContent = 'Загрузка...';
    api.patchAvatar(avatarForm.avatarLink.value).then(() => {
      avatarPopupSubmitBtn.textContent = 'Сохранить';
      userInfo.setNewAvatar(avatarForm.avatarLink.value, avatarPopupOpenBtn);
      avatarForm.avatarLink.value = '';
      popup.close(event);
    });
  });

  function addMorePicture() {
    event.preventDefault();
    addFormSubmitBtn.classList.remove('button_addSave');
    addFormSubmitBtn.classList.add('button_addSaveWhileUploading');
    addFormSubmitBtn.textContent = 'Загрузка...';
    cardList.addCard(card, api, addForm.name.value, addForm.link.value).then(() => {
      addFormSubmitBtn.classList.remove('button_addSaveWhileUploading');
      addFormSubmitBtn.classList.add('button_addSave');
      addFormSubmitBtn.textContent = '+';
      addForm.reset();
      addPopup.classList.remove('popup_is-opened');
      addFormSubmitBtn.setAttribute('disabled', true);
    });
  }
})();
