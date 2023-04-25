import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchOneProduct } from '../../http/productAPI'

const ProductPage = () => {
  const [product, setProduct] = useState({info: []})
  // id нашего продукта
  const {id} = useParams()
  //console.log('params in product one', {id})
  //console.log('product in product one', product)
  //console.log('product in product one name', product.name)

  // первая и единственная загрузка стр
  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data))
    /* console.log('data one ', data) */
  }, [])

  
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={product.photo} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{product.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
               // background: `url(${bigStar}) no-repeat center center`,
                backgroundColor: 'blueviolet',
                backgroundSize: "cover",
                width: 240,
                height: 240,
                fontSize: 55,
              }}
            >
              {product.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d=flex flex-column align-items-center justify-content-around"
              style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>{product.price}</h3>
            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
{/*         {product.info.map((info, index) =>
          <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
            {info.title} : {info.description}
          </Row>
        )} */}
      </Row>
    </Container>
  )
}

export default ProductPage