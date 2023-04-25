import { makeAutoObservable } from "mobx"

// Проверка на авторизацию, глянь видос о mobx
// _ - переменная не может быть изменена
export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}
    makeAutoObservable(this)  //  делает все свойства класса наблюдаемыми (отслеживаемыми). 
  }

  // экшены - фун-я которая как-то меняет состояние
  setIsAuth(bool) {
    this._isAuth = bool
  }

  setUser(user) {
    this._user = user
  }

  // геттеры для чтения значений приватных полей
  // Вызываються только тогда когда переменная была изменена
  get isAuth() {
    return this._isAuth
  }
  get user() {
    return this._user
  }
  /* isAuth возвращает значение приватного поля _isAuth. Это свойство содержит информацию о том, авторизован ли пользователь в настоящее время.
    user возвращает значение приватного поля _user. Это свойство содержит информацию о текущем пользователе, который авторизовался в приложении. */
}