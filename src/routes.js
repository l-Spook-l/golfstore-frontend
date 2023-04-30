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
  CATEGORY_ROUTE,
  BRAND_ROUTE,
} from "./utils/consts"; // Ссылки
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import BrandPage from "./pages/BrandPage/BrandPage";

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
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
    path: CATEGORY_ROUTE + "/:slug",
    Component: CategoryPage,
  },
  {
    path: BRAND_ROUTE + "/:slug",
    Component: BrandPage,
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
    path: BASKET_ROUTE,
    Component: Basket,
  },
];
