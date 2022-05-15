export class Api {
    constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl,
      this.headers = headers
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers
      })
        .then((res) => this._checkResponse(res))
    }

    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers
      })
      .then((res) => this._checkResponse(res))
    }

    changeProfileData(userInfo) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: userInfo.name,
          about: userInfo.about
        })
      })
      .then((res) => this._checkResponse(res))
    }

    addNewCard(data) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then((res) => this._checkResponse(res))
    }

    changeAvatarFoto(newAvatar) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: newAvatar.link
        })
      })
      .then((res) => this._checkResponse(res))
    }

    removeCard(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then((res) => this._checkResponse(res))
    }

    addLike(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this.headers
      })
      .then((res) => this._checkResponse(res))
    }

    deleteLike(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then((res) => this._checkResponse(res))
    }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: 'e84f36fa-3432-4afc-bd0c-317440cd59c0',
    'Content-Type': 'application/json'
  }
});
 
  
  