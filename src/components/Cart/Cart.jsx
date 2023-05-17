import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { deleteProductFromBasket, fetchListProductsBasket } from "../../http/productAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { CHECKOUT_ROUTE, PRODUCT_ROUTE } from "../../utils/consts";
import style from "./Cart.module.css"

const Basket = observer(() => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

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
  },[/* user.basket.product.length */])

  const deleteProduct = (basketId, productId) => {
    deleteProductFromBasket(basketId, productId)
    const basket = user.basket.product.filter(item => item.product.id !== productId)
    user.setBasket({id: basketId , product: basket})
  }

  if (loading) {
    return <Spinner animation='grow'/>
  }

  const totalPrice = user.basket.product.reduce((acc, el) => acc + el.product.price, 0);
  const productSlug = (productName) => 
    {
      const name = productName.toLowerCase().replace(/\'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return name
    } 
    
  return (
    <Container style={{paddingTop: '63px'}}>
      <h2>My Cart</h2>
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
            <p>Quantity {el.quantity}</p>
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
        : <h4 className="mt-5 text-muted">Cart is empty </h4>
        }
      

    </Container>
  );
});

export default Basket;
