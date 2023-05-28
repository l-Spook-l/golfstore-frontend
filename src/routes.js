import Shop from "./pages/Shop/Shop";
import Profile from "./pages/Profile/Profile";
import ProductPage from "./pages/ProductPage/ProductPage";
import MainPage from "./pages/MainPage/MainPage";
import { PRODUCT_ROUTE, SHOP_ROUTE, PROFILE_ROUTE, MAIN_ROUTE, CATEGORY_ROUTE, BRAND_ROUTE, CHECKOUT_ROUTE } from "./utils/consts"; 
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import BrandPage from "./pages/BrandPage/BrandPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

export const authRoutes = [
    {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: CHECKOUT_ROUTE,
    Component: CheckoutPage,
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
    path: PRODUCT_ROUTE + "/:slug",
    Component: ProductPage,
  },
];
