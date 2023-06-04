import React, { useContext, useState } from "react";
import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { deleteProductFromBasket } from "../../http/productAPI";
import { Context } from "../..";
import CheckoutForm from "../../components/Forms/CheckoutForm/CheckoutForm";
import { NavLink, useNavigate } from "react-router-dom";
import { MAIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import style from "./CheckoutPage.module.css";

const CheckoutPage = observer(() => {
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [formValid, setFormValid] = useState(true);

  const modalClose = () => setShow(false);

  const totalPrice = user.basket.product.reduce((acc, el) => {
    return acc + el.product.price * el.quantity;
  }, 0);

  const formSubmit = (formData) => {
    // formData - полученные данные из формы
    setFormValid(false);
    //console.log("formData formData formData", formData);
  };

  const sendOrder = (basketId) => {
    setShow(false);
    user.basket.product.map((el) => deleteProductFromBasket(basketId, el.product.id))
    user.setBasket({ id: basketId, product: [] });
    navigate(MAIN_ROUTE);
  };

  window.scrollTo(0, 0);
  
  return (
    <Container className={style.forContainer}>
      <h2>Order checkout</h2>
      <div className={style.contactInformation}>
        <div >
          <h5>Your contact information</h5>
          <p>
            Name: {user.user.first_name} {user.user.last_name}, 
            Email: {user.user.email}
          </p>
        </div>
        <div>
          <NavLink to={{ pathname: PROFILE_ROUTE }} state="basket">
            Edit order
          </NavLink>
        </div>
      </div>
      <div className={style.mainBlock}>
        <div className={style.blockProducts}>
          {user.basket.product.map((el) => (
            <div className={style.productBlock} key={el.product.id}>
              <div>
                <Image
                  width={70}
                  height={70}
                  src={el.product.photos[0]["image"]}
                />
              </div>
              <div className={style.nameProduct}>
                <h5>{el.product.name}</h5>
              </div>
              <div className={style.priceProduct}>
                <p>Price {el.product.price} $</p>
              </div>
              <div>
                <p>Quantity {el.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={style.orderBlock}>
          <p className={style.orderBlockTitle}>Total</p>
          <p className={style.orderBlockPrice}>{totalPrice} $</p>
          <Button
            className="bg-success"
            disabled={formValid}
            onClick={() => setShow(true)}
          >
            Confirm order
          </Button>
        </div>
      </div>
      <CheckoutForm onFormSubmit={formSubmit} />

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
