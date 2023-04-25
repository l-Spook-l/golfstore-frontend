import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { fetchBrands, fetchProducts, fetchTypes } from "../../http/productAPI";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../../utils/consts";
import Slider from "../../components/UI/Slider/Slider";
import { Button, Col, Container, Fade, Row, Spinner } from "react-bootstrap";

const MainPage = observer(() => {
  const { product } = useContext(Context);

  // Для крутилки во время загрузки
  const [loading, setLoading] = useState(true)

  const [countTypesOnMainPage, setCountTypesOnMainPage] = useState(3)
  const [countBrandsOnMainPage, setCountBrandsOnMainPage] = useState(4)

  /*   
  console.log('shop - product page', product.page)
  console.log('shop - product types', product.types)
  console.log('shop - product brands', product.brands) */

  // первое получение типов, брєндов, продуктов
  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts(null, null, 1, null, null, null).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);
      //console.log('shop - data', data)
      //console.log('shop - data.results', data.results)
    })//.finally(() => setLoading(false));
  }, []);


  const showMoreTypes = () => {
    setCountTypesOnMainPage(countTypesOnMainPage + 3);
  };
  const showMoreBrands = () => {
    setCountBrandsOnMainPage(countBrandsOnMainPage + 4);
  };

/* useEffect(() => {
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

      //console.log('shop - data222', data)
      //console.log('shop - data222 results222', data.results)
      //console.log('shop - product types', product.types)
      //console.log('shop - product selectedType', product.selectedType)
      //console.log('shop - product selectedType id', product.selectedType.slug)
      //console.log('shop - product type2222222', product.types.slug)
      //console.log('shop - product brand222', product.brands) 
    });
  }, [product.selectedType, product.selectedBrand, product.page, product.priceMin, product.priceMax, product.ordering]); */

/*   console.log("shop - product", product);
  console.log('shop - product typesqqq', product.selectedType)
  console.log('shop - product brands', product.brands) */

/*   if (loading) {
    return <Spinner animation='grow'/>
  }
 */

  return (
    <div>
      <Slider />
      <Container>
      
      <Button>Types</Button>
      <Row className="mt-3 bg-info">
        {product.types.slice(0, countTypesOnMainPage).map((el) => 
          <Col md={4} key={el.id}>
            <Button style={{height: 200, width: 400, fontSize: 22}}>{el.name}</Button>
          </Col>
        )}
        {countTypesOnMainPage < product.types.length && (
          <Button style={{width: 300, margin: 'auto'}} className="mt-3" onClick={() => showMoreTypes()}>More types</Button>
        )}
      </Row>

      <Button>Brands</Button>
      <Row className="mt-3 bg-info">
        {product.brands.slice(0, countBrandsOnMainPage).map((el) => 
          <Col md={3} key={el.id}>
            <Button style={{height: 200, width: 300, fontSize: 22}}>{el.name}</Button>
          </Col>
        )}
        {countBrandsOnMainPage < product.brands.length && (
          <Button style={{width: 300, margin: 'auto'}} className="mt-3" onClick={() => showMoreBrands()}>More brands</Button>
        )}
      </Row>
      
      </Container>

    </div>
  );
});

export default MainPage;
