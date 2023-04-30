import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { PRODUCT_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();  // для перехода по страницам

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border="light">
        <Image width={150} height={150} src={product.photo} />
        <div>{product.name}</div>
        <div className="mt-1 d-flex justify-content-between align-items-center">
        <div>{product.price}</div>
          <div className="d-flex align-items-center">
            {/* <Image width={18} height={18} src={star} /> */}
            <Image width={18} height={18} style={{ backgroundColor: "blue" }} />
          </div>
        </div>
        
      </Card>
    </Col>
  );
};

export default ProductItem;
