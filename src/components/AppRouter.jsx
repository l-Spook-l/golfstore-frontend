import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom"; // Для работы с маршрутами
import { authRoutes, publicRoutes } from "../routes";
import Page404 from "../pages/Page404/Page404"
import { Context } from "../index";

const AppRouter = () => {
  const {user} = useContext(Context)

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="/*" element={<Page404/>}/>
    </Routes>
  );
};

export default AppRouter;
