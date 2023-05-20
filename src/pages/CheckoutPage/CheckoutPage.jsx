import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { fetchListProductsBasket } from '../../http/productAPI';
import { Context } from '../..';
import CheckoutForm from '../../components/UI/CheckoutForm/CheckoutForm';
import { NavLink } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';

const CheckoutPage = observer(() => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0);
    
    fetchListProductsBasket(user.basket.id).then((products) => {
      user.setBasket({id: user.basket.id , product: products.results})
      console.log('Checkout products', products)
    }).finally(() => setLoading(false));
    console.log('Checkout useEffect')
  },[])

  
  if (loading) {
    return <Spinner style={{marginTop: '200px'}} animation='grow'/>
  }

  const totalPrice = user.basket.product.reduce((acc, el) => {
    return acc + (el.product.price * el.quantity)
  }, 0);

  console.log('Checkout user.basket.product', user.basket.product)

  return (
    <Container className="my-5" style={{paddingTop: '63px'}}>
      <h2>Order checkout</h2>
      <Row className='mt-2 d-flex justify-content-between'>
        <Col md={3}>
          <h5>Your contact information</h5>
          <p>{user.user.first_name} {user.user.last_name} {user.user.email}</p>
        </Col>
        <Col md={3}>
          <NavLink to={{pathname: PROFILE_ROUTE}} state='cart'>Edit order</NavLink>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={10}>
        {user.basket.product.map((el) => (
        <Row className="m-1" key={el.product.id}>
          <Col md={1}>
            <Image width={70} height={70} src={el.product.photos[0]['image']} />
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
          <hr className='mt-3'/>
        </Row>
        ))}
        </Col>
        <Col md={2}>
          <h5>Total</h5>
          <p>{totalPrice} $</p>
          <Button className="bg-success">Confirm order</Button>
        </Col>
      </Row>
      <CheckoutForm/>
    </Container>
  );
})

export default CheckoutPage