import { $authHost, $host } from "./index";


export const registration = async(username, password) => {
  // response - ответ от сервера
  const response = await $host.post('auth/users/', { username, password})
  localStorage.setItem('token', response.token)  // глянь на этот ответ 2:11:7
  return response
  /*   const {data} = await $host.post('auth/users/', { username, password})
  return jwt_decode(data.token) */
}

export const login = async(username, password) => {
  const response = await $host.post('auth/jwt/create/', {username, password})
  localStorage.setItem('token', response.token)  // глянь на этот ответ 2:11:7
  console.log('авторизация', response)
  return response
}

// Проверка токена на валидность
export const check = async() => {
  const response = await $authHost.get('auth/jwt/verify/')
  localStorage.setItem('token', response.token)  // глянь на этот ответ 2:11:7
  return response
}



