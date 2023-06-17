import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneCategory, fetchProductsByCategory } from "../../http/productAPI";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import Paginations from "../../components/Paginations/Paginations";
import ProductList from "../../components/ProdcutList/ProductList";
import { MAIN_ROUTE } from "../../utils/consts";
import style from "./CategoryPage.module.css";
import MyOffcanvas from "../../components/MyOffcanvasFilters/MyOffcanvasFilters";
import PriceBar from "../../components/Filters/PriceBar/PriceBar";
import TypeBar from "../../components/Filters/TypeBar/TypeBar";
import BrandBar from "../../components/Filters/BrandBar/BrandBar";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const CategoryPage = observer(() => {
  const { user } = useContext(Context);
  const { product } = useContext(Context);

  const { slug } = useParams();

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    product.setPage(1)
    product.setSelectedType("clear");
    product.setSelectedBrand("clear");
    product.setSelectedCategory("clear");
    product.setOrdering('')
    fetchOneCategory(slug).then((data) => {
      product.setTypes(data.type);
      product.setBrands(data.brand);
    })
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductsByCategory(
      slug,
      product.selectedType.map((el) => el.slug).join(", "),
      product.selectedBrand.map((el) => el.slug).join(", "),
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
    product.page,
    product.priceMin,
    product.priceMax,
    product.ordering,
    slug,
    user.wishList.product,
  ]);

  const clearFilter = () => {
    product.setSelectedType("clear");
    product.setSelectedBrand("clear");
  };

  const category = slug
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
        <Breadcrumb.Item active>{category}</Breadcrumb.Item>
      </Breadcrumb>
      <button className={style.filterButton} onClick={handleOpen}>
        Filters
      </button>
      <Row className="mt-3">
        <Col md={10} className="d-flex flex-wrap mb-0 ">
          {product.selectedType.length !== 0 ||
          product.selectedBrand.length !== 0 ? (
            <Button className={style.clearButton} onClick={() => clearFilter()}>
              Clear
            </Button>
          ) : null}
          {product.selectedType.map((el) => (
            <CustomAlert
              key={el.id}
              id={el.id}
              name={el.name}
              onClick={() => product.setSelectedType(el)}
            />
          ))}
          {product.selectedBrand.map((el) => (
            <CustomAlert
              key={el.id}
              id={el.id}
              name={el.name}
              onClick={() => product.setSelectedBrand(el)}
            />
          ))}
        </Col>

        <Col md={2} className="d-flex flex-wrap align-items-end">
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
          <PriceBar />
          <TypeBar />
          <BrandBar />
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

export default CategoryPage;
