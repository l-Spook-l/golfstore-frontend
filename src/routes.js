import Auth from "./pages/Auth/Auth";
import Basket from "./pages/Basket/Basket";
import Shop from "./pages/Shop/Shop";
import ProductPage from "./pages/ProductPage/ProductPage";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  PRODUCT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SHOP_ROUTE,
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
    path: SHOP_ROUTE,
    Component: Shop,
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
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductPage,
  },
];
