import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../index";
import ProductItem from "../ProductItem/ProductItem";
import style from "./ProductList.module.css"

const ProductList = observer(() => {
  const { product } = useContext(Context);

  return (
    <div className={style.myContainer}>
      {product.products.map((el) => (
        <ProductItem key={el.id} product={el} />
      ))}
    </div>
  );
});

export default ProductList;
