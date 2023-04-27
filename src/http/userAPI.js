import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";

export const registration = async (username, password, email) => {
  // response - ответ от сервера
  const response = await $host.post("auth/users/", { username, password, email });
  //localStorage.setItem("token", response.token); // глянь на этот ответ 2:11:7
  console.log("регистрация response", response);
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

  const responseUserMe = await $authHost.get("auth/users/me/");
  console.log("авторизация auth/users/me/ responseUserMe", responseUserMe);
  console.log("авторизация auth/users/me/ responseUserMe data", responseUserMe.data);

  //const responseVerify = await $authHost.post("auth/jwt/verify/", { Token });
  //const responseVerify = await $authHost.post("auth/jwt/verify/", response.data.access);
  //console.log("авторизация auth/jwt/verify/ responseVerify", responseVerify);

  return responseUserMe.data;
  //return jwt_decode(response.data.access);
};

// Проверка токена на валидность
// Получение данных о пользователе, если токен не валиден ничег не получим
export const check = async () => {
  const response = await $authHost.get("auth/users/me/");

  console.log("check auth/users/me/ token test", `Bearer ${localStorage.getItem("token")}`  );
  console.log("check auth/users/me/ response", response);
  console.log("check auth/users/me/ response.data", response.data);
  //console.log("check jwt_decode(response.data.access)", jwt_decode(response.data)); 

  //localStorage.setItem("token", response.data); // тут ошибка возвращаешь обькт на не токен
  localStorage.setItem("token", localStorage.getItem("token"));
  return response.data;
};

/* когда будет профиль authHost ему надо и роутрах добавить */