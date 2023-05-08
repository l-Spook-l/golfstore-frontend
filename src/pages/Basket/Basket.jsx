import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { deleteProductFromBasket, fetchListProductsBasket } from "../../http/productAPI";
import { NavLink } from "react-router-dom";
import { CHECKOUT_ROUTE } from "../../utils/consts";

const Basket = observer(() => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true)

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
  },[user.basket.product.length])

  const deleteProduct = (basketId, productId) => {
    deleteProductFromBasket(basketId, productId)
    const basket = user.basket.product.filter(item => item.product.id !== productId)
    user.setBasket({id: basketId , product: basket})
  }

  if (loading) {
    return <Spinner animation='grow'/>
  }

  const totalPrice = user.basket.product.reduce((acc, el) => acc + el.product.price, 0);

  return (
    <Container style={{paddingTop: '63px'}}>
      <h2>Моя корзина</h2>
      <Row className="my-1">
        <Col md={10}>
        {user.basket.product.map((el) => (
        <Row className="mt-5" key={el.product.id}>
          <Col md={3}>
            <Image width={150} height={150} src={el.product.photo} />
          </Col>
          <Col md={5}>
            <h5>{el.product.name}</h5>
            <p>кол-во</p>
            <p>{el.product.price}</p>
          </Col>
          <Col md={2}>
            <Button onClick={() => deleteProduct(user.basket.id, el.product.id)} className="btn-danger">Удалить</Button>
          </Col>
        </Row>
        ))}
        </Col>
        <Col md={2}>
            <h5>Итоговая сумма</h5>
            <p>{totalPrice}</p>
            <NavLink to={CHECKOUT_ROUTE}>Оформить заказ</NavLink>
          </Col>
      </Row>

    </Container>
  );
});

export default Basket;
