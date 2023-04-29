import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom"; // Для работы с маршрутами
import { authRoutes, publicRoutes } from "../routes";
import Page404 from "../pages/Page404/Page404"
import { Context } from "../index";

const AppRouter = () => {
  const {user} = useContext(Context)
  // const {product} = useContext(Context)

/*   console.log('AppRouter user', user)
  console.log('AppRouter user user', user.user)
  console.log('AppRouter user user name', user.user.username) */
  // console.log(product)

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {/* Маршрут для обработки ошибки 404 */}
      <Route path="/*" element={<Page404/>}/>
    </Routes>
  );
};

export default AppRouter;
