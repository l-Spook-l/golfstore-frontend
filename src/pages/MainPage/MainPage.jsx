import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import {
  fetchBrands,
  fetchCategories,
  fetchProducts,
} from "../../http/productAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { BRAND_ROUTE, CATEGORY_ROUTE, PRODUCT_ROUTE } from "../../utils/consts";
import SliderForMainPage from "../../components/Sliders/SliderForMainPage/SliderForMainPage";
import { Card, Container, Image, Row } from "react-bootstrap";
import golf_clothing_photo from "../../assets/golf-clothing-main-page.png";
import golf_brands_photo from "../../assets/golf-brands-main-page.png";
import style from "./MainPage.module.css";

const MainPage = observer(() => {
  const { product } = useContext(Context);
  const navigate = useNavigate(); // для перехода по страницам

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
    fetchProducts(null, null, null, 1, null, null, null).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);
      //console.log('shop - data', data)
      //console.log('shop - data.results', data.results)
    });
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

  return (
    <div style={{ paddingTop: "63px" }}>
      <SliderForMainPage />
      <Container>
        <h2 className={style.sectionTitle}>Categories</h2>
        <div>
          <div className={style.categories}>
            {product.categories.slice(0, countCategoryOnMainPage).map((el) => (
              <button
                key={el.id}
                className={style.buttonCategories}
                onClick={() => navigate(`${CATEGORY_ROUTE}/${el.slug}`)}
              >
                {el.name}
              </button>
            ))}
          </div>
          <div className="mt-3 d-flex justify-content-center">
            {countCategoryOnMainPage < product.categories.length && (
              <button
                className={style.buttonForMore}
                onClick={() => showMoreCategories()}
              >
                More categories
              </button>
            )}
          </div>
        </div>

        <h2 className={style.sectionTitle}>BESTSELLERS</h2>
        <Row className={style.blockBestsellers}>
          {product.products.slice(0, 4).map((el) => (
            <Card className={style.cardProductBestsellers} key={el.id}>
              <NavLink to={`${PRODUCT_ROUTE}/${el.slug}`}>
                <Image
                  width={250}
                  height={250}
                  src={
                    isHovered && activeProduct === el.id && el.photos.length > 1
                      ? el.photos[2]["image"]
                      : el.photos[0]["image"]
                  }
                  onMouseEnter={() => hoverProduct(el.id)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              </NavLink>

              <NavLink 
                className={style.productNamePrice}
                to={`${PRODUCT_ROUTE}/${el.slug}`}
                >
                <div className="">
                  <span>{el.name}</span>
                </div>
                <div className="">
                  <p>{el.price} $</p>
                </div>
              </NavLink>
            </Card>
          ))}
        </Row>

        <h2 className={style.sectionTitle}>Brands</h2>
        <div>
          <div className={style.brands}>
            {product.brands.slice(0, countBrandsOnMainPage).map((el) => (
              <button
                key={el.id}
                className={style.buttonBrands}
                onClick={() => navigate(`${BRAND_ROUTE}/${el.slug}`)}
              >
                {el.name}
              </button>
            ))}
          </div>
          <div className="mt-3 d-flex justify-content-center">
            {countBrandsOnMainPage < product.brands.length && (
              <button
                className={style.buttonForMore}
                onClick={() => showMoreBrands()}
              >
                More brands
              </button>
            )}
          </div>
        </div>

        <div className={style.storeOffers}>
          <div className="d-flex flex-column">
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
              src={golf_brands_photo}
            />
          </div>

          <div className="d-flex flex-column">
            <h3 className="text-center">Exclusive brands</h3>
            <Image
              className={style.imageForGoflClubsAndBrands}
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
          </div>
        </div>
      </Container>
    </div>
  );
});

export default MainPage;
