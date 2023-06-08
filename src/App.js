import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { Spinner } from "react-bootstrap";
import { Context } from "./index";
import { check } from "./http/userAPI";
import Footer from "./components/Footer/Footer";
import { observer } from "mobx-react-lite";
import { fetchBasket, fetchBrands, fetchCategories, fetchListProductsBasket, fetchListProductsWishList, fetchWishList } from "./http/productAPI";

const App = observer(() => {
  // получаем состоянию пользователя
  const { user } = useContext(Context)
  const { product } = useContext(Context);

  // Для крутилки во время загрузки
  const [loading, setLoading] = useState(true)

  // При открытии 1 раз делаем проверку
  useEffect(() => {
    fetchBrands().then((data) => product.setBrandsForSelected(data));
    fetchCategories().then((data) => product.setCategoriesForSelected(data));
    
    check().then((data) => {
      user.setUser(data)
      user.setIsAuth(true)
      fetchBasket(user.user.id).then((data) => {
        fetchListProductsBasket(data.id).then((products) => {
          user.setBasket({id: data.id , product: products.results})
        })
      })
      fetchWishList(user.user.id).then((data) => {
        fetchListProductsWishList(data.id).then((products) => {
          user.setWishList({id: data.id , product: products.results})
        })
      })
    }).catch(error => {
      console.log('Error login', error);
      // Обработка других ошибок, возникших при выполнении запроса
    }).finally(() => setLoading(false))
  },[user.isAuth])
  
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
