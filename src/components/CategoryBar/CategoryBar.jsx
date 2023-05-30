import React, { useContext, useState } from "react";
import { Context } from "../..";
import { Accordion, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import style from "./CategoryBar.module.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const CategoryBar = observer(() => {
  const { product } = useContext(Context);

  const [show, setShow] = useState(true);

  const testClick = (category) => {
    product.selectedCategory.includes(category)
  }

  return (
    <Accordion bsPrefix="my-accordion" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="my-3" onClick={() => setShow(!show)}>
          <span className={style.accordionHeader}>Categories</span>
          <span className={style.arrow}>
            {show ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </span>
        </Accordion.Header>
        <Accordion.Body>
          {product.categories.map((category) => (
            <Form.Check
              key={category.id}
              id={category.id + 200}
              type="checkbox"
              label={category.name}
              checked={testClick(category)}
              onChange={() => product.setSelectedCategory(category)}
              className={style.checkbox}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <hr />
    </Accordion>
  );
});

export default CategoryBar;
