import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Context } from "..";

const PriceBar = observer(() => {
  const { product } = useContext(Context);

  const prices = product.products.map((item) => item.price)
  console.log('ProceBar price', prices)
  const minPrice = prices.reduce((min, price) => (price < min ? price : min), prices[0]);
  const maxPrice = prices.reduce((max, price) => (price > max ? price : max), prices[0]);
  console.log('ProceBar minPrice', minPrice)
  console.log('ProceBar maxPrice', maxPrice)

  product.setPriceMin(minPrice)
  product.setPriceMax(maxPrice)

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
