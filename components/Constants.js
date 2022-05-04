export const profileInfoOpenPopupButton = document.querySelector(
    '.profile__edit-button'
  );
  export const popupEditProfile = document.querySelector('.popup_edit-profile');
  export const popupEditProfileForm = document.querySelector(
    '.popup__form_edit-profile'
  );
  export const profileName = document.querySelector('.profile__name');
  export const profileProfession = document.querySelector('.profile__profession');
  export const addMestoOpenPopupButton = document.querySelector('.profile__add-button');
  export const popupAddCard = document.querySelector('.popup_mesto');
  export const photoGrid = document.querySelector('.photo-grid');
  export const popupFormMesto = document.querySelector('.popup__form_mesto');
  export const popupImagePicture = document.querySelector('.popup-image__picture')
  export const popupImage = document.querySelector('.popup-image')
  export const popupImageSign = document.querySelector('.popup-image__sign')
  export const nameInput = document.getElementById('name')
  export const professionInput = document.getElementById('profession')
  
  export const validatorConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_error',
    inputErrorClass: 'popup__text_error',
    errorClass: 'error',
    hoverSelector: 'popup__save_hover'
  }
  
  export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];