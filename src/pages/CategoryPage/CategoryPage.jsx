import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBrands, fetchOneCategory, fetchProducts, fetchProductsByCategory } from '../../http/productAPI'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import PriceBar from '../../components/PriceBar'
import BrandBar from '../../components/BrandBar/BrandBar'
import Paginations from '../../components/UI/Paginations/Paginations'
import ProductList from '../../components/ProductList'
import TypeBar from '../../components/TypeBar/TypeBar'

const CategoryPage = observer(() => {
  const { product } = useContext(Context);
  
  const {slug} = useParams()
  console.log('slug', slug)
  // первое получение типов, брєндов, продуктов
  useEffect(() => {
    fetchOneCategory(slug).then((data) => product.setTypes(data.type))
    fetchBrands().then((data) => product.setBrands(data));
    fetchProductsByCategory(slug, null, null, 1, null, null, null).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);
      console.log('CategoryPage - data', data)
      //console.log('shop - data.results', data.results)
    });
  }, []);

  useEffect(() => {
    fetchProductsByCategory(
      slug,
      product.selectedType.map((el) => el.slug).join(", "),
      product.selectedBrand.map((el) => el.slug).join(", "),
      product.page,
      product.priceMin,
      product.priceMax,
      product.ordering,
    ).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);

      console.log('category page - data', data)
      console.log('category page - data results', data.results)
      console.log('category page - product types', product.types)
      console.log('category page - product brand', product.brands)
      console.log('category page - product selectedType', product.selectedType)
    });
  }, [product.selectedType, product.selectedBrand, product.page, product.priceMin, product.priceMax, product.ordering]);

  const clearFilter = () => {
    product.setSelectedType('clear')
    product.setSelectedBrand('clear')
  }
  //console.log('category', category)
  //console.log('category results', category.results[0].name)
  //console.log("CategoryPage - product", product);
  //console.log('CategoryPage - product selectedType', product.selectedType)
  //console.log('CategoryPage - product brands', product.brands)
  //console.log('CategoryPage - product types', product.types)

  return (
    <Container>
      
      <Row className="mt-3">
        <Col md={10} className="d-flex flex-wrap mb-0 ">
        {product.selectedType.length !== 0 || product.selectedBrand.length !== 0
         ? <Button onClick={() => clearFilter()}>Очистить</Button>
         : null
         }
          {product.selectedType.map((el) => 
            <Alert 
              key={el.id}
              variant="light" 
              className="me-1 border text-dark p-2"  >
              {el.name  }
              <Button 
                type="button" 
                className="ms-1 btn-close"
                style={{fontSize: 12}}
                aria-label="Close" 
                onClick={() => product.setSelectedType(el)} 
              ></Button>
            </Alert>
            )}

            {product.selectedBrand.map((el) =>
              <Alert 
                key={el.id} 
                variant="light" 
                className="me-1 border text-dark p-2"  >
                {el.name}
                <Button 
                  type="button" 
                  className="ms-1 btn-close"
                  style={{fontSize: 12}}  
                  aria-label="Close" 
                  onClick={() => product.setSelectedBrand(el)} 
                ></Button>
              </Alert>
            )}
        </Col>
        
        <Col md={2} className="d-flex flex-wrap align-items-end">
          {/* Сортировка по убыванию и возрастанию цены, дате создания */}
          <Form.Select className="mt-4" onChange={(e) => product.setOrdering(e.target.value)}>
            <option value="">Sorted by</option>
            <option value="-time_create">Новинки</option>
            <option value="price">Цена (От дешевых до дорогих)</option>
            <option value="-price">Цена (От дорогих до дешевых)</option>
          </Form.Select>
        </Col>

      </Row>
      <hr />
      <Row>
        <Col md={3}>
          <Col md={9}>
            <TypeBar />
            <PriceBar />
            <BrandBar />
          </Col>
        </Col>
        <Col md={9}>
          <ProductList />
          <Paginations />
        </Col>
      </Row>
    </Container>
  );
})

export default CategoryPage