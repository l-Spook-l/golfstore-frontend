import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._types = []  
    this._brands = []  
    this._categories = []  
    this._products = []  
    this._searchProducts = []  

    this._selectedType = []
    this._selectedBrand = []
    this._selectedCategory = []
    this._selectedProduct = [{reviews: {comment : ''}}]

    this._selectedSearchProducts = ''

    this._priceMin = 0
    this._priceMax = 10000
    
    this._ordering = ''

    this._page = 1
    this._totalCount = 0

    this._brandsForSelected = []
    this._categoriesForSelected = []
    makeAutoObservable(this); 
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setCategories(categories) {
    this._categories = categories;
  }
  setProducts(products) {
    this._products = products;
  }
  setSearchProducts(products){
    this._searchProducts = products
  }

  setSelectedType(type) {
    this.setPage(1)
    if (type === 'clear') {
      this._selectedType = []
    } else if (!this._selectedType.includes(type)){
      this._selectedType = [...this._selectedType, type]
    } else {
      this._selectedType = this._selectedType.filter((selectedType) => selectedType !== type)
    }
  }

  setSelectedBrand(brand) {
    this.setPage(1)
    if (brand === 'clear') {
      this._selectedBrand = []
    } else if (!this._selectedBrand.includes(brand)){
      this._selectedBrand = [...this._selectedBrand, brand]
    } else {
      this._selectedBrand = this._selectedBrand.filter((selectedBrand) => selectedBrand !== brand)
    }
  }

  setSelectedCategory(category) {
    this.setPage(1)
    if (category === 'clear') {
      this._selectedCategory = []
    } else if (!this._selectedCategory.includes(category)){
      this._selectedCategory = [...this._selectedCategory, category]
    } else {
      this._selectedCategory = this._selectedCategory.filter((selectedCategory) => selectedCategory !== category)
    }
  }

  setSelectedProduct(product) {
    this._selectedProduct = product
  }

  setSelectedSearchProducts(product) {
    this._selectedSearchProducts = product
  }

  setPriceMin(price){
    this._priceMin = price
  }
  setPriceMax(price){
    this._priceMax = price
  }

  setOrdering(param){
    this._ordering = param
  }

  setPage(page) {
    this._page = page
  }
  setTotalCount(count) {
    this._totalCount = count
  }

  setBrandsForSelected (brands) {
    this._brandsForSelected = brands
  }
  setCategoriesForSelected (categories) {
    this._categoriesForSelected = categories
  }

  
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get categories() {
    return this._categories;
  }
  get products() {
    return this._products;
  }
  get searchProducts() {
    return this._searchProducts
  }

  get priceMin() {
    return this._priceMin;
  }
  get priceMax() {
    return this._priceMax;
  }

  get ordering() {
    return this._ordering;
  }

  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get selectedCategory() {
    return this._selectedCategory;
  }

  get selectedProduct() {
    return this._selectedProduct
  }

  get selectedSearchProducts() {
    return this._selectedSearchProducts
  }

  get page() {
    return this._page
  }
  get totalCount() {
    return this._totalCount
  }

  get brandsForSelected() {
    return this._brandsForSelected
  }
  get categoriesForSelected() {
    return this._categoriesForSelected
  }
}
