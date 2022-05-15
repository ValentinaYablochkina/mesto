import { Popup } from './Popup.js'
export class PopupDeleteCard extends Popup {
    constructor({selector, handleBtnSubmit}) {
        super(selector)
        this._btn = selector.querySelector('.popup__save')
        this._handleBtnSubmit = handleBtnSubmit
    }

    setEventListeners(card, cardId) {
      this._btn.addEventListener('click', () => {
        this._handleBtnSubmit(card, cardId)
      });
  }
}