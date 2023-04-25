import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Context } from "..";

const PriceBar = observer(() => {
  const { product } = useContext(Context);

  const changeMinPrice = (e) => {
    product.setPriceMin(e.target.value)
  };

  const changeMaxPrice = (e) => {
    product.setPriceMax(e.target.value)
  };


  return (
    <div>

      <Form.Label>Price Range:</Form.Label>

      <div className="d-flex justify-content-between align-items-center">
        <Form.Control
          type="number"
          defaultValue={product.priceMin}
          min={product.priceMin}
          max={product.priceMax}
          value={product.priceMin}
          onChange={changeMinPrice}
          style={{ width: '45%' }}
        />

        <Form.Control
          type="number"
          defaultValue={product.priceMax}
          min={product.priceMin}
          max={product.priceMax}
          value={product.priceMax}
          onChange={changeMaxPrice}
          style={{ width: '45%' }}
        />
      </div> 
    </div>
  );
});

export default PriceBar;
