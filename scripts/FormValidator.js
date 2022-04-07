export class FormValidator {
    constructor (settings, form) {
    this._settings = settings
    this._form = form
    this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector))
    this._button = this._form.querySelector(this._settings.submitButtonSelector)
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners()

    }

    _showInputError(input, validationMessage) {
      const {inputErrorClass, errorClass} = this._settings
      const errorMessage = this._form.querySelector(`#error-${input.id}`)
      errorMessage.textContent = validationMessage
      input.classList.add(inputErrorClass)
      errorMessage.classList.add(errorClass)
    }

    _hideInputError(input) {
      const {inputErrorClass, errorClass} = this._settings
      const errorMessage = this._form.querySelector(`#error-${input.id}`)
      errorMessage.textContent = ''
      input.classList.remove(inputErrorClass)
      errorMessage.classList.remove(errorClass)
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
          this._hideInputError(input)
        } else {
          this._showInputError(input, input.validationMessage)
        }
      }

      _hasInvalidInput() {
        return this._inputs.some((input) => {
          return !input.validity.valid
        })
      }

    _enableButtonSubmit() {
      this._button.removeAttribute('disabled')
      this._button.classList.remove(this._settings.inactiveButtonClass)
      this._button.classList.add('popup__save_hover')
    }

    _disabledButtonSubmit() {
      this._button.setAttribute('disabled', '')
      this._button.classList.add(this._settings.inactiveButtonClass)
      this._button.classList.remove('popup__save_hover')
    }

    _checkButtonValidity() {
        if (this._hasInvalidInput()) {
          this._disabledButtonSubmit()
        } else {
          this._enableButtonSubmit()
        }
      }

      resetValidation() {
        this._checkButtonValidity()
        this._inputs.forEach((input) => {
        this._hideInputError(input)
        }
        )
      }

    _setEventListeners() {
        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
              this._checkInputValidity(input)
              this._checkButtonValidity()
            })
        })
    }
}
