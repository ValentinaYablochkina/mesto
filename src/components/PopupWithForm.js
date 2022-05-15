import { Popup } from './Popup.js'
export class PopupWithForm extends Popup {
    constructor({selector, handleFormSubmit}) {
        super(selector)
        this._form = selector.querySelector('.popup__form')
        this._inputs = this._form.querySelectorAll('.popup__text')
        this._handleFormSubmit = handleFormSubmit
    }

    _getInputValues() {
      this._formValues = {}
      this._inputs.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues
    }

    close() {
      this._form.reset()
      super.close()
    }

    setEventListeners() {
      this._form.addEventListener('submit', () => {
        this._handleFormSubmit(this._getInputValues());
      });
  }
}