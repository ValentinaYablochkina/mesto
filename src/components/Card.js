export class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.photo-grid__image');
    this._like = this._element.querySelector('.photo-grid__like');
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.photo-grid__card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._setEventListeners();
    this._image.src = this._link;
    this._element.querySelector('.photo-grid__text').textContent = this._name;
    this._image.alt = this._name;
    return this._element;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null
  }

  _addLike() {
    this._like.classList.toggle('photo-grid__like_active');
  }

  _setEventListeners() {
    this._element
      .querySelector('.photo-grid__button')
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._like.addEventListener('click', () => {
      this._addLike();
    });
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }
}
