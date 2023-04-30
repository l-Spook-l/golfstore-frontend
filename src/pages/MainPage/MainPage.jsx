import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { fetchBrands, fetchCategories, fetchProducts, fetchTypes } from "../../http/productAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { BRAND_ROUTE, CATEGORY_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import Slider from "../../components/UI/Slider/Slider";
import { Button, Card, Col, Container, Fade, Image, Row, Spinner } from "react-bootstrap";

const MainPage = observer(() => {
  const { product } = useContext(Context);
  const navigate = useNavigate();  // для перехода по страницам

  // Для крутилки во время загрузки
  const [loading, setLoading] = useState(true)

  const [countCategoryOnMainPage, setCountCategoryOnMainPage] = useState(3)
  const [countTypesOnMainPage, setCountTypesOnMainPage] = useState(3)
  const [countBrandsOnMainPage, setCountBrandsOnMainPage] = useState(4)

  /*   
  console.log('shop - product page', product.page)
  console.log('shop - product types', product.types)
  console.log('shop - product brands', product.brands) */

  // первое получение типов, брєндов, продуктов
  useEffect(() => {
   // fetchTypes().then((data) => product.setTypes(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchCategories().then((data) => product.setCategories(data));
    fetchProducts(null, null, null, 1, null, null, null).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);
      //console.log('shop - data', data)
      //console.log('shop - data.results', data.results)
    })//.finally(() => setLoading(false));
  }, []);

  const showMoreCategories = () => {
    setCountCategoryOnMainPage(countCategoryOnMainPage + 3);
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

  console.log("shop - product", product);
  console.log("shop - product products", product.products);
  console.log('shop - product typesqqq', product.selectedType)
  console.log('shop - product brands', product.brands)

/*   if (loading) {
    return <Spinner animation='grow'/>
  }
 */

  return (
    <div>
      <Slider />
      <Container>

      <Button>Categories</Button>
      <Row className="mt-3 bg-info">
        {product.categories.slice(0, countCategoryOnMainPage).map((el) => 
          <Col md={4} key={el.id}>
            <Button onClick={() => navigate(`${CATEGORY_ROUTE}/${el.slug}`)} style={{height: 200, width: 400, fontSize: 22}}>{el.name}</Button>
          </Col>
        )}
        {countCategoryOnMainPage < product.categories.length && (
          <Button style={{width: 300, margin: 'auto'}} className="mt-3" onClick={() => showMoreCategories()}>More types</Button>
        )}
      </Row>

      <h2>NEWEST ARRIVALS</h2>
      <Row>
        {product.products.slice(0, 3).map((el) => 
          <Card style={{ width: 150, cursor: "pointer" }} border="light">
            <Image width={150} height={150} src={el.photo} />
            <div>{el.name}</div>
            <div className="mt-1 d-flex justify-content-between align-items-center">
              <div>{el.price}</div>
            </div>
          </Card>
        )}
      </Row>
      
      <Button>Brands</Button>
      <Row className="mt-3 bg-info">
        {product.brands.slice(0, countBrandsOnMainPage).map((el) => 
          <Col md={3} key={el.id}>
            <Button onClick={() => navigate(`${BRAND_ROUTE}/${el.slug}`)} style={{height: 200, width: 300, fontSize: 22}}>{el.name}</Button>
          </Col>
        )}
        {countBrandsOnMainPage < product.brands.length && (
          <Button style={{width: 300, margin: 'auto'}} className="mt-3" onClick={() => showMoreBrands()}>More brands</Button>
        )}
      </Row>
      
      <Row>
        <Col md={6}>
          <h3>Golf clubs for you</h3>
        </Col>
        <Col md={6}>
          <h3>Exclusive brands</h3>
        </Col>
      </Row>
      </Container>

    </div>
  );
});

export default MainPage;
