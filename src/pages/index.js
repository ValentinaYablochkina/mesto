import './index.css'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { Popup } from '../components/Popup.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { profileInfoOpenPopupButton, 
  popupEditProfile,
  popupEditProfileForm,
  profileName,
  profileProfession,
  addMestoOpenPopupButton,
  popupAddCard,
  photoGrid,
  popupFormMesto,
  popupImage,
  validatorConfig,
  nameInput,
  professionInput,
  popupChangeAvatarBtn,
  popupChangeAvatar,
  profileAvatar,
  popupDeleteCard,
  popupEditProfileBtn
} from '../utils/constants.js'
import { api } from '../components/Api.js'

const userData = api.getUserInfo()
userData.then((data) => {
  profileAvatar.src = data.avatar,
  profileName.textContent = data.name,
  profileProfession.textContent = data.about
})
.catch((err) => {
  console.log(err)
})

const cardList = new Section({
  renderer: (item) => {
    api.getUserInfo()
    .then((data) => {
    const myId = data._id
    if (myId === item.owner._id) {
    const cardElement = createCard(item, '.item__template', myId)
    cardList.addItem(cardElement)
    } else {
      const cardElement = createCard(item, '.user__template', myId)
    cardList.addItem(cardElement)
    }
  })
  .catch((err) => {
    console.log(err)
  })
}
},
photoGrid
)

api.getInitialCards()
.then((data) => cardList.renderItems(data))
.catch((err) => {
  console.log(err)
})

const popupUsers = new Popup(popupEditProfile)

const popupAvatar = new Popup(popupChangeAvatar)

const popupAddMesto = new Popup(popupAddCard)

const popupDelete = new Popup(popupDeleteCard)

const popupImageOpen = new PopupWithImage(popupImage)

const newUserInfo = new UserInfo({name: profileName, about: profileProfession, avatar: profileAvatar, api: api})

const popupNewUserInfo = new PopupWithForm({
  selector: popupEditProfile,
  handleFormSubmit: (popupNewUserInfo) => {
    newUserInfo.updateUserInfo(popupNewUserInfo)
    changeBtnText()
  }
})

const popupNewCardForm = new PopupWithForm({
  selector: popupAddCard,
  handleFormSubmit: (popupNewCardForm) => {
    const myIdGet = api.getUserInfo()
    myIdGet.then((data) => {
    const myId = data._id
    api.addNewCard(popupNewCardForm)
    .then((data) => {
    const cardElement = createCard(data, '.item__template', myId)
    cardList.addItem(cardElement)
    })
  })
  .catch((err) => {
    console.log(err)
  })
}
})

const popupFormDeleteCard = new PopupWithForm({
  selector: popupDeleteCard,
  handleFormSubmit: (item) => {
   item.deleteCard()
  }
})

const popupNewUserAvatar = new PopupWithForm({
  selector: popupChangeAvatar,
  handleFormSubmit: (popupNewUserAvatar) => {
    newUserInfo.updateUserAvatar(popupNewUserAvatar)
    }
})

function createCard(data, cardSelector, myId) {
  const card = new Card(data, cardSelector, handleCardClick, garbageCardClick, api);
  if (myId === data.owner._id) {
  const cardElement = card.generateCard(myId);
  popupFormDeleteCard.newEventListener(card)
  return cardElement;
  } else {
    const cardElement = card.generateUserCard(myId);
  return cardElement;
  }
} 

function handleCardClick(name, link) {
  popupImageOpen.open(name, link)
}

function garbageCardClick() {
  popupDelete.open()
}

function userDataPage() {
  const userData = newUserInfo.getUserInfo()
  nameInput.value = userData.name,
  professionInput.value = userData.about
}

function changeBtnText() {
  popupEditProfileBtn.textContent = "Сохранение..."
}

function returnBtnText() {
  popupEditProfileBtn.textContent = "Сохранить"
}

profileInfoOpenPopupButton.addEventListener('click', function () {
  userDataPage()
  returnBtnText()
  popupUsers.open()
  formValidators['profileForm'].resetValidation()
});

addMestoOpenPopupButton.addEventListener('click', function () {
  popupFormMesto.reset();
  formValidators['pictureForm'].resetValidation()
  popupAddMesto.open()
});

popupChangeAvatarBtn.addEventListener('click', function() {
  formValidators['avatarForm'].resetValidation()
  popupAvatar.open()
})

popupNewUserInfo.setEventListeners()

popupNewCardForm.setEventListeners()

popupNewUserAvatar.setEventListeners()

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


