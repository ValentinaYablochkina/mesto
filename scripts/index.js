let profileInfoOpenPopupButton = document.querySelector('.profile__edit-button-border')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close')
let popupSave = document.querySelector('.popup__save')
let popupForm = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__name')
let profileProfession = document.querySelector('.profile__profession')
let NameInput = document.getElementById('name')
let ProfessionInput = document.getElementById('profession')

function OpenPopup() {
  popup.classList.add('popup__opened')
  popupCloseButton.classList.add('popup__opened')
}

function ClosePopup() {
  popup.classList.remove('popup__opened')
  popupCloseButton.classList.remove('popup__opened')
}

function SubmitForm(evt) {
  evt.preventDefault()
  profileName.textContent = NameInput.value
  profileProfession.textContent = ProfessionInput.value
}


profileInfoOpenPopupButton.addEventListener('click', OpenPopup)
popupCloseButton.addEventListener('click', ClosePopup)
popupForm.addEventListener('submit', SubmitForm)
popupSave.addEventListener('click', ClosePopup)
