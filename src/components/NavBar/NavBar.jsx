import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { Container, Nav, NavDropdown, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import FormLogin from "../Forms/FormLogin/FormLogin";
import FormRegister from "../Forms/FormRegister/FormRegister";
import { BRAND_ROUTE, CATEGORY_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineProfile, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import style from "./NavBar.module.css";
import { GiGolfFlag } from "react-icons/gi";
import SearchBar from "../Filters/SearchBar/SearchBar";

// observer позволяет создавать компоненты, которые автоматически обновляются при изменении данных, отслеживаемых с помощью MobX.
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const { product } = useContext(Context);

  const navigate = useNavigate(); // для перехода по страницам

  const [showLogin, setShowLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Выход из профиля
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.setBasket({ id: null, product: [] });
    user.setWishList({ id: null, product: [] });
    localStorage.setItem("token", null);
    navigate(MAIN_ROUTE);
  };

  const clickLogin = () => {
    setShowModal(true);
    setShowLogin(true);
  };

  const handleSwitchForm = () => {
    setShowLogin(!showLogin);
  };

  //console.log("Работает Navbar");

  return (
    <Container>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="black"
        variant="dark"
        className="fixed-top"
        style={{ height: "63px" }}
      >
        <NavLink className={style.logoContainer} to={MAIN_ROUTE}>
          <GiGolfFlag className={style.logo} />
          <span className={style.logoText}>Spook Golf</span>
        </NavLink>
        <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-lg"} />
        <Navbar.Offcanvas
          id={"offcanvasNavbar-expand-lg"}
          aria-labelledby={"offcanvasNavbarLabel-expand-lg"}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={"offcanvasNavbarLabel-expand-lg"}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-black">
            <Nav className="ms-auto align-items-center">
              <SearchBar />
              <NavLink className={style.shopOnNavbar} to={SHOP_ROUTE}>
                Shop All
              </NavLink>
              <NavDropdown
                className={style.dropdownMenuTitle}
                title="Brands"
                id="collasible-nav-dropdown-brands"
              >
                {product.brandsForSelected.map((el) => (
                  <NavDropdown.Item key={el.id} className={style.dropdownItem}>
                    <button
                      className={style.buttonLink}
                      onClick={() => navigate(`${BRAND_ROUTE}/${el.slug}`)}
                    >
                      {el.name}
                    </button>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <NavDropdown
                className={style.dropdownMenuTitle}
                title="Categories"
                id="collasible-nav-dropdown-categories"
              >
                {product.categoriesForSelected.map((el) => (
                  <NavDropdown.Item key={el.id} className={style.dropdownItem}>
                    <button
                      className={style.buttonLink}
                      onClick={() => navigate(`${CATEGORY_ROUTE}/${el.slug}`)}
                    >
                      {el.name}
                    </button>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <div className="d-flex justify-content-center">
              <Nav>
                <NavLink
                  className={style.cart}
                  to={user.isAuth ? { pathname: PROFILE_ROUTE } : undefined}
                  state="basket"
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
                    <NavLink className={style.login} onClick={logOut}>
                      <AiOutlineLogout />
                    </NavLink>
                  </div>
                ) : (
                  <NavLink className={style.logout} onClick={clickLogin}>
                    <AiOutlineLogin />
                  </NavLink>
                )}
              </Nav>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
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
