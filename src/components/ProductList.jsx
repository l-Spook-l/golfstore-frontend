import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import ProductItem from "./ProductItem/ProductItem";

const ProductList = observer(() => {
  const { product } = useContext(Context);
  // console.log('product list ,product.products', product.products)
  return (
    <Row className="">
      {product.products.map((el) => (
        <ProductItem key={el.id} product={el} />
      ))}
    </Row>
  );
});

export default ProductList;
