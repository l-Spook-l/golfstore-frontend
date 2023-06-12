import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { fetchOneBrand, fetchProductsByBrand } from "../../http/productAPI";
import { Context } from "../..";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import ProductList from "../../components/ProdcutList/ProductList";
import Paginations from "../../components/Paginations/Paginations";
import { MAIN_ROUTE } from "../../utils/consts";
import style from "./BrandPage.module.css";
import MyOffcanvas from "../../components/MyOffcanvasFilters/MyOffcanvasFilters";
import CategoryBar from "../../components/Filters/CategoryBar/CategoryBar";
import PriceBar from "../../components/Filters/PriceBar/PriceBar";
import TypeBar from "../../components/Filters/TypeBar/TypeBar";

const BrandPage = observer(() => {
  const { user } = useContext(Context);
  const { product } = useContext(Context);

  const { slug } = useParams();

  const navigate = useNavigate();
  
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // первое получение типов, брєндов, продуктов
  useEffect(() => {
    console.log('111111111111111111111111111111111111111')
    window.scrollTo(0, 0);
    product.setPage(1)
    product.setSelectedType("clear");
    product.setSelectedBrand("clear");
    product.setSelectedCategory("clear");
    product.setOrdering('')
    fetchOneBrand(slug).then((data) => {
      product.setTypes(data.type);
      product.setCategories(data.categories);
      //console.log("brandPage - fetchOneBrand - data", data);
    });
  }, [slug]);

  useEffect(() => {
    console.log('22222222222222222222222222222222222')

    fetchProductsByBrand(
      slug,
      product.selectedType.map((el) => el.slug).join(", "),
      product.selectedCategory.map((el) => el.slug).join(", "),
      product.page,
      product.priceMin,
      product.priceMax,
      product.ordering
    ).then((data) => {
      product.setProducts(data.results);
      product.setTotalCount(data.count);

      /* console.log('brand page - data', data)
      console.log('brand page - data results', data.results)
      console.log('brand page - product ', product)
      console.log('brand page - product types', product.types)
      console.log('brand page - product categories', product.categories)
      console.log('brand page - product selectedType', product.selectedType) */
    });
  }, [
    product.selectedType,
    product.selectedCategory,
    product.page,
    product.priceMin,
    product.priceMax,
    product.ordering,
    slug,
    user.wishList.product,
  ]);

  const clearFilter = () => {
    product.setSelectedType("clear");
    product.setSelectedCategory("clear");
  };
  //console.log('category', category)
  //console.log('category results', category.results[0].name)
  //console.log("brand page - product", product);
  //console.log('brand page - product selectedType', product.selectedType)
  //console.log('brand page - product brands', product.brands)
  //console.log('brand page - product types', product.types)
  console.log('brand page - product.ordering', product.ordering)

  const brand = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleClose = () => {
    setShowOffcanvas(false);
  };

  const handleOpen = () => {
    setShowOffcanvas(true);
  };

  return (
    <Container className={style.forContainer}>
      <Breadcrumb className="mt-2">
        <Breadcrumb.Item onClick={() => navigate(MAIN_ROUTE)}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{brand}</Breadcrumb.Item>
      </Breadcrumb>
      <button className={style.filterButton} onClick={handleOpen}>
        Filters
      </button>
      <Row className="mt-3">
        <Col md={10} className="d-flex flex-wrap mb-0 ">
          {product.selectedType.length !== 0 ||
          product.selectedCategory.length !== 0 ? (
            <Button className={style.clearButton} onClick={() => clearFilter()}>
              Clear
            </Button>
          ) : null}
          {product.selectedCategory.map((el) => (
            <Alert
              key={el.id}
              variant="light"
              className="me-1 border text-dark p-2"
            >
              {el.name}
              <Button
                type="button"
                className="ms-1 btn-close"
                style={{ fontSize: 12 }}
                aria-label="Close"
                onClick={() => product.setSelectedCategory(el)}
              ></Button>
            </Alert>
          ))}
          {product.selectedType.map((el) => (
            <Alert
              key={el.id}
              variant="light"
              className="me-1 border text-dark p-2"
            >
              {el.name}
              <Button
                type="button"
                className="ms-1 btn-close"
                style={{ fontSize: 12 }}
                aria-label="Close"
                onClick={() => product.setSelectedType(el)}
              ></Button>
            </Alert>
          ))}
        </Col>

        <Col md={2} className="d-flex flex-wrap align-items-end">
          {/* Сортировка по убыванию и возрастанию цены, дате создания */}
          <Form.Select
            className="mt-4"
            onChange={(e) => product.setOrdering(e.target.value)}
            value={product.ordering}
          >
            <option value="">Sorted by</option>
            <option value="-time_create">New Arrivals</option>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
          </Form.Select>
        </Col>
      </Row>
      <hr />
      <div className={style.shopMainBlock}>
        <div className={style.filters}>
          <CategoryBar />
          <PriceBar />
          <TypeBar />
        </div>
        <div className={style.productSection}>
          <ProductList />
          <Paginations />
        </div>
      </div>
      <MyOffcanvas
        showOffcanvas={showOffcanvas}
        setShowOffcanvas={handleClose}
      />
    </Container>
  );
});

export default BrandPage;
