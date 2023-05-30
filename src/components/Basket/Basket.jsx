import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { deleteProductFromBasket, fetchListProductsBasket, updateQuantityProductInBasket } from "../../http/productAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { CHECKOUT_ROUTE, PRODUCT_ROUTE } from "../../utils/consts";
import style from "./Basket.module.css"

const Basket = observer(() => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const [changeQuantity, setChangeQuantity] = useState(true)

  /* console.log('Basket user', user)
  console.log('Basket user user', user.user)
  console.log('Basket user user id', user.user.id) */
  console.log('Basket user', user)
  console.log("Basket user basket", user.basket);
  //console.log("Basket user basket lenght ", user.basket.length);
  
  useEffect(() => {
    fetchListProductsBasket(user.basket.id).then((products) => {
      user.setBasket({id: user.basket.id , product: products.results})
    }).finally(() => setLoading(false));
    console.log('Basket useEffect')
  },[changeQuantity])

  const deleteProduct = (basketId, productId) => {
    deleteProductFromBasket(basketId, productId)
    const basket = user.basket.product.filter(item => item.product.id !== productId)
    user.setBasket({id: basketId , product: basket})
  }

  /* if (loading) {
    return <Spinner animation='grow'/>
  }
 */
  const totalPrice = user.basket.product.reduce((acc, el) => {
    return acc + (el.product.price * el.quantity)
  }, 0);

  const productSlug = (productName) => 
    {
      const name = productName.toLowerCase().replace(/\'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return name
    } 
    
  const changeQuantityPlus = (basketId, productId, quantity) => {
    updateQuantityProductInBasket(basketId, productId, quantity)
    setChangeQuantity(!changeQuantity)
  }
  
  const changeQuantityMinus = (basketId, productId, quantity) => {
    updateQuantityProductInBasket(basketId, productId, quantity)
    setChangeQuantity(!changeQuantity)
  }

  return (
    <Container className={style.forContainer}>
      <h2>My Basket</h2>
      {user.basket.product.length > 0 
        ? 
        <Row className="my-1">
        <Col md={10}>
        {user.basket.product.map((el) => 
        <Row className="mt-3" key={el.product.id}>
          <Col md={2}>
            <Image className={style.image} src={el.product.photos[0]['image']}
            onClick={() => navigate(`${PRODUCT_ROUTE}/${productSlug(el.product.name)}`)}
            />
          </Col>
          <Col md={6}>
            <h5>{el.product.name}</h5>
            <div className="d-flex">
              Quantity
              <div className="1">
                <button className={style.buttonChangeQuantity} disabled={el.quantity === 1} onClick={() => changeQuantityMinus(user.basket.id, el.product.id, el.quantity - 1)}>-</button>
                {el.quantity}
                <button className={style.buttonChangeQuantity} onClick={() => changeQuantityPlus(user.basket.id, el.product.id, el.quantity + 1)}>+</button>
              </div>
            </div>
            <p>{el.product.price} $</p>
          </Col>
          <Col md={2}>
            <Button onClick={() => deleteProduct(user.basket.id, el.product.id)} className="btn-danger">Delete</Button>
          </Col>
        </Row>
        )}
        </Col>
        <Col md={2}>
          <h5>Total amount</h5>
          <p>{totalPrice} $</p>
          <NavLink className={style.buttonOrder} to={CHECKOUT_ROUTE}>Place Order</NavLink>
        </Col>
      </Row>
        : <h4 className="mt-5 text-muted">Basket is empty </h4>
        }
    </Container>
  );
});

export default Basket;
