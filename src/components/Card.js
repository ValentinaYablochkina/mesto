export class Card {
  constructor({data, cardSelector, handleCardClick, garbageCardClick, api}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._likesId = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".photo-grid__image");
    this._like = this._element.querySelector(".photo-grid__like");
    this._text = this._element.querySelector(".photo-grid__text");
    this._counterLike = this._element.querySelector(
      ".photo-grid__counter-like"
    );
    this._handleCardClick = handleCardClick;
    this._garbageCardClick = garbageCardClick;
    this._api = api;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".photo-grid__card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard(myId) {
    this._setEventListeners();
    this.isLiked(myId);
    this._image.src = this._link;
    this._text.textContent = this._name;
    this._counterLike.textContent = this._likes;
    this._image.alt = this._name;
    return this._element;
  }

  generateUserCard(myId) {
    this._setEventListenersUserCard();
    this.isLiked(myId);
    this._image.src = this._link;
    this._text.textContent = this._name;
    this._counterLike.textContent = this._likes;
    this._image.alt = this._name;
    return this._element;
  }

  isLiked(myId) {
    const likedCard = this._likesId.find((item) => item._id === myId);
    if (likedCard) {
      this._like.classList.add("photo-grid__like_active");
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _changeLikes(item) {
    this._counterLike.textContent = item;
  }

  _addLikeToCard() {
    this._api
      .addLike(this._id)
      .then(
        (data) =>
          this._changeLikes(data.likes.length) ||
          this._like.classList.add("photo-grid__like_active")
      )
      .catch((err) => console.log(err));
  }

  _deleteLike() {
    this._api
      .deleteLike(this._id)
      .then(
        (data) =>
          this._changeLikes(data.likes.length) ||
          this._like.classList.remove("photo-grid__like_active")
      )
      .catch((err) => console.log(err));
  }

  _setEventListeners() {
    this._element
      .querySelector(".photo-grid__button")
      .addEventListener("click", () => {
        this._garbageCardClick(this);
      });

    this._like.addEventListener("click", () => {
      if (this._like.classList.contains("photo-grid__like_active")) {
        this._deleteLike();
      } else {
        this._addLikeToCard();
      }
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _setEventListenersUserCard() {
    this._like.addEventListener("click", () => {
      if (this._like.classList.contains("photo-grid__like_active")) {
        this._deleteLike();
      } else {
        this._addLikeToCard();
      }
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
