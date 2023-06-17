import { makeAutoObservable } from "mobx"

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}

    this._basket = {id: null, product: []}
    this._wishList = {id: null, product: []}
    
    makeAutoObservable(this) 
  }

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

}