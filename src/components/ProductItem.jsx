import React from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { BASKET_ROUTE, PRODUCT_ROUTE } from "../utils/consts";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ProductItem = ({ product }) => {
  const navigate = useNavigate(); // для перехода по страницам

  return (
    <Col md={3} className="mt-3">
      <Card style={{ width: 150 }} border="light">
        <Image
          onClick={() => navigate(`${PRODUCT_ROUTE}/${product.slug}`)}
          width={150}
          height={150}
          src={product.photo}
        />
        <div onClick={() => navigate(`${PRODUCT_ROUTE}/${product.slug}`)}>
          {product.name}
        </div>
        <div className="mt-1 d-flex justify-content-between align-items-center">
          <div>{product.price}</div>
          <NavLink
            style={{ fontSize: "1.3rem", color: "black" }}
            to={BASKET_ROUTE}
          >
            <AiOutlineShoppingCart />
          </NavLink>
        </div>
      </Card>
    </Col>
  );
};

export default ProductItem;
