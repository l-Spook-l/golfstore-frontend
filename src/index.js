import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";


// Создаем глобальную перевенную, это будет обьект, 
// который будет доступен компонентам на все уровнях вложенности
// с помощью хука useContext
// В любом компоненте можно их вызвать так
// const {user} = useContext(Context)
// const {product} = useContext(Context)
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // value - обьект который нам нужно сделать глобальным
  // их и вызываем с помощью хука useContext
  <Context.Provider
    value={{
      user: new UserStore(),
      product: new ProductStore(),
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
