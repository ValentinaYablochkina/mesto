const profileInfoOpenPopupButton = document.querySelector('.profile__edit-button') 
const popupEditProfile = document.querySelector('.popup_edit-profile') 
const popupCloseButton = document.querySelector('.popup__close') 
const popupCloseMestoButton = document.querySelector('.popup__close_mesto') 
const popupEditSaveButton = document.querySelector('.popup__save_edit-profile')
const popupMestoSaveButton = document.querySelector('.popup__save_mesto') 
const popupEditProfileForm = document.querySelector('.popup__form_edit-profile') 
const profileName = document.querySelector('.profile__name') 
const profileProfession = document.querySelector('.profile__profession') 
const nameInput = document.getElementById('name') 
const professionInput = document.getElementById('profession') 
const addMestoOpenPopupButton = document.querySelector('.profile__add-button') 
const popupAddCard = document.querySelector('.popup_mesto') 
const photoGrid = document.querySelector('.photo-grid') 
const template = document.querySelector('.item__template').content 
const placeInput = document.getElementById('place') 
const imageInput = document.getElementById('image') 
const popupFormMesto = document.querySelector('.popup__form_mesto') 
const popupView = document.querySelector('.popup-image')
const imagePopupView = document.querySelector('.popup-image__picture') 
const imageSign = document.querySelector('.popup-image__sign')

function openPopup(popupEditProfile) {
  popupEditProfile.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
} 

function closePopup(popupEditProfile) { 
  popupEditProfile.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
}

function openPopupImage(evt) { 
  openPopup(popupView)
  document.addEventListener('keydown', closeByEscape)
  imagePopupView.src = evt.target.src 
  imagePopupView.alt = evt.target.alt 
  imageSign.textContent = evt.target.alt 
}

function submitFormUsersData(evt) { 
  evt.preventDefault() 
  profileName.textContent = nameInput.value 
  profileProfession.textContent = professionInput.value 
  closePopup(popupEditProfile)
} 

function deleteCard(evt) { 
  evt.target.closest('.photo-grid__card').remove() 
} 

function addLike(evt) { 
  evt.target.classList.toggle('photo-grid__like_active') 
}

function addListeners(el) {  
  el.querySelector('.photo-grid__button').addEventListener('click', deleteCard)  
  el.querySelector('.photo-grid__like').addEventListener('click', addLike)  
  el.querySelector('.photo-grid__image').addEventListener('click', openPopupImage)  
}

function createCard(name, link) {  
  const newCard = template.cloneNode(true)
  const gridImage = newCard.querySelector('.photo-grid__image')
  newCard.querySelector('.photo-grid__text').textContent = name 
  gridImage.src = link 
  gridImage.alt = name  
  addListeners(newCard)  
  return newCard 
}

function render() {  
  initialCards.forEach((initialCards) => { 
    photoGrid.prepend(createCard(initialCards.name, initialCards.link)) 
  })
} 

function submitFormCard(evt) {
  evt.preventDefault()
  photoGrid.prepend(createCard([placeInput.value], [imageInput.value]))
  closePopup(popupAddCard) 
  popupFormMesto.reset() 
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

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') 
    closePopup(openedPopup)
    popupFormMesto.reset()
  }
}

profileInfoOpenPopupButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent 
  professionInput.value = profileProfession.textContent
  openPopup(popupEditProfile);
  checkButtonValidity({inactiveButtonClass:'popup__save_error'}, popupEditProfileForm, popupEditSaveButton)
}) 

addMestoOpenPopupButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  checkButtonValidity({inactiveButtonClass:'popup__save_error'}, popupFormMesto, popupMestoSaveButton)
  popupFormMesto.reset()
})

popupEditProfileForm.addEventListener('submit', submitFormUsersData)

popupFormMesto.addEventListener('submit', submitFormCard) 
 
render() 