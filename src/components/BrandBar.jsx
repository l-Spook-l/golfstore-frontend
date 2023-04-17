import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../index'
import { Card, Col, Row } from 'react-bootstrap'

const BrandBar = observer(() => {
  const {product} = useContext(Context)
  return (
    <Row >
      <Col className='d-flex flex-wrap' style={{height:40}}>
      {product.brands.map((brand) => 
        <Card 
          key={brand.id}
          className='p-2 m-1'
          style={{cursor: 'pointer'}}
          onClick={() => product.setSelectedBrand(brand)}
          border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
        >
          {brand.name}
        </Card>
      )}
      </Col>
    </Row>
  )
})

export default BrandBar