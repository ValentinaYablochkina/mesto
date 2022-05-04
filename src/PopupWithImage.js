import { Popup } from './Popup.js'
export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._imagePicture = selector.querySelector('.popup-image__picture')
        this._imageSign = selector.querySelector('.popup-image__sign')
    }
    open(name, link) {
        this._imagePicture.src = link; 
        this._imagePicture.alt = name; 
        this._imageSign.textContent = name; 
        super.open()
    }
}