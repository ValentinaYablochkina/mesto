const profileInfoOpenPopupButton = document.querySelector('.profile__edit-button') 
const popupEditProfile = document.querySelector('.popup_edit-profile') 
const popupEditProfileForm = document.querySelector('.popup__form_edit-profile') 
const profileName = document.querySelector('.profile__name') 
const profileProfession = document.querySelector('.profile__profession') 
const nameInput = document.getElementById('name') 
const professionInput = document.getElementById('profession') 
const addMestoOpenPopupButton = document.querySelector('.profile__add-button') 
const popupAddCard = document.querySelector('.popup_mesto') 
const photoGrid = document.querySelector('.photo-grid') 
const placeInput = document.getElementById('place') 
const imageInput = document.getElementById('image') 
const popupFormMesto = document.querySelector('.popup__form_mesto')


const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_error',
  inputErrorClass: 'popup__text_error',
  errorClass: 'error'
};


function closePopup(popupEditProfile) { 
  popupEditProfile.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') 
    closePopup(openedPopup)
  }
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.item__template');
  const cardElement = card.generateCard();
  photoGrid.prepend(cardElement) 
})

function submitFormUsersData(evt) {  

  evt.preventDefault()  

  profileName.textContent = nameInput.value  

  profileProfession.textContent = professionInput.value  

  closePopup(popupEditProfile) 

}  

function submitFormCard(evt) {
  evt.preventDefault()
  const card = new Card([placeInput.value], [imageInput.value], '.item__template');
  const cardElement = card.generateCard();
  photoGrid.prepend(cardElement) 
  closePopup(popupAddCard) 
  popupFormMesto.reset() 
}

export function openPopup(popupEditProfile) {
  popupEditProfile.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
} 

const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup)
  }
  if (evt.target.classList.contains('popup__close')) {
    closePopup(popup)
   }
 })
})


profileInfoOpenPopupButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent 
  professionInput.value = profileProfession.textContent
  editProfileValidator.resetValidation() 
  openPopup(popupEditProfile);
}) 

addMestoOpenPopupButton.addEventListener('click', function () {
  popupFormMesto.reset()
  addCardValidator.resetValidation() 
  openPopup(popupAddCard)
})



popupEditProfileForm.addEventListener('submit', submitFormUsersData) 

popupFormMesto.addEventListener('submit', submitFormCard)

const editProfileValidator = new FormValidator(validatorConfig, popupEditProfileForm)
const addCardValidator = new FormValidator(validatorConfig, popupFormMesto)
addCardValidator.enableValidation()
editProfileValidator.enableValidation()


import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

