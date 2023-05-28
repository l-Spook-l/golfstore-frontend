import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import {
  fetchBrands,
  fetchCategories,
  fetchProducts,
  fetchTypes,
} from "../../http/productAPI";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BRAND_ROUTE,
  CATEGORY_ROUTE,
  PRODUCT_ROUTE,
  SHOP_ROUTE,
} from "../../utils/consts";
import SliderForMainPage from "../../components/UI/SliderForMainPage/SliderForMainPage";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import golf_clothing_photo from "../../assets/golf-clothing-main-page.png";
import golf_brands_photo from "../../assets/golf-brands-main-page.png";
import style from "./MainPage.module.css";

const MainPage = observer(() => {
  const { product } = useContext(Context);
  const navigate = useNavigate(); // для перехода по страницам

  // Для крутилки во время загрузки
  const [loading, setLoading] = useState(true);

  const [countCategoryOnMainPage, setCountCategoryOnMainPage] = useState(3);
  const [countBrandsOnMainPage, setCountBrandsOnMainPage] = useState(4);

  const [isHovered, setIsHovered] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  /*   
  console.log('shop - product page', product.page)
  console.log('shop - product types', product.types)
  console.log('shop - product brands', product.brands) */

  // первое получение типов, брєндов, продуктов
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBrands().then((data) => product.setBrands(data));
    fetchCategories().then((data) => product.setCategories(data));
    fetchProducts(null, null, null, 1, null, null, null)
      .then((data) => {
        product.setProducts(data.results);
        product.setTotalCount(data.count);
        //console.log('shop - data', data)
        //console.log('shop - data.results', data.results)
      })
      .finally(() => setLoading(false));
  }, []);

  const showMoreCategories = () => {
    setCountCategoryOnMainPage(countCategoryOnMainPage + 3);
  };

  const showMoreBrands = () => {
    setCountBrandsOnMainPage(countBrandsOnMainPage + 4);
  };

  const hoverProduct = (productId) => {
    setIsHovered(true);
    setActiveProduct(productId);
  };

  /* console.log("shop - product", product);
  console.log("shop - product products", product.products);
  console.log('shop - product typesqqq', product.selectedType)
  console.log('shop - product brands', product.brands) */

  /* if (loading) {
    return <Spinner animation="grow" />;
  }
 */
  console.log("MainPage");

  return (
    <div style={{ paddingTop: "63px" }}>
      <SliderForMainPage />
      <Container>
        <h2 className={style.sectionTitle}>Categories</h2>
        <Row className="justify-content-center">
          {product.categories.slice(0, countCategoryOnMainPage).map((el) => (
            <Col md={4} key={el.id}>
              <button
                className={style.buttonCatigories}
                onClick={() => navigate(`${CATEGORY_ROUTE}/${el.slug}`)}
              >
                {el.name}
              </button>
            </Col>
          ))}
          {countCategoryOnMainPage < product.categories.length && (
            <button
              className={style.buttonForMore}
              onClick={() => showMoreCategories()}
            >
              More categories
            </button>
          )}
        </Row>

        <h2 className={style.sectionTitle}>NEWEST ARRIVALS</h2>
        <Row style={{ display: "flex", justifyContent: "space-around" }}>
          {product.products.slice(0, 4).map((el) => (
            <Card
              style={{ width: 280, cursor: "pointer" }}
              border="light"
              key={el.id}
            >
              <Image
                width={250}
                height={250}
                src={
                  isHovered && activeProduct === el.id && el.photos.length > 1
                    ? el.photos[2]["image"]
                    : el.photos[0]["image"]
                }
                onClick={() => navigate(`${PRODUCT_ROUTE}/${el.slug}`)}
                onMouseEnter={() => hoverProduct(el.id)}
                onMouseLeave={() => setIsHovered(false)}
              />
              <p>{el.name}</p>
              <div className="m-auto">
                <p>{el.price} $</p>
              </div>
            </Card>
          ))}
        </Row>

        <h2 className={style.sectionTitle}>Brands</h2>
        <Row className="justify-content-center mb-5">
          {product.brands.slice(0, countBrandsOnMainPage).map((el) => (
            <Col md={3} key={el.id}>
              <button
                className={style.buttonBrands}
                onClick={() => navigate(`${BRAND_ROUTE}/${el.slug}`)}
              >
                {el.name}
              </button>
            </Col>
          ))}
          {countBrandsOnMainPage < product.brands.length && (
            <button
              className={style.buttonForMore}
              onClick={() => showMoreBrands()}
            >
              More brands
            </button>
          )}
        </Row>

        <Row className="mt-5 mb-5">
          <Col md={6} className="d-flex flex-column">
            <h3 className="text-center">Golf clubs for you</h3>
            <p className={style.textForGoflClubsAndBrands}>
              Discover the perfect golf clubs for your game at Golf Clubs for
              You. Our selection features top equipment brands like TaylorMade
              Golf, Callaway, Titleist, PXG, Mizuno, Miura, and more.
            </p>
            <NavLink
              className={style.buttonForGoflClubsAndBrands}
              to={`${CATEGORY_ROUTE}/golf-clubs`}
            >
              Shop
            </NavLink>
            <Image
              className={style.imageForGoflClubsAndBrands}
              width={500}
              height={600}
              src={golf_brands_photo}
            />
          </Col>

          <Col md={6} className="d-flex flex-column">
            <h3 className="text-center">Exclusive brands</h3>
            <Image
              className={style.imageForGoflClubsAndBrands}
              width={500}
              height={600}
              src={golf_clothing_photo}
            />
            <p className={style.textForGoflClubsAndBrands}>
              "Leading Brands" "Explore top golf apparel brands that offer a
              blend of style, comfort, and performance
            </p>
            <NavLink
              className={style.buttonForGoflClubsAndBrands}
              to={`${CATEGORY_ROUTE}/golf-clothing`}
            >
              Shop
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default MainPage;
