import './index.css'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupDeleteCard } from '../components/PopupDeleteCard.js'
import { UserInfo } from '../components/UserInfo.js'
import { profileInfoOpenPopupButton, 
  popupEditProfile,
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
  popupDeleteCardWindow,
  popupEditProfileBtn,
  popupFormEditProfile,
  popupFormChangeAvatar
} from '../utils/constants.js'
import { api } from '../components/Api.js'

let myId

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
    profileAvatar.src = userData.avatar,
    profileName.textContent = userData.name,
    profileProfession.textContent = userData.about
    myId = userData._id
  cardList.renderItems(cards)
})
.catch((err) => console.log(err))


const cardList = new Section({
  renderer: (item) => {
    if (myId === item.owner._id) {
    const cardElement = createCard(item, '.item__template', myId)
    cardList.addItem(cardElement)
    } else {
      const cardElement = createCard(item, '.user__template', myId)
    cardList.addItem(cardElement)
    }
}
},
photoGrid
)

const popupImageOpen = new PopupWithImage(popupImage)

const newUserInfo = new UserInfo({name: profileName, about: profileProfession, avatar: profileAvatar, api: api})

function changeBtnText() { 
  popupEditProfileBtn.textContent = "Сохранение..." 
} 

function returnBtnText() {
  popupEditProfileBtn.textContent = "Сохранить" 
} 

const popupNewUserInfo = new PopupWithForm({
  selector: popupEditProfile,
  handleFormSubmit: (popupFormEditProfile) => {
    changeBtnText()
    api.changeProfileData(popupFormEditProfile)
    .then((data) => {
      newUserInfo.setUserInfo(data);
      popupNewUserInfo.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      returnBtnText()
    })
  }
})

const popupDeleteCardForm = new PopupDeleteCard(popupDeleteCardWindow)

const popupNewCardForm = new PopupWithForm({
  selector: popupAddCard,
  handleFormSubmit: (popupFormMesto) => {
    api.addNewCard(popupFormMesto)
    .then((data) => {
    const cardElement = createCard(data, '.item__template', myId)
    cardList.addItem(cardElement);
    popupNewCardForm.close()
    })
    .catch((err) => console.log(err))
}
})


const popupNewUserAvatar = new PopupWithForm({
  selector: popupChangeAvatar,
  handleFormSubmit: (popupFormChangeAvatar) => {
    api.changeAvatarFoto(popupFormChangeAvatar)
    .then((data) => newUserInfo.setUserAvatar(data.avatar) || popupNewUserAvatar.close())
    .catch((err) => console.log(err))
    }
})


function createCard(data, cardSelector, myId) {
  const card = new Card({data, cardSelector, 
    handleCardClick: (name, link) => {
      popupImageOpen.open(name, link)
    },
    garbageCardClick: (card) => {
      popupDeleteCardForm.open()
      popupDeleteCardForm.callback(function() {handleBtnSubmit(card)})
    },
    api});
  if (myId === data.owner._id) {
  const cardElement = card.generateCard(myId)
  return cardElement;
  } else {
    const cardElement = card.generateUserCard(myId);
    return cardElement;
  }
} 



/*function garbageCardClick() {
  popupDeleteCardForm.open()
}*/

function handleBtnSubmit(item) {
  api.removeCard(item._id) 
  .then(() => item.deleteCard() || popupDeleteCardForm.close()) 
  .catch((err) => console.log(err))
}

function userDataPage() {
  const userData = newUserInfo.getUserInfo()
  nameInput.value = userData.name,
  professionInput.value = userData.about
}

profileInfoOpenPopupButton.addEventListener('click', function () {
  userDataPage()
  popupNewUserInfo.open()
  formValidators['profileForm'].resetValidation()
});

addMestoOpenPopupButton.addEventListener('click', function () {
  popupFormMesto.reset();
  formValidators['pictureForm'].resetValidation()
  popupNewCardForm.open()
});

popupChangeAvatarBtn.addEventListener('click', function() {
  formValidators['avatarForm'].resetValidation()
  popupNewUserAvatar.open()
})

popupNewCardForm.setEventListeners()

popupNewUserInfo.setEventListeners()

popupNewUserAvatar.setEventListeners()

popupImageOpen.setEventListeners()

popupDeleteCardForm.setEventListeners()


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


