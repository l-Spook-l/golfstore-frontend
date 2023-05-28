/* 

export const login = async (email, password) => {

  try {
    const response = await $host.post("auth/jwt/create/", { email, password });
    console.log("авторизация response", response); 
    console.log("авторизация data", response.data);
    localStorage.setItem("token", response.data.access); // глянь на этот ответ 2:11:7
    console.log("авторизация response", response); 
    console.log("авторизация data", response.data);
    console.log("авторизация response.data.access", response.data.access); 
    console.log("авторизация jwt_decode(response.data.access)", jwt_decode(response.data.access)); 
    // Обрабатывайте полученные данные здесь
  } catch (error) {
    console.log('Error login', error);
    // Обрабатывайте ошибки здесь
  }


  try {
    const responseUserMe = await $authHost.get("api/v1/user-info/");
  console.log("авторизация auth/users/me/ responseUserMe", responseUserMe);
  console.log("авторизация auth/users/me/ responseUserMe data", responseUserMe.data);
  return responseUserMe.data.results[0];
    // Обрабатывайте полученные данные здесь
  } catch (error) {
    console.log('Error login', error);
    return error
    // Обрабатывайте ошибки здесь
  }

  //return responseUserMe.data
  //return responseUserMe.data.results[0];
};
*/




/* 


import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";
import { createBasketForUser, createWishListForUser } from "./productAPI";

export const registration = async (first_name, last_name, email, password) => {
  console.log('registration', first_name, last_name, email, password)
  const response = await $host.post("auth/users/", { first_name, last_name, email, password });
  //localStorage.setItem("token", response.token); // глянь на этот ответ 2:11:7
  console.log("регистрация response", response);
  createBasketForUser({user: response.data.id})  // создаем корзину
  createWishListForUser({user: response.data.id})  // создаем список желаний 
  console.log("регистрация data", response.data);
  return response.data
};

export const login = async (email, password) => {
    console.log('авторизация login')
    try {
      const response = await $host.post("auth/jwt/create/", { email, password });
      console.log("авторизация response"  );
      //console.log("авторизация response", response);
      //console.log("авторизация data", response.data);
      localStorage.setItem("token", response.data.access);
      //console.log("авторизация response.data.access", response.data.access);
      //console.log("авторизация jwt_decode(response.data.access)", jwt_decode(response.data.access));
    } catch (error) {
      console.log('Error login', error);
      if (error.response && error.response.status === 401) {
        console.log('Ошибка авторизации: неправильные учетные данные');
        // Выполните действия для обработки ошибки авторизации, например, выведите сообщение пользователю
      } else {
        console.log('Ошибка при выполнении запроса на авторизацию:', error);
        // Выполните действия для обработки других ошибок
      }
    }
    

    const responseUserMe = await $authHost.get("api/v1/user-info/");
    console.log("авторизация auth/users/me/ responseUserMe", responseUserMe);
    console.log("авторизация auth/users/me/ responseUserMe data", responseUserMe.data);

    return responseUserMe.data.results[0];
  
};


// Проверка токена на валидность
// Получение данных о пользователя, если токен не валиден ничего не получим
export const check = async () => {
  console.log("check in userAPI is work")
  localStorage.setItem("token", localStorage.getItem("token"));
  console.log("check in userAPI is work token")

  const response = await $authHost.get("api/v1/user-info/");

  console.log("check auth/users/me/ token test", `Bearer ${localStorage.getItem("token")}`  );
  console.log("check auth/users/me/ response", response);
  console.log("check auth/users/me/ response.data", response.data);
  //console.log("check auth/users/me/ response.data results", response.data.results[0]);

  return response.data.results[0]
}; */

/* когда будет профиль authHost ему надо и роутрах добавить */




























/* ------------------------------------Страрый работает-------------------------------------------------- */



import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";
import { createBasketForUser, createWishListForUser } from "./productAPI";

export const registration = async (first_name, last_name, email, password) => {
  console.log('registration', first_name, last_name, email, password)
  const response = await $host.post("auth/users/", { first_name, last_name, email, password });
  //localStorage.setItem("token", response.token); // глянь на этот ответ 2:11:7
  console.log("регистрация response", response);
  createBasketForUser({user: response.data.id})  // создаем корзину
  createWishListForUser({user: response.data.id})  // создаем список желаний 
  console.log("регистрация data", response.data);
  return response.data
};

export const login = async (email, password) => {
  const response = await $host.post("auth/jwt/create/", { email, password });
  console.log("авторизация response", response); 
  console.log("авторизация data", response.data);
  localStorage.setItem("token", response.data.access); // глянь на этот ответ 2:11:7
  console.log("авторизация response.data.access", response.data.access); 
  console.log("авторизация jwt_decode(response.data.access)", jwt_decode(response.data.access)); 

  const responseUserMe = await $authHost.get("api/v1/user-info/");
  console.log("авторизация auth/users/me/ responseUserMe", responseUserMe);
  console.log("авторизация auth/users/me/ responseUserMe data", responseUserMe.data);

  return responseUserMe.data.results[0];
};

// Проверка токена на валидность
// Получение данных о пользователя, если токен не валиден ничего не получим
export const check = async () => {
  console.log("check in userAPI is work")
  localStorage.setItem("token", localStorage.getItem("token"));
  console.log("check in userAPI is work token")

  const response = await $authHost.get("api/v1/user-info/");

  console.log("check auth/users/me/ token test", `Bearer ${localStorage.getItem("token")}`  );
  console.log("check auth/users/me/ response", response);
  console.log("check auth/users/me/ response.data", response.data);
  //console.log("check auth/users/me/ response.data results", response.data.results[0]);

  return response.data.results[0]
};







