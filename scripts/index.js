let profileInfoOpenPopupButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close')
let popupSave = document.querySelector('.popup__save')
let popupForm = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__name')
let profileProfession = document.querySelector('.profile__profession')
let nameInput = document.getElementById('name')
let professionInput = document.getElementById('profession')

function openPopup() {
  popup.classList.add('popup_opened')
  nameInput.value = profileName.textContent
  professionInput.value = profileProfession.textContent
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function submitForm(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileProfession.textContent = professionInput.value
  ClosePopup()
}


profileInfoOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
popupForm.addEventListener('submit', submitForm)
