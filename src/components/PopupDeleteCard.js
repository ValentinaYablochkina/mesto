import { Popup } from './Popup.js'
export class PopupDeleteCard extends Popup {
    constructor(selector) {
        super(selector)
        this._btn = selector.querySelector('.popup__save')
    }
  
    callback(someDeleteCard) {
        this._someDeleteCard = someDeleteCard
    }

    setEventListeners() {
      this._btn.addEventListener('click', () => this._someDeleteCard())
      super.setEventListeners()
    }
  }
