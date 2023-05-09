import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../index'
import { Badge, Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import MyModal from '../../components/UI/MyModal/MyModal'
import { observer } from 'mobx-react-lite'
import FormLogin from '../UI/FormLogin/FormLogin'
import FormRegister from '../UI/FormRegister/FormRegister'
import { BASKET_ROUTE, BRAND_ROUTE, CATEGORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, SHOP_ROUTE, WISHLIST_ROUTE } from '../../utils/consts'
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineProfile, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';

// observer позволяет создавать компоненты, которые автоматически обновляются при изменении данных, отслеживаемых с помощью MobX.
const NavBar = observer(() => {
  const {user} = useContext(Context)
  const {product} = useContext(Context)

  const navigate = useNavigate();  // для перехода по страницам

  /* Для модального окна */
  const [showModal, setShowModal] = useState(false)

  // Кнопка выхода из профиля
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setBasket({id: null, product: []})
    user.setWishList({id: null, product: []})
    localStorage.setItem("token", null);
    navigate(MAIN_ROUTE)
  }
  
  /* ---------------------------------------------------- */
  const [showLogin, setShowLogin] = useState(true);

  const clickLogin = () => {
    setShowModal(true);
    setShowLogin(true);
  }

  const handleSwitchForm = () => {
    setShowLogin(!showLogin);
  }

  console.log('Работает Navbar')
  console.log('Работает Navbar user.basket.product.length', user.basket.product.length)

  return (
    <div>
      {/* collapseOnSelect: сворачивает менб в одну кнопку при ширине (expand)
    expand: при какой ширине будет сворачиваться меню
    bg: атрибут задает фоновый цвет (background color) для навигационного меню. 
    variant: атрибут задает вариант (стиль) оформления навигационного меню. */}
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top" style={{height: '63px'}}>
      {/* fluid указывает на то, что контейнер будет занимать всю доступную ширину родительского элемента. */}
      <Container fluid>
      {/* Навигаци вместо <a> */}
      <NavLink className="text-decoration-none text-light" to={MAIN_ROUTE}>Spook Golf</NavLink>
      {/* Navbar.Toggle - Кнопка которая появиться при уменьшении экрана и вней будут эл-ты которы находять в блоке с нужным - id*/}
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      {/* если ширина маленькая, меню которое внутри этого блока, будет светнуто в кнопку) */}
      <Navbar.Collapse id="responsive-navbar-nav" >
        <Nav className="ms-auto align-items-center">
          {/* Навигаци вместо <a> - react-router-dom*/}
          <NavLink className='text-muted text-decoration-none ms-2' to={SHOP_ROUTE}>Shop</NavLink>
          <NavLink className='text-muted text-decoration-none ms-2' to={LOGIN_ROUTE}>LOGIN_ROUTE</NavLink>
          <NavLink className='text-muted text-decoration-none ms-2' to={REGISTER_ROUTE}>REGISTER_ROUTE</NavLink>

        </Nav>

        <Nav>
        
          <NavLink style={{ fontSize: "1.8rem", color: "white", position: 'relative',marginLeft: '1rem' }} /* to={BASKET_ROUTE} */ to={{pathname: PROFILE_ROUTE}} state='basket'>
            <AiOutlineShoppingCart />
            {user.basket.product.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '-5px',
                borderRadius: '50%',
                color: 'white',
                fontSize: '1.1rem',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translate(50%, -50%)'
              }}>
                {user.basket.product.length}
              </div>
            )}
          </NavLink>

        </Nav>
        <Nav >
          {user.isAuth 
          ? 
          <div>
            <NavLink style={{ fontSize: "1.8rem", color: "white", position: 'relative', marginLeft: '1rem' }} /* to={WISHLIST_ROUTE} */ to={{pathname: PROFILE_ROUTE}} state='wishlist'>
            <AiOutlineHeart />
            {user.wishList.product.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '-5px',
                borderRadius: '50%',
                color: 'white',
                fontSize: '1.1rem',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translate(50%, -50%)'
              }}>
                {user.wishList.product.length}
              </div>
            )}
          </NavLink>
            <NavLink style={{ fontSize: "1.8rem", color: "white", position: 'relative', marginLeft: '1rem' }} to={{pathname: PROFILE_ROUTE}} state='userInfo' >
              <AiOutlineProfile/>
            </NavLink>
            <NavLink style={{ fontSize: "1.8rem", color: "white", position: 'relative', marginLeft: '1rem' }} onClick={logOut}><AiOutlineLogout/></NavLink>
          </div>
          : 
          <NavLink style={{ fontSize: "1.8rem", color: "white", position: 'relative', marginLeft: '1rem' }} onClick={clickLogin}><AiOutlineLogin/></NavLink>
          }
        </Nav>

      </Navbar.Collapse>
      </Container>
    </Navbar>

    {showLogin
    ?
    <FormLogin show={showModal} onHide={() => setShowModal(false)} onSwitchForm={handleSwitchForm}/>
    :
    <FormRegister show={showModal} onHide={() => setShowModal(false)} onSwitchForm={handleSwitchForm}/>
    }

    {/* <MyModal 
      showModal={showModal}
      setShowModal={modalClose} 
      title={showLogin ? 'Форма авторизации' : 'Форма регистрации'} >
        {showLogin 
        ? 
        <FormLogin onSwitchForm={handleSwitchForm} />
        :
        <FormRegister onSwitchForm={handleSwitchForm} />
        }
    </MyModal> */}

    </div>
  )
})

export default NavBar