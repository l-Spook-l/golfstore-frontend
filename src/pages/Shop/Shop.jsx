import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TypeBar from '../../components/TypeBar'
import BrandBar from '../../components/BrandBar'
import ProductList from '../../components/ProductList'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import { fetchBrands, fetchProducts, fetchTypes } from '../../http/productAPI'
import Paginations from '../../components/UI/Paginations/Paginations'

const Shop = observer(() => {
  const {product} = useContext(Context)

  //console.log('shop - product', product)
  //console.log('shop - product page', product.page)
  //console.log('shop - product types', product.types)
  //console.log('shop - product brands', product.brands)


  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data))
    fetchBrands().then((data) => product.setBrands(data))
    fetchProducts(null, null, 1).then((data) => {
      product.setProducts(data.results)
      product.setTotalCount(data.count)
      //console.log('shop - data', data)
      //console.log('shop - data .results', data.results)
    })
  }, [])

  useEffect(() => {
    fetchProducts(product.selectedType.slug, product.selectedBrand.slug, product.page).then((data) => {
      product.setProducts(data.results)
      product.setTotalCount(data.count)
/*       console.log('shop - data222', data)
      console.log('shop - data222 results222', data.results)
      console.log('shop - product types', product.types)
      console.log('shop - product selectedType', product.selectedType)
      console.log('shop - product selectedType id', product.selectedType.id)
      console.log('shop - product type2222222', product.types.slug)
      console.log('shop - product brand222', product.brands) */
    })
  }, [product.selectedType, product.selectedBrand, product.page])
  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar/>
        </Col>
        <Col md={9}>
          <BrandBar/>
          <ProductList/>
          <Paginations/>
        </Col>
      </Row>
    </Container>
  )
})

export default Shop