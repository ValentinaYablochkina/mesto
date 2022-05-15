export class UserInfo {
    constructor({name, about, avatar, api}) {
    this._name = name,
    this._about = about
    this._avatar = avatar
    this._api = api
    }
    getUserInfo() {
        const objUserInfo = {
          name: this._name.textContent,
          about: this._about.textContent
        }
        return objUserInfo
    }
    setUserInfo(item) {
        this._name.textContent = item.name,
        this._about.textContent = item.about
    }

    setUserAvatar(item) {
        this._avatar.src = item
    }
}