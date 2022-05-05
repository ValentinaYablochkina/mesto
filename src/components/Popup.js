export class Popup {
    constructor (selector) {
     this._selector = selector
    }
    open() {
        this._selector.classList.add('popup_opened')
        this.setEventListeners()
    }
    close() {
        this._selector.classList.remove('popup_opened')
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        this._selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__close')) {
                this.close();
              }
            if (evt.target.classList.contains('popup_opened')) {
            this.close();
          }
        })
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        })
    }
}