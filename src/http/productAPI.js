import { $authHost, $host } from "./index";


export const fetchTypes = async() => {
  const response = await $host.get('api/v1/types/')
  return response.data.results
}

export const fetchBrands = async() => {
  const response = await $host.get('api/v1/brands/')
  return response.data.results
}

export const fetchCategories = async() => {
  const response = await $host.get('api/v1/categories/')
  return response.data.results
}

// делаем запрос и принимаем данные с параметрами
export const fetchProducts = async(type, brand, category, page, min_price, max_price, ordering) => {
  const response = await $host.get('api/v1/product/', {params:{
    type, brand, category, page, min_price, max_price, ordering
  }})
/*   console.log('product API - response', response)
  console.log('product API - type, brand, page', type, brand, page)
  console.log('product API - response data', response.data)
  console.log('product API - response data result', response.data.results) */
  return response.data
}

export const fetchOneProduct = async(slug) => {
  const response = await $host.get(`api/v1/product/${slug}/`)
/*   console.log('product API - product one response', response)
  console.log('product API -  product one response data', response.data) */
  return response.data
}

export const fetchOneCategory = async(slug) => {
  const response = await $host.get(`api/v1/category-info/${slug}`)
  return response.data
}

export const fetchProductsByCategory = async(slug, type, brand, page, min_price, max_price, ordering) => {
  const response = await $host.get(`api/v1/category/${slug}/`, {params:{
    type, brand, page, min_price, max_price, ordering
  }})
/*   console.log('category API - product one response', response)
  console.log('category API -  product one response data', response.data) */
  return response.data
}

export const fetchOneBrand = async(slug) => {
  const response = await $host.get(`api/v1/brand-info/${slug}`)
  //console.log('Brand получение - response', response)
  return response.data
}

export const fetchProductsByBrand = async(slug, type, category, page, min_price, max_price, ordering) => {
  const response = await $host.get(`api/v1/brand/${slug}/`, {params:{
    type, category, page, min_price, max_price, ordering
  }})
  return response.data
}

export const createBasketForUser = async(userId)  => {
  const response = await $host.post('api/v1/basket/', userId)
  console.log('product API - createBasketForUser response', response)
  console.log('product API -  createBasketForUser response data', response.data)
  return response.data
}

export const fetchBasket = async(userId) => {
  const response = await $host.get(`api/v1/basket/${userId}/`)
  console.log('product API - fetchBasket response', response)
  console.log('product API -  fetchBasket response data', response.data)
  return response.data
}

export const addProductToBasket = async(quantity=1, basket, productId) => {
  const response = await $host.post('api/v1/basket-product/', quantity, basket, productId)
  console.log('product API - addProductToBasket response', response)
  console.log('product API - addProductToBasket response data', response.data)  
  return response.data
}

export const fetchListProductsBasket = async(basketId) => {
  const response = await $host.get(`api/v1/basket-product/${basketId}`)
  console.log('product API - fetchListProductsBasket response', response)
  console.log('product API -  fetchListProductsBasket response data', response.data)
  return response.data
}

export const deleteProductFromBasket = async(basketId, productId) => {
  const response = await $host.delete(`api/v1/basket-product/${basketId}/${productId}`)
  return response.data
}

export const createWishListForUser = async(userId)  => {
  const response = await $host.post('api/v1/wishlist/', userId)
  console.log('product API - createWishListForUser response', response)
  console.log('product API -  createWishListForUser response data', response.data)
  return response.data
}

export const fetchWishList = async(userId) => {
  const response = await $host.get(`api/v1/wishlist/${userId}/`)
  console.log('product API - fetchWishList response', response)
  console.log('product API -  fetchWishList response data', response.data)
  return response.data
}

export const addProductToWishList = async(wishlist, productId) => {
  const response = await $host.post('api/v1/wishlist-product/', wishlist, productId)
  console.log('product API - addProductToWishList response', response)
  console.log('product API - addProductToWishList response data', response.data)  
  return response.data
}

export const fetchListProductsWishList = async(wishListId) => {
  const response = await $host.get(`api/v1/wishlist-product/${wishListId}`)
  console.log('product API - fetchListProductsWishList response', response)
  console.log('product API -  fetchListProductsWishList response data', response.data)
  return response.data
}

export const deleteProductFromWishList = async(basketId, productId) => {
  const response = await $host.delete(`api/v1/wishlist-product/${basketId}/${productId}`)
  return response.data
}