/* import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import { Accordion, Dropdown, Form } from "react-bootstrap";
import style from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";

const SearchBar = observer(({ onSearch }) => {
  const { product } = useContext(Context);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);


  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className="me-5" bsPrefix="my-dropdown"  id="products-dropdown">
          <Form.Control
            type="text"
            className={style.myForm}
            placeholder="Введите название товара"
            value={product.searchProducts}
            onChange={(e) => product.setSearchProducts(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                // Выполнить действие по нажатию кнопки Enter
                console.log('Нажата кнопка Enter');
                // Добавьте здесь код для выполнения желаемого действия
              }}}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {product.products.map((productItem) => (
            <Dropdown.Item key={productItem.id} onClick={() => navigate(`${PRODUCT_ROUTE}/${productItem}`)}>
              {productItem.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
});

export default SearchBar;



 */



import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import { Dropdown, Form, Image } from "react-bootstrap";
import style from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";

const SearchBar = observer(() => {
  const { product } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          className="me-5"
          bsPrefix="my-dropdown"
          id="products-dropdown"
        >
          <Form.Control
            type="text"
            className={style.myForm}
            placeholder="Введите название товара"
            value={product.searchProducts}
            onChange={(e) => product.setSearchProducts(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                // Выполнить действие по нажатию кнопки Enter
                console.log("Нажата кнопка Enter");
                // Добавьте здесь код для выполнения желаемого действия
              }
            }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
        {product.products.length !== 0 
        ? product.products.length > 4 
          ? product.products.slice(0, 4).map((productItem) => (
            <Dropdown.Item
              key={productItem.id}
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
          : product.products.slice(0, product.products.length).map((productItem) => (
            <Dropdown.Item
              key={productItem.id}
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
        : <div>Нету ааа</div>
        }
          
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
});

export default SearchBar;





