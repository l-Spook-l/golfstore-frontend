import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";
import { createBasketForUser, createWishListForUser } from "./productAPI";

export const registration = async (username, password, email) => {
  // response - ответ от сервера
  const response = await $host.post("auth/users/", { username, password, email });
  //localStorage.setItem("token", response.token); // глянь на этот ответ 2:11:7
  console.log("регистрация response", response);
  createBasketForUser({user: response.data.id})
  createWishListForUser({user: response.data.id})
  //console.log("регистрация jwt_decode(response.data.access)", jwt_decode(response.data.access)); 
  console.log("регистрация data", response.data);
  // return jwt_decode(response.data.access);
  return response.data
};

export const login = async (username, password) => {
  const response = await $host.post("auth/jwt/create/", { username, password });
  localStorage.setItem("token", response.data.access); // глянь на этот ответ 2:11:7
  console.log("авторизация response", response); 
  console.log("авторизация data", response.data);
  console.log("авторизация response.data.access", response.data.access); 
  console.log("авторизация jwt_decode(response.data.access)", jwt_decode(response.data.access)); 

  //const responseUserMe = await $authHost.get("auth/users/me/");
  const responseUserMe = await $authHost.get("api/v1/user-info/");

  console.log("авторизация auth/users/me/ responseUserMe", responseUserMe);
  console.log("авторизация auth/users/me/ responseUserMe data", responseUserMe.data);

  //return responseUserMe.data
  return responseUserMe.data.results[0];
};

// Проверка токена на валидность
// Получение данных о пользователе, если токен не валиден ничег не получим
export const check = async () => {
  console.log("check in userAPI is work")
  localStorage.setItem("token", localStorage.getItem("token"));
  console.log("check in userAPI is work token")

  //const response = await $authHost.get("auth/users/me/");
  const response = await $authHost.get("api/v1/user-info/");

  console.log("check auth/users/me/ token test", `Bearer ${localStorage.getItem("token")}`  );
  console.log("check auth/users/me/ response", response);
  console.log("check auth/users/me/ response.data", response.data);
  //console.log("check auth/users/me/ response.data results", response.data.results[0]);

  //return response.data
  return response.data.results[0]
};

/* когда будет профиль authHost ему надо и роутрах добавить */