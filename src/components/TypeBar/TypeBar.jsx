import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { Context } from "../../index";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import style from "./TypeBar.module.css";

const TypeBar = observer(() => {
  const { product } = useContext(Context);

  const [show, setShow] = useState(true);

  /*   console.log('selectedType', product.selectedType);
  console.log('selectedType id', product.selectedType.name);
  console.log('selectedType', typeof product.selectedType);
  console.log('product.products TypeBar', product.products);
  console.log('-------------------------------------------------------------'); */
  //console.log('selectedType', product.selectedType, typeof product.selectedType);
  //console.log('types', product.types);
  //console.log('setSelectedType.length', product.selectedType.length)
  //console.log('setSelectedType.length', Object.keys(product.selectedType).length)

  return (
    <Accordion bsPrefix="my-accordion" className="mt-3" defaultActiveKey="0">
      <Accordion.Item className="border-0" eventKey="0">
        <Accordion.Header className="my-3" onClick={() => setShow(!show)}>
          <span className={style.accordionHeader}>Types</span>
          <span className={style.arrow}>
            {show ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </span>
        </Accordion.Header>
        <Accordion.Body>
          {product.types.map((type) => (
            <Form.Check
              key={type.id}
              id={type.id + 100}
              type="checkbox"
              label={type.name}
              checked={product.selectedType.includes(type)}
              onChange={() => product.setSelectedType(type)}
              className={style.checkbox}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <hr />
    </Accordion>
  );
});

export default TypeBar;
