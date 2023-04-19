import { makeAutoObservable } from "mobx";

// Проверка на авторизацию, глянь видос о mobx
// _ - переменная не может быть изменена
export default class ProductStore {
  constructor() {
    this._types = []  // массив полученных типов
    this._brands = []  // массив полученных брэндов
    this._products = []  // массив полученных продуктов

    // Выделять выбранный тип и брэнд
    this._selectedType = []
    this._selectedBrand = []
    

    this._page = 1
    this._totalCount = 0
    // this._limit = 0
    makeAutoObservable(this); //  делает все свойства класса наблюдаемыми (отслеживаемыми).
  }

/* Экшен" -  функцию, которая изменяет состояние. Это функция, которая изменяет значения свойств 
класса, которые отслеживаются в MobX, Redux и других библиотеках управления состоянием. */
/*  
setTypes принимает массив типов продуктов и устанавливает его в качестве приватного поля _types.
setBrands принимает массив брендов продуктов и устанавливает его в качестве приватного поля _brands.
setProducts принимает массив продуктов и устанавливает его в качестве приватного поля _products.
setSelectedType принимает тип продукта и устанавливает его в качестве приватного поля _selectedType. 
*/
  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setProducts(products) {
    this._products = products;
  }

  // Выделять выбранный тип
  setSelectedType(type) {
    //console.log('typeeeeeeeeeeeeee', type, typeof type)
    this.setPage(1)
    if (!this._selectedType.includes(type)){
      this._selectedType = [...this._selectedType, type]
    } else {
      this._selectedType = this._selectedType.filter((selectedType) => selectedType !== type)
    }
  }

  setSelectedBrand(brand) {
    //console.log('branddddddddddddddddd', brand)
    this.setPage(1)
    if (!this._selectedBrand.includes(brand)){
      this._selectedBrand = [...this._selectedBrand, brand]
    } else {
      this._selectedBrand = this._selectedBrand.filter((selectedBrand) => selectedBrand !== brand)
    }
  }


  setPage(page) {
    this._page = page
  }
  setTotalCount(count) {
    this._totalCount = count
  }


  /* 
  В классах MobX геттеры используются для получения значений приватных полей класса. 
  При этом MobX отслеживает зависимости для геттеров, то есть автоматически перерисовывает 
  компоненты, использующие эти поля, когда они изменяются.
  Геттеры types, brands, products и selectedType возвращают значения 
  соответствующих приватных полей _types, _brands, _products и _selectedType, но при этом
  MobX автоматически отслеживает зависимости и перерисовывает компоненты, когда эти поля изменяются. */
  // Вызываються только тогда когда переменная была изменена
  
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get products() {
    return this._products;
  }

  // Выделять выбранный тип
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }

  get page() {
    return this._page
  }
  get totalCount() {
    return this._totalCount
  }

}


/* Класс использует MobX для реализации наблюдаемых свойств и методов, которые изменяют состояние приложения.

В конструкторе класса инициализируются приватные свойства _types, _brands, _products и _selectedType. 
Для того, чтобы эти свойства были наблюдаемыми, класс использует функцию makeAutoObservable, которая делает все свойства класса наблюдаемыми (отслеживаемыми).

Класс определяет методы setTypes, setBrands, setProducts и setSelectedType, которые позволяют изменять состояние приложения. 
Эти методы вызываются из компонентов при необходимости изменения данных.

Класс также определяет геттеры types, brands, products и selectedType, которые позволяют компонентам читать значения приватных полей. 
Когда эти переменные изменяются, геттеры вызываются автоматически.

В целом, класс ProductStore является основной частью архитектуры приложения и позволяет управлять состоянием приложения в целом. */