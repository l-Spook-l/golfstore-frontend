import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { fetchListProductsBasket } from '../../http/productAPI';
import { Context } from '../..';
import CheckoutForm from '../../components/UI/CheckoutForm/CheckoutForm';

const CheckoutPage = () => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListProductsBasket(user.basket.id).then((products) => {
      user.setBasket({id: user.basket.id , product: products.results})
    }).finally(() => setLoading(false));
  },[])

  
  if (loading) {
    return <Spinner animation='grow'/>
  }

  const totalPrice = user.basket.product.reduce((acc, el) => acc + el.product.price, 0);

  return (
    <Container style={{paddingTop: '63px'}}>
      <h2>Оформлення замовлення</h2>
      <div className='mt-2'>
        <h5>Ваші контактні дані</h5>
        <p>{user.user.first_name} {user.user.last_name} {user.user.email}</p>
      </div>
      <Row className="mt-5">
        <Col md={10}>
        {user.basket.product.map((el) => (
        <Row className="m-1" key={el.product.id}>
          <Col md={1}>
            <Image width={70} height={70} src={el.product.photo} />
          </Col>
          <Col md={5}>
            <h5>{el.product.name}</h5>
          </Col>
          <Col md={2}>
            <p>Ціна {el.product.price}</p> 
          </Col>
          <Col md={2}>
          <p>кількість {el.quantity  }</p>
          </Col>
          <hr className='mt-3'/>
        </Row>
        ))}
        </Col>
        <Col md={2}>
            <h5>Итоговая сумма</h5>
            <p>{totalPrice}</p>
            <Button className="bg-success">Підтвердити замовлення</Button>
          </Col>
      </Row>
      <CheckoutForm/>
    </Container>
  );
}

export default CheckoutPage