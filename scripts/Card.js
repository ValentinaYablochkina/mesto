import {openPopup} from './index.js'
export class Card {
    constructor(name, link, cardSelector) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.photo-grid__card')
        .cloneNode(true);
        return cardElement;
    }

    generateCard() {
      this._element = this._getTemplate()
      this._setEventListeners()
      this._element.querySelector('.photo-grid__image').src = this._link;
      this._element.querySelector('.photo-grid__text').textContent = this._name;
      return this._element;
    }

    _deleteCard() {
      document.querySelector('.photo-grid__card').remove() 
    }

    _addLike() {
      document.classList.toggle('photo-grid__like_active') 
    }

    _openPopupImage() {
      const popupView = document.querySelector('.popup-image')
      openPopup(popupView)
      document.querySelector('.popup-image__picture').src = this._link
      document.querySelector('.popup-image__picture').alt = this._name 
      document.querySelector('.popup-image__sign').textContent = this._name
    }

    _setEventListeners() {
     this._element.querySelector('.photo-grid__button').addEventListener('click', () => {
       this._deleteCard()
     })
     this._element.querySelector('.photo-grid__like').addEventListener('click', () => {
      this._addLike()
     })
     this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
      this._openPopupImage()
     })
    }
  }
