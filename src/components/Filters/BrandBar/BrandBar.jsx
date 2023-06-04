import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../../../index";
import { Accordion } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import style from "./BrandBar.module.css";

const BrandBar = observer(() => {
  const { product } = useContext(Context);

  const [show, setShow] = useState(true);

  return (
    <Accordion bsPrefix="my-accordion" className="mt-3" defaultActiveKey="0">
      <Accordion.Item className="border-0" eventKey="0">
        <Accordion.Header className="my-3" onClick={() => setShow(!show)}>
          <span className={style.accordionHeader}>Brands</span>
          <span className={style.arrow}>
            {show ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </span>
        </Accordion.Header>
        <Accordion.Body className="">
          {product.brands.map((brand) => 
            <div key={brand.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input me-3 "
                checked={product.selectedBrand.includes(brand)}
                onChange={() => product.setSelectedBrand(brand)}
              />
              <label
                className="form-check-label"
                style={{ cursor: "pointer" }}
                onClick={() => product.setSelectedBrand(brand)}
              >
                {brand.name}
              </label>
            </div>
          )}
        </Accordion.Body>
      </Accordion.Item>
      <hr />
    </Accordion>
  );
});

export default BrandBar;
