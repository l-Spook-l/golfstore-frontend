import React, { useContext, useEffect } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import TypeBar from "../../components/TypeBar/TypeBar";
import BrandBar from "../../components/BrandBar/BrandBar";
import ProductList from "../../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { fetchBrands, fetchProducts, fetchTypes } from "../../http/productAPI";
import Paginations from "../../components/UI/Paginations/Paginations";
import PriceBar from "../../components/PriceBar";

const Shop = observer(() => {
  const { product } = useContext(Context);

  /*   console.log('shop - product', product)
  console.log('shop - product page', product.page)
  console.log('shop - product types', product.types)
  console.log('shop - product brands', product.brands) */

  // первое получение типов, брєндов, продуктов
  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts(null, null, 1).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);
      //console.log('shop - data', data)
      //console.log('shop - data.results', data.results)
    });
  }, []);

  useEffect(() => {
    fetchProducts(
      product.selectedType.map((el) => el.slug).join(", "),
      product.selectedBrand.map((el) => el.slug).join(", "),
      product.page,
      product.priceMin,
      product.priceMax,
      product.ordering,
    ).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);

      /*       console.log('shop - data222', data)
      console.log('shop - data222 results222', data.results)
      console.log('shop - product types', product.types)
      console.log('shop - product selectedType', product.selectedType)
      console.log('shop - product selectedType id', product.selectedType.slug)
      console.log('shop - product type2222222', product.types.slug)
      console.log('shop - product brand222', product.brands) */
    });
  }, [product.selectedType, product.selectedBrand, product.page, product.priceMin, product.priceMax, product.ordering]);


  return (
    <Container>
      <Row className="mt-3 bg-success" >
        <Col md={10} className="d-flex flex-wrap bg-primary">
        {product.selectedType.map((el) => 
            <Alert 
            key={el.id}
            variant="light" 
            className="me-1 border text-dark" 
            onClose={() => product.setSelectedType(el)} 
            dismissible>
              {el.name}
            </Alert>
          )}
          {product.selectedBrand.map((el) =>
            <Alert 
            key={el.id}
            variant="light" 
            className="me-1 border text-dark" 
            onClose={() => product.setSelectedBrand(el)} 
            dismissible>
              {el.name}
            </Alert>
          )}
        </Col>
        <Col md={2} className="d-flex flex-wrap align-items-end">
          {/* Сортировка по убыванию и возрастанию цены, дате создания */}
          <Form.Select  onChange={(e) => product.setOrdering(e.target.value)}>
            <option value="">Sorted by</option>
            <option value="-time_create">Новинки</option>
            <option value="price">Цена (От дешевых до дорогих)</option>
            <option value="-price">Цена (От дорогих до дешевых)</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mt-3">
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
});

export default Shop;
