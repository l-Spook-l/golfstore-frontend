import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { Spinner } from "react-bootstrap";
import { Context } from "./index";
import { check } from "./http/userAPI";
import Footer from "./components/Footer/Footer";
import { observer } from "mobx-react-lite";
import { $authHost } from "./http";
import { fetchBasket, fetchListProductsBasket, fetchListProductsWishList, fetchWishList } from "./http/productAPI";

const App = observer(() => {
  // оплучаем состоянию пользователя
  const {user} = useContext(Context)
/*   console.log('App user', user)
  console.log('App user user', user.user)
  console.log('App user user name', user.user.username) */

  // Для крутилки во время загрузки
  const [loading, setLoading] = useState(true)
  //console.log('$authHost', $authHost.interceptors  )

  // При открытии 1 раз делаем проверку
  useEffect(() => {
    //console.log('начал работать check', user)
    check().then((data) => {
      user.setUser(data)
      user.setIsAuth(true)
      fetchBasket(user.user.id).then((data) => {
        console.log('App basket data one ', data)
        fetchListProductsBasket(data.id).then((products) => {
          user.setBasket({id: data.id , product: products.results})
          console.log('App fetchListProductsBasket products', products)
          console.log('App fetchListProductsBasket products results', products.results)
        })
      })
      fetchWishList(user.user.id).then((data) => {
        console.log('App fetchWishList data one ', data)
        fetchListProductsWishList(data.id).then((products) => {
          user.setWishList({id: data.id , product: products.results})
          console.log('App fetchListProductsWishList products', products)
          console.log('App fetchListProductsWishList products results', products.results)
        })
      })
      //console.log('отработал check - user ', user)
      //console.log('отработал check - data', data)
    }).finally(() => setLoading(false))
  },[])


  if (loading) {
    return <Spinner animation='grow'/>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
});

export default App;
