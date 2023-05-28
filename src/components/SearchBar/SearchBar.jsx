import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { Dropdown, Form, Image } from "react-bootstrap";
import style from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { fetchProducts } from "../../http/productAPI";
import { AiOutlineClose } from "react-icons/ai";

const SearchBar = observer(() => {
  const { product } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts( null, null, null, 1, null, null, null, product.selectedSearchProducts)
    .then((data) => {
      product.setSearchProducts(data.results);
      console.log("useEffect SearchBar", data);
    }); //.finally(() => setLoading(false));
  }, [product.selectedSearchProducts]);

  const clearSearch = () => {
    product.setSelectedSearchProducts("");
  };

  return (
    <Dropdown className="me-4">
      <Dropdown.Toggle bsPrefix="my-dropdown-toggle" className={style.myDropdownToggle}>
        <div className="d-flex" >
          <Form.Control
            type="text"
            className={style.myInput}
            placeholder="Enter the product name"
            value={product.selectedSearchProducts}
            onChange={(e) => product.setSelectedSearchProducts(e.target.value)}
          />
          {product.selectedSearchProducts.length > 0 && (
            <div className={style.clearSearch} onClick={() => clearSearch()}>
              <AiOutlineClose />
            </div>
          )}
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className={style.dropdownMenu}>
        {product.searchProducts.length !== 0 ? (
          product.searchProducts.length > 4 ? (
            product.searchProducts.map((productItem) => (
              <Dropdown.Item
                key={productItem.id}
                className={style.dropdownItem}
                onClick={() => navigate(`${PRODUCT_ROUTE}/${productItem.slug}`)}
              >
                <div>
                  <Image
                    className={style.image}
                    src={productItem.photos[0]["image"]}
                  />
                  {productItem.name}
                </div>
              </Dropdown.Item>
            ))
          ) : (
            product.searchProducts
              .slice(0, product.searchProducts.length)
              .map((productItem) => (
                <Dropdown.Item
                  key={productItem.id}
                  onClick={() =>
                    navigate(`${PRODUCT_ROUTE}/${productItem.slug}`)
                  }
                >
                  <div>
                    <Image
                      className={style.image}
                      src={productItem.photos[0]["image"]}
                    />
                    {productItem.name}
                  </div>
                </Dropdown.Item>
              ))
          )
        ) : (
          <div className="p-1">
            No results found for your query. Please refine your search
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default SearchBar;
