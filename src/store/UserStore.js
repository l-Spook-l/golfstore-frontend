import { makeAutoObservable } from "mobx"

// Проверка на авторизацию, глянь видос о mobx
// _ - переменная не может быть изменена
export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}

    this._basket = {id: null, product: []}
    this._wishList = {id: null, product: []}
    makeAutoObservable(this)  //  делает все свойства класса наблюдаемыми (отслеживаемыми). 
  }

  // экшены - фун-я которая как-то меняет состояние
  setIsAuth(bool) {
    this._isAuth = bool
  }

  setUser(user) {
    this._user = user
  }

  setBasket(product) {
    this._basket = product
  }

  setWishList(product) {
    this._wishList = product
  }

  // геттеры для чтения значений приватных полей
  // Вызываються только тогда когда переменная была изменена
  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  get basket() {
    return this._basket
  }

  get wishList() {
    return this._wishList
  }

  /* isAuth возвращает значение приватного поля _isAuth. Это свойство содержит информацию о том, авторизован ли пользователь в настоящее время.
    user возвращает значение приватного поля _user. Это свойство содержит информацию о текущем пользователе, который авторизовался в приложении. */
}