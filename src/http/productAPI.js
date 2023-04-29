import { $authHost, $host } from "./index";


export const fetchTypes = async() => {
  const response = await $host.get('api/v1/type/')
  return response.data.results
}

export const fetchBrands = async() => {
  const response = await $host.get('api/v1/brand/')
  return response.data.results
}

export const fetchCategories = async() => {
  const response = await $host.get('api/v1/category/')
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

export const fetchOneProduct = async(id) => {
  const response = await $host.get(`api/v1/product/${id}/`)
/*   console.log('product API - product one response', response)
  console.log('product API -  product one response data', response.data) */
  return response.data
}

export const fetchOneCategory = async(slug) => {
  const response = await $host.get(`api/v1/${slug}`)
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



/* сделать запрос на получения одной карегории http://127.0.0.1:8000/api/v1/category/golf-clubs/ */