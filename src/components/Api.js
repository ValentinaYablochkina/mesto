const errorHandler = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
} 

export class Api {
    constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl,
      this.headers = headers
    }
  
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers
      })
        .then(errorHandler)
    }

    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers
      })
        .then(errorHandler)
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
        .then(errorHandler)
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
        .then(errorHandler)
    }

    changeAvatarFoto(newAvatar) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: newAvatar.link
        })
      })
        .then(errorHandler)
    }

    removeCard(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(errorHandler)
    }

    addLike(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this.headers
      })
      .then(errorHandler)
    }

    deleteLike(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(errorHandler)
    }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: 'e84f36fa-3432-4afc-bd0c-317440cd59c0',
    'Content-Type': 'application/json'
  }
});
 
  
  