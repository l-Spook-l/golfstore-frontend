import Auth from "./pages/Auth/Auth";
import Basket from "./pages/Basket/Basket";
import Shop from "./pages/Shop/Shop";
import Profile from "./pages/Profile/Profile"
import ProductPage from "./pages/ProductPage/ProductPage";
import MainPage from "./pages/MainPage/MainPage";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  PRODUCT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SHOP_ROUTE,
  PROFILE_ROUTE,
  MAIN_ROUTE,
} from "./utils/consts"; // Ссылки

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

// Доступ всем
export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTER_ROUTE,
    Component: Auth,
  },

  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },

];
