let profileInfoOpenPopupButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close')
let popupCloseMestoButton = document.querySelector('.popup-mesto__close')
let popupSave = document.querySelector('.popup__save')
let popupForm = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__name')
let profileProfession = document.querySelector('.profile__profession')
let nameInput = document.getElementById('name')
let professionInput = document.getElementById('profession')
let addMestoOpenPopupButton = document.querySelector('.profile__add-button')
let popupMesto = document.querySelector('.popup-mesto')
let photoGrid = document.querySelector('.photo-grid')
let addButton = document.querySelector('.profile__add-button')
let template = document.querySelector('.item__template').content
let placeInput = document.getElementById('place')
let imageInput = document.getElementById('image')
let popupFormMesto = document.querySelector('.popup-mesto__form')
let popupSaveMesto = document.querySelector('.popup-mesto__save')
let openImage = document.querySelector('.popup-image')
let closeImage = document.querySelector('.popup-image__close')
let image = document.querySelector('.popup-image__picture')
let imageSign = document.querySelector('.popup-image__sign')

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

function openPopup() {
  popup.classList.add('popup_opened')
  nameInput.value = profileName.textContent
  professionInput.value = profileProfession.textContent
}

function openPopupMesto() {
  popupMesto.classList.add('popup_opened')
}

function openPopupImage(evt) {
  openImage.classList.add('popup_opened')
  image.src = evt.target.closest('.photo-grid__image').src
  imageSign.innerText = evt.target.closest('.photo-grid__card').querySelector('.photo-grid__text').textContent
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function closePopupMesto() {
  popupMesto.classList.remove('popup_opened')
}

function closePopupImage() {
  openImage.classList.remove('popup_opened')
}

function submitForm(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileProfession.textContent = professionInput.value
  closePopup()
}

function submitFormCard(evt) {
  evt.preventDefault(); 
  addCard()
  closePopupMesto()
}

function addListeners(el) {
  el.querySelector('.photo-grid__button').addEventListener('click', deleteCard)
  el.querySelector('.photo-grid__like').addEventListener('click', addLike)
  el.querySelector('.photo-grid__image').addEventListener('click', openPopupImage)
}


function deleteCard(evt) {
  evt.target.closest('.photo-grid__card').remove()
}

function addLike(evt) {
  evt.target.closest('.photo-grid__like').classList.toggle('photo-grid__like_active')
}

function render() {
  initialCards.forEach(renderCard)
}

function renderCard(initialCards) {
  const newCard = template.cloneNode(true)
  newCard.querySelector('.photo-grid__text').innerText = initialCards.name
  newCard.querySelector('.photo-grid__image').src = initialCards.link
  newCard.querySelector('.photo-grid__image').alt = initialCards.name
  addListeners(newCard)
  photoGrid.appendChild(newCard)
}

function addCard() {
  const newCard = template.cloneNode(true)
  newCard.querySelector('.photo-grid__text').innerText = placeInput.value
  newCard.querySelector('.photo-grid__image').src = imageInput.value
  newCard.querySelector('.photo-grid__image').alt = placeInput.value
  addListeners(newCard)
  photoGrid.prepend(newCard)
}

closeImage.addEventListener('click', closePopupImage)
popupFormMesto.addEventListener('submit', submitFormCard)
profileInfoOpenPopupButton.addEventListener('click', openPopup)
addMestoOpenPopupButton.addEventListener('click', openPopupMesto)
popupCloseButton.addEventListener('click', closePopup)
popupCloseMestoButton.addEventListener('click', closePopupMesto)
popupForm.addEventListener('submit', submitForm)
render()


