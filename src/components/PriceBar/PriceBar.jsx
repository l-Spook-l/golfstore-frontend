import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Context } from "../..";
import style from "./PriceBar.module.css";

const PriceBar = observer(() => {
  const { product } = useContext(Context);

  const changeMinPrice = (e) => {
    product.setPriceMin(e.target.value);
  };

  const changeMaxPrice = (e) => {
    product.setPriceMax(e.target.value);
  };

  return (
    <Form>
      <Form.Label>Price Range:</Form.Label>
      <div className="d-flex justify-content-between align-items-center">
        <Form.Control
          type="number"
          min={product.priceMin}
          max={product.priceMax}
          value={product.priceMin}
          onChange={changeMinPrice}
          className={style.customNumberInput}
        />  $
        <Form.Control
          type="number"
          min={product.priceMin}
          max={product.priceMax}
          value={product.priceMax}
          onChange={changeMaxPrice}
          className={style.customNumberInput}
        />$
      </div>
      <hr />
    </Form>
  );
});

export default PriceBar;
