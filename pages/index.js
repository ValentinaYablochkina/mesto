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
  initialCards,
  nameInput,
  professionInput
} from '../components/Constants.js'

const avatarImage = new URL('../images/Avatar.png', import.meta.url)
const logoImage = new URL('../images/logo.svg', import.meta.url)
const startImagePage = [
  {name:'Avatar', link: avatarImage},
  {name:'Logo', link: logoImage}
]

const popupUsers = new Popup(popupEditProfile)

const popupAddMesto = new Popup(popupAddCard)

const popupImageOpen = new PopupWithImage(popupImage)

const newUserInfo = new UserInfo({name: profileName, profession: profileProfession})

const popupNewUserInfo = new PopupWithForm({
  selector: popupEditProfile,
  handleFormSubmit: (popupNewUserInfo) => {
    newUserInfo.setUserInfo(popupNewUserInfo)
  }
})


function createCard(data) { 
  const card = new Card(data.name, data.link, ".item__template", handleCardClick); 
  const cardElement = card.generateCard(); 
  return cardElement; 
} 

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item)
    photoGrid.prepend(cardElement);
  }
},
photoGrid
)
cardList.renderItems()

const popupNewCardForm = new PopupWithForm({
  selector: popupAddCard,
  handleFormSubmit: (popupNewCardForm) => {
    const cardElement = createCard(popupNewCardForm)
    cardList.addItem(cardElement)
    }
})

function handleCardClick(name, link) {
  popupImageOpen.open(name, link)
}

function userDataPage() {
  const userData = newUserInfo.getUserInfo()
  nameInput.value = userData.name,
  professionInput.value = userData.profession
}

profileInfoOpenPopupButton.addEventListener('click', function () {
  userDataPage()
  popupUsers.open()
  formValidators['profileForm'].resetValidation()
});

popupNewUserInfo.setEventListeners()

addMestoOpenPopupButton.addEventListener('click', function () {
  popupFormMesto.reset();
  formValidators['pictureForm'].resetValidation()
  popupAddMesto.open()
});


popupNewCardForm.setEventListeners()

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


