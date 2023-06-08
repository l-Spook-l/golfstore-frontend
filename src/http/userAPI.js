import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";
import { createBasketForUser, createWishListForUser } from "./productAPI";

export const registration = async (first_name, last_name, email, password) => {
  const response = await $host.post("auth/users/", { first_name, last_name, email, password });  // Ответ от сервера
  createBasketForUser({user: response.data.id})  // создаем корзину
  createWishListForUser({user: response.data.id})  // создаем список желаний 
  return response.data
};

export const login = async (email, password) => {
  const response = await $host.post("auth/jwt/create/", { email, password });
  localStorage.setItem("token", response.data.access); // глянь на этот ответ 2:11:7
  const responseUserMe = await $authHost.get("api/v1/user-info/");
  return responseUserMe.data.results[0];
};

// Проверка токена на валидность
// Получение данных о пользователя, если токен не валиден ничего не получим
export const check = async () => {
  localStorage.setItem("token", localStorage.getItem("token"));
  const response = await $authHost.get("api/v1/user-info/");
  return response.data.results[0]
};

