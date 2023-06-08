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
export const fetchProducts = async(type, brand, category, page, min_price, max_price, ordering, name) => {
  const response = await $host.get('api/v1/product/', {params:{
    type, brand, category, page, min_price, max_price, ordering, name
  }})
  return response.data
}

export const fetchOneProduct = async(slug) => {
  const response = await $host.get(`api/v1/product/${slug}/`)
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
  return response.data
}

export const fetchOneBrand = async(slug) => {
  const response = await $host.get(`api/v1/brand-info/${slug}`)
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
  return response.data
}

export const fetchBasket = async(userId) => {
  const response = await $authHost.get(`api/v1/basket/${userId}/`)
  return response.data
}

export const addProductToBasket = async(quantity=1, basket, productId) => {
  const response = await $authHost.post('api/v1/basket-product/', quantity, basket, productId)
  return response.data
}

export const fetchListProductsBasket = async(basketId) => {
  const response = await $authHost.get(`api/v1/basket-product/${basketId}`)
  return response.data
}

export const deleteProductFromBasket = async(basketId, productId) => {
  const response = await $authHost.delete(`api/v1/basket-product/${basketId}/${productId}`)
  return response.data
}

export const updateQuantityProductInBasket = async(basketId, productId, quantity) => {
  const responce = await $host.patch(`api/v1/basket-product/${basketId}/${productId}`, {quantity})
  return responce.data
}

export const createWishListForUser = async(userId)  => {
  const response = await $host.post('api/v1/wishlist/', userId)
  return response.data
}

export const fetchWishList = async(userId) => {
  const response = await $authHost.get(`api/v1/wishlist/${userId}/`)
  return response.data
}

export const addProductToWishList = async(wishlist, productId) => {
  const response = await $authHost.post('api/v1/wishlist-product/', wishlist, productId)
  return response.data
}

export const fetchListProductsWishList = async(wishListId) => {
  const response = await $authHost.get(`api/v1/wishlist-product/${wishListId}`)
  return response.data
}

export const deleteProductFromWishList = async(basketId, productId) => {
  const response = await $authHost.delete(`api/v1/wishlist-product/${basketId}/${productId}`)
  return response.data
}

export const createReview = async(comment, product, user, parent=null) => {
  const response = await $authHost.post('api/v1/review/', {comment, product, user, parent})
  return response.data
}

export const deleteReview = async(reviewId) => {
  const response = await $authHost.delete(`api/v1/review/${reviewId}`)
  return response.data
}

export const updateReview = async(reviewId, comment) => {
  const response = await $authHost.patch(`api/v1/review/${reviewId}/`, {comment})
  return response.data
}
