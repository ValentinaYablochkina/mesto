const profileInfoOpenPopupButton = document.querySelector('.profile__edit-button') 
const popup = document.querySelector('.popup') 
const popupCloseButton = document.querySelector('.popup__close') 
const popupCloseMestoButton = document.querySelector('.popup-mesto__close') 
const popupSave = document.querySelector('.popup__save') 
const popupForm = document.querySelector('.popup__form') 
const profileName = document.querySelector('.profile__name') 
const profileProfession = document.querySelector('.profile__profession') 
const nameInput = document.getElementById('name') 
const professionInput = document.getElementById('profession') 
const addMestoOpenPopupButton = document.querySelector('.profile__add-button') 
const popupMesto = document.querySelector('.popup-mesto') 
const photoGrid = document.querySelector('.photo-grid') 
const addButton = document.querySelector('.profile__add-button') 
const template = document.querySelector('.item__template').content 
const placeInput = document.getElementById('place') 
const imageInput = document.getElementById('image') 
const popupFormMesto = document.querySelector('.popup-mesto__form') 
const popupSaveMesto = document.querySelector('.popup-mesto__save') 
const openImage = document.querySelector('.popup-image') 
const closeImage = document.querySelector('.popup-image__close') 
const image = document.querySelector('.popup-image__picture') 
const imageSign = document.querySelector('.popup-image__sign')
const popupContainer = document.querySelector('.popup__container')
const popupContainerMesto = document.querySelector('.popup-mesto__container')
const popupContainerImage = document.querySelector('.popup-image__container')


const initialCards = [ 
  {
    name: 'Архыз', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' 
  }, 
  { 
    name: 'Челябинская область', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' 
  }, 
  { 
    name: 'Иваново', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' 
  }, 
  {
    name: 'Камчатка', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' 
  }, 
  {
    name: 'Холмогорский район', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' 
  }, 
  { 
    name: 'Байкал', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' 
  } 
]; 

function openPopup(popup) { 
  popup.classList.add('popup_opened')
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_error',
    inputErrorClass: 'popup__text_error',
    errorClass: 'error'
  });
} 

function closePopup(popup) { 
  popup.classList.remove('popup_opened') 
}

function openPopupImage(evt) { 
  openPopup(openImage) 
  image.src = evt.target.closest('.photo-grid__image').src 
  image.alt = evt.target.closest('.photo-grid__card').querySelector('.photo-grid__text').textContent 
  imageSign.textContent = evt.target.closest('.photo-grid__card').querySelector('.photo-grid__text').textContent 
}

function submitFormUsersData(evt) { 
  evt.preventDefault() 
  profileName.textContent = nameInput.value 
  profileProfession.textContent = professionInput.value 
  closePopup(popup)
  popupForm.reset()
} 

function deleteCard(evt) { 
  evt.target.closest('.photo-grid__card').remove() 
} 

function addLike(evt) { 
  evt.target.closest('.photo-grid__like').classList.toggle('photo-grid__like_active') 
}

function addListeners(el) {  
  el.querySelector('.photo-grid__button').addEventListener('click', deleteCard)  
  el.querySelector('.photo-grid__like').addEventListener('click', addLike)  
  el.querySelector('.photo-grid__image').addEventListener('click', openPopupImage)  
}

function createCard(name, link) {  
  const newCard = template.cloneNode(true) 
  newCard.querySelector('.photo-grid__text').textContent = name 
  newCard.querySelector('.photo-grid__image').src = link 
  newCard.querySelector('.photo-grid__image').alt = name  
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
  closePopup(popupMesto) 
  popupFormMesto.reset() 
}

closeImage.addEventListener('click', function () { 
  closePopup(openImage); 
})

profileInfoOpenPopupButton.addEventListener('click', function () { 
  nameInput.value = profileName.textContent 
  professionInput.value = profileProfession.textContent 
  openPopup(popup);
}) 

addMestoOpenPopupButton.addEventListener('click', function () {
  openPopup(popupMesto);
}) 

popupCloseButton.addEventListener('click', function () { 
  closePopup(popup);
  popupForm.reset()
}) 

popupCloseMestoButton.addEventListener('click', function () { 
  closePopup(popupMesto);
  popupFormMesto.reset()
}) 

popupForm.addEventListener('submit', submitFormUsersData) 

popup.addEventListener('click', function (e) {
  const whithinBondaries = e.composedPath().includes(popupContainer)
  if (!whithinBondaries) {
    closePopup(popup)
    popupForm.reset()
  }
})

popupMesto.addEventListener('click', function (e) {
  const whithinBondaries = e.composedPath().includes(popupContainerMesto)
  if (!whithinBondaries) {
    closePopup(popupMesto)
    popupFormMesto.reset()
  }
})

popupFormMesto.addEventListener('submit', submitFormCard) 

openImage.addEventListener('click', function (e) {
  const whithinBondaries = e.composedPath().includes(popupContainerImage)
  if (!whithinBondaries) {
    closePopup(openImage)
  }
})

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode == 27) {
    closePopup(popup)
    closePopup(popupMesto)
    closePopup(openImage)
  }
})
 
render() 