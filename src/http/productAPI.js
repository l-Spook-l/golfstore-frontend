import { $authHost, $host } from "./index";


export const fetchTypes = async() => {
  const response = await $host.get('api/v1/type/')
  return response.data.results

}

export const fetchBrands = async() => {
  const response = await $host.get('api/v1/brand/')
  return response.data.results
}

export const fetchProducts = async(type, brand, page) => {
  const response = await $host.get('api/v1/product/', {params:{
    type, brand, page
  }})
/*   console.log('product API - response', response)
  console.log('product API - type, brand, page', type, brand, page)
  console.log('product API - response data', response.data)
  console.log('product API - response data result', response.data.results) */
  return response.data
}

export const fetchOneProduct = async(id) => {
  const response = await $host.get(`api/v1/product/${id}`)
/*   console.log('product API - product one response', response)
  console.log('product API -  product one response data', response.data) */
  return response.data
}