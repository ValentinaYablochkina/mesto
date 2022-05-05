export class UserInfo {
    constructor({name, profession}) {
    this._name = name,
    this._profession = profession
    }
    getUserInfo() {
        const objUserInfo = {
          name: this._name.textContent,
          profession: this._profession.textContent
        }
        return objUserInfo
    }
    setUserInfo(data) {
        this._name.textContent = data.name,
        this._profession.textContent = data.profession
    }
}