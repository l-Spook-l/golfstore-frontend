import React, { useContext, useState } from "react";
import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { deleteProductFromBasket } from "../../http/productAPI";
import { Context } from "../..";
import CheckoutForm from "../../components/UI/CheckoutForm/CheckoutForm";
import { NavLink, useNavigate } from "react-router-dom";
import { MAIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import style from "./CheckoutPage.module.css";

const CheckoutPage = observer(() => {
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);

  const totalPrice = user.basket.product.reduce((acc, el) => {
    return acc + el.product.price * el.quantity;
  }, 0);

  const handleFormSubmit = (formData) => {
    // Выполняем логику с полученными данными формы
    console.log("formData formData formData", formData);
  };

  const sendOrder = (basketId) => {
    setShow(false);
    {
      user.basket.product.map((el) => {
        deleteProductFromBasket(basketId, el.product.id);
      });
    }
    user.setBasket({ id: basketId, product: [] });
    navigate(MAIN_ROUTE);
  };

  console.log("Checkout user.basket.product", user.basket.product);
  window.scrollTo(0, 0);
  return (
    <Container className={style.forContainer}>
      <h2>Order checkout</h2>
      <Row className="mt-2 d-flex justify-content-between">
        <Col md={4}>
          <h5>Your contact information</h5>
          <p>
            Name: {user.user.first_name} {user.user.last_name}, 
            Email: {user.user.email}
          </p>
        </Col>
        <Col md={3}>
          <NavLink to={{ pathname: PROFILE_ROUTE }} state="basket">
            Edit order
          </NavLink>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={10}>
          {user.basket.product.map((el) => (
            <Row className="m-1" key={el.product.id}>
              <Col md={1}>
                <Image
                  width={70}
                  height={70}
                  src={el.product.photos[0]["image"]}
                />
              </Col>
              <Col md={5}>
                <h5>{el.product.name}</h5>
              </Col>
              <Col md={2}>
                <p>Price {el.product.price} $</p>
              </Col>
              <Col md={2}>
                <p>Quantity {el.quantity}</p>
              </Col>
              <hr className="mt-3" />
            </Row>
          ))}
        </Col>
        <Col md={2}>
          <h5>Total</h5>
          <p>{totalPrice} $</p>
          <Button className="bg-success" onClick={() => setShow(true)}>
            Confirm order
          </Button>
        </Col>
      </Row>
      <CheckoutForm onFormSubmit={handleFormSubmit} />

      <Modal show={show} onHide={modalClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Your order has been received</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your order will be processed within 10 minutes. If necessary, an
          operator will contact you.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => sendOrder(user.basket.id)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});

export default CheckoutPage;
