import {openPopup} from './index.js'
export class Card {
    constructor(name, link, cardSelector) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._element = this._getTemplate()
      this._picture = document.querySelector('.popup-image__picture')
      this._image = this._element.querySelector('.photo-grid__image')
      this._like = this._element.querySelector('.photo-grid__like')
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
      this._setEventListeners()
      this._image.src = this._link;
      this._element.querySelector('.photo-grid__text').textContent = this._name;
      this._image.alt = this._name;
      return this._element;
    }

    _deleteCard() {
      this._element.remove() 
    }

    _addLike() {
      this._like.classList.toggle('photo-grid__like_active') 
    }

    _openPopupImage() {
      const popupView = document.querySelector('.popup-image')
      openPopup(popupView)
      this._picture.src = this._link
      this._picture.alt = this._name 
      document.querySelector('.popup-image__sign').textContent = this._name
    }

    _setEventListeners() {
     this._element.querySelector('.photo-grid__button').addEventListener('click', () => {
       this._deleteCard()
     })
     this._like.addEventListener('click', () => {
      this._addLike()
     })
     this._image.addEventListener('click', () => {
      this._openPopupImage()
     })
    }
  }
