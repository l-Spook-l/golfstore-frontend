import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import MyModal from "../../components/UI/MyModal/MyModal";
import { observer } from "mobx-react-lite";
import FormLogin from "../UI/FormLogin/FormLogin";
import FormRegister from "../UI/FormRegister/FormRegister";
import {
  BRAND_ROUTE,
  CATEGORY_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SHOP_ROUTE,
} from "../../utils/consts";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineProfile,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import style from "./NavBar.module.css";

import { GiGolfFlag } from "react-icons/gi";

// observer позволяет создавать компоненты, которые автоматически обновляются при изменении данных, отслеживаемых с помощью MobX.
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const { product } = useContext(Context);

  const navigate = useNavigate(); // для перехода по страницам

  /* Для модального окна */
  const [showModal, setShowModal] = useState(false);

  // Кнопка выхода из профиля
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.setBasket({ id: null, product: [] });
    user.setWishList({ id: null, product: [] });
    localStorage.setItem("token", null);
    navigate(MAIN_ROUTE);
  };

  /* ---------------------------------------------------- */
  const [showLogin, setShowLogin] = useState(true);

  const clickLogin = () => {
    setShowModal(true);
    setShowLogin(true);
  };

  const handleSwitchForm = () => {
    setShowLogin(!showLogin);
  };

  console.log("Работает Navbar");
  console.log(
    "Работает Navbar user.basket.product.length",
    user.basket.product.length
  );
  console.log(
    "Navbar product.categoriesForSelected",
    product.categoriesForSelected
  );

  return (
    <Container>
      {/* collapseOnSelect: сворачивает меню в одну кнопку при ширине (expand)
    expand: при какой ширине будет сворачиваться меню
    bg: атрибут задает фоновый цвет (background color) для навигационного меню. 
    variant: атрибут задает вариант (стиль) оформления навигационного меню. */}
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="black"
        variant="dark"
        className="fixed-top"
        style={{ height: "63px" }}
      >
        {/* fluid указывает на то, что контейнер будет занимать всю доступную ширину родительского элемента. */}
        {/* Навигаци вместо <a> */}
        <NavLink className={style.logoContainer} to={MAIN_ROUTE}>
          <GiGolfFlag className={style.logo} />
          <span className={style.logoText}>Spook Golf</span>
        </NavLink>
        {/* Navbar.Toggle - Кнопка которая появиться при уменьшении экрана и вней будут эл-ты которы находять в блоке с нужным - id*/}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {/* если ширина маленькая, меню которое внутри этого блока, будет светнуто в кнопку) */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Навигаци вместо <a> - react-router-dom*/}
            <NavLink
              className={style.shopOnNavbar}
              to={SHOP_ROUTE}
            >
              Shop All
            </NavLink>
            <NavDropdown className={style.dropdownMenuTitle} title="Brands" id="collasible-nav-dropdown-brands">
              {product.brandsForSelected.map((el) => (
                <NavDropdown.Item key={el.id}>
                  <button
                    className={style.dropdownMenu}
                    onClick={() => navigate(`${BRAND_ROUTE}/${el.slug}`)}
                  >
                    {el.name}
                  </button>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown className={style.dropdownMenuTitle} title="Categories" id="collasible-nav-dropdown-categories">
              {product.categoriesForSelected.map((el) => (
                <NavDropdown.Item key={el.id}>
                  <button
                    className={style.dropdownMenu}
                    onClick={() => navigate(`${CATEGORY_ROUTE}/${el.slug}`)}
                  >
                    {el.name}
                  </button>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            {/* <NavLink
              className="text-muted text-decoration-none ms-2"
              to={LOGIN_ROUTE}
            >
              LOGIN_ROUTE
            </NavLink>
            <NavLink
              className="text-muted text-decoration-none ms-2"
              to={REGISTER_ROUTE}
            >
              REGISTER_ROUTE
            </NavLink> */}
          </Nav>

          <Nav>
            <NavLink
              className={style.cart}
              to={user.isAuth ? { pathname: PROFILE_ROUTE } : undefined}
              state="cart"
              onClick={!user.isAuth ? clickLogin : undefined}
            >
              <AiOutlineShoppingCart />

              {user.basket.product.length > 0 && (
                <div className={style.cartCount}>
                  {user.basket.product.length}
                </div>
              )}
            </NavLink>
          </Nav>

          <Nav>
            {user.isAuth ? (
              <div>
                <NavLink
                  className={style.wishlist}
                  to={{ pathname: PROFILE_ROUTE }}
                  state="wishlist"
                >
                  <AiOutlineHeart />
                  {user.wishList.product.length > 0 && (
                    <div className={style.wishlistCount}>
                      {user.wishList.product.length}
                    </div>
                  )}
                </NavLink>
                <NavLink
                  className={style.profile}
                  to={{ pathname: PROFILE_ROUTE }}
                  state="userInfo"
                >
                  <AiOutlineProfile />
                </NavLink>
                <NavLink
                  className={style.login}
                  onClick={logOut}
                >
                  <AiOutlineLogout />
                </NavLink>
              </div>
            ) : (
              <NavLink
                className={style.logout}
                onClick={clickLogin}
              >
                <AiOutlineLogin />
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {showLogin ? (
        <FormLogin
          show={showModal}
          onHide={() => setShowModal(false)}
          onSwitchForm={handleSwitchForm}
        />
      ) : (
        <FormRegister
          show={showModal}
          onHide={() => setShowModal(false)}
          onSwitchForm={handleSwitchForm}
        />
      )}
    </Container>
  );
});

export default NavBar;
