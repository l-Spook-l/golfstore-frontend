import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";
import { createBasketForUser, createWishListForUser } from "./productAPI";

export const registration = async (first_name, last_name, email, password) => {
  const response = await $host.post("auth/users/", { first_name, last_name, email, password }); 
  createBasketForUser({user: response.data.id})  
  createWishListForUser({user: response.data.id})  
  return response.data
};

export const login = async (email, password) => {
  const response = await $host.post("auth/jwt/create/", { email, password });
  localStorage.setItem("token", response.data.access); 
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const responseUserMe = await $authHost.get(`api/v1/user-info/${userId}/`);
  return responseUserMe.data.results[0];
};

// Проверка токена на валидность
// Получение данных о пользователя, если токен не валиден ничего не получим
export const check = async () => {
  localStorage.setItem("token", localStorage.getItem("token"));
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.get(`api/v1/user-info/${userId}/`);
  return response.data.results[0]
};

export const updateUserFirstName = async (first_name) => {
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.patch(`api/v1/user-info/${userId}/`, {first_name});
  return response
}

export const updateUserLastName = async (last_name) => {
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.patch(`api/v1/user-info/${userId}/`, {last_name});
  return response
}

export const updateUserEmail = async (email) => {
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.patch(`api/v1/user-info/${userId}/`, {email});
  return response
}

export const updateUserPhoneNumber = async (phone_number) => {
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.patch(`api/v1/user-info/${userId}/`, {phone_number});
  return response
}

export const updateUserCardNumber = async (card_number) => {
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.patch(`api/v1/user-info/${userId}/`, {card_number});
  return response
}
