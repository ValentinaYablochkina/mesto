import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profileInfoOpenPopupButton = document.querySelector(
  ".profile__edit-button"
);
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupEditProfileForm = document.querySelector(
  ".popup__form_edit-profile"
);
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const nameInput = document.getElementById("name");
const professionInput = document.getElementById("profession");
const addMestoOpenPopupButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_mesto");
const photoGrid = document.querySelector(".photo-grid");
const placeInput = document.getElementById("place");
const imageInput = document.getElementById("image");
const popupFormMesto = document.querySelector(".popup__form_mesto");
const popupImagePicture = document.querySelector('.popup-image__picture')
const popupImage = document.querySelector('.popup-image')
const popupImageSign = document.querySelector('.popup-image__sign')

const validatorConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_error",
  inputErrorClass: "popup__text_error",
  errorClass: "error",
  hoverSelector: "popup__save_hover"
}

function handleCardClick(name, link) {
  popupImagePicture.src = link;
  popupImagePicture.alt = name;
  popupImageSign.textContent = name;
  openPopup(popupImage)
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function createCard(item) {
  const card = new Card(item.name, item.link, ".item__template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCard(item)
  photoGrid.prepend(cardElement);
});

function submitFormUsersData(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEditProfile);
}

function submitFormCard(evt) {
  evt.preventDefault();
  const cardElement = createCard({name: placeInput.value, link: imageInput.value})
  photoGrid.prepend(cardElement);
  closePopup(popupAddCard);
  popupFormMesto.reset();
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

profileInfoOpenPopupButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  formValidators['profileForm'].resetValidation()
  openPopup(popupEditProfile);
});

addMestoOpenPopupButton.addEventListener("click", function () {
  popupFormMesto.reset();
  formValidators['pictureForm'].resetValidation()
  openPopup(popupAddCard);
});

popupEditProfileForm.addEventListener("submit", submitFormUsersData);

popupFormMesto.addEventListener("submit", submitFormCard);


const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validatorConfig);


