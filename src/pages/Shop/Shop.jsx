import React, { useContext, useEffect, useState } from "react";
import { Alert, Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import ProductList from "../../components/ProdcutList/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { fetchBrands, fetchProducts, fetchTypes, fetchCategories } from "../../http/productAPI";
import Paginations from "../../components/Paginations/Paginations";
import style from "./Shop.module.css";
import { MAIN_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import MyOffcanvasFilters from "../../components/MyOffcanvasFilters/MyOffcanvasFilters";
import CategoryBar from "../../components/Filters/CategoryBar/CategoryBar";
import PriceBar from "../../components/Filters/PriceBar/PriceBar";
import TypeBar from "../../components/Filters/TypeBar/TypeBar";
import BrandBar from "../../components/Filters/BrandBar/BrandBar";

const Shop = observer(() => {
  const { product } = useContext(Context);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    product.setPage(1)
    product.setSelectedType("clear");
    product.setSelectedBrand("clear");
    product.setSelectedCategory("clear");
    product.setOrdering('')
    fetchTypes().then((data) => product.setTypes(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchCategories()
      .then((data) => product.setCategories(data))
  }, []);

  useEffect(() => {
    fetchProducts(
      product.selectedType.map((el) => el.slug).join(", "),
      product.selectedBrand.map((el) => el.slug).join(", "),
      product.selectedCategory.map((el) => el.slug).join(", "),
      product.page,
      product.priceMin,
      product.priceMax,
      product.ordering
    )
      .then((data) => {
        product.setProducts(data.results);
        product.setTotalCount(data.count);
      })
  }, [
    product.selectedType,
    product.selectedBrand,
    product.selectedCategory,
    product.page,
    product.priceMin,
    product.priceMax,
    product.ordering,
  ]);

  const clearFilter = () => {
    product.setSelectedType("clear");
    product.setSelectedBrand("clear");
    product.setSelectedCategory("clear");
    product.setPriceMin(0);
    product.setPriceMax(10000);
  };

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
        <Breadcrumb.Item active>Shop All</Breadcrumb.Item>
      </Breadcrumb>
      <button className={style.filterButton} onClick={handleOpen}>
        Filters
      </button>
      <Row className="mt-3">
        <Col md={10} className="d-flex flex-wrap mb-0 ">
          {product.selectedType.length !== 0 ||
          product.selectedBrand.length !== 0 ||
          product.selectedCategory.length !== 0 ? (
            <button className={style.clearButton} onClick={() => clearFilter()}>
              Clear
            </button>
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

          {product.selectedBrand.map((el) => (
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
                onClick={() => product.setSelectedBrand(el)}
              ></Button>
            </Alert>
          ))}
        </Col>

        <Col md={2} className="d-flex flex-wrap align-items-end">
          <Form.Select
            className="mt-4"
            onChange={(e) => product.setOrdering(e.target.value)}
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
          <BrandBar />
        </div>
        <div className={style.productSection}>
          <ProductList />
          <Paginations />
        </div>
      </div>
      <MyOffcanvasFilters
        showOffcanvas={showOffcanvas}
        setShowOffcanvas={handleClose}
      />
    </Container>
  );
});

export default Shop;
