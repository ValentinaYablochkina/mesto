let profileInfoOpenPopupButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close')
let popupSave = document.querySelector('.popup__save')
let popupForm = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__name')
let profileProfession = document.querySelector('.profile__profession')
let nameInput = document.getElementById('name')
let professionInput = document.getElementById('profession')

function OpenPopup() {
  popup.classList.add('popup_opened')
  nameInput.value = profileName.textContent
  professionInput.value = profileProfession.textContent
}

function ClosePopup() {
  popup.classList.remove('popup_opened')
}

function SubmitForm(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileProfession.textContent = professionInput.value
  ClosePopup()
}


profileInfoOpenPopupButton.addEventListener('click', OpenPopup)
popupCloseButton.addEventListener('click', ClosePopup)
popupForm.addEventListener('submit', SubmitForm)
