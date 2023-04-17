import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { Spinner } from "react-bootstrap";
import { Context } from "./index";
import { check } from "./http/userAPI";

const App = () => {
  const {user} = useContext(Context)

  // Для крутилки во время загрузки
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then((data) => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  },[])


  if (loading) {
    return <Spinner animation='grow'/>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
