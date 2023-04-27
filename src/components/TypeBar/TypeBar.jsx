import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import {
  Accordion,
  AccordionButton,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Context } from "../../index";

const TypeBar = observer(() => {
  const { product } = useContext(Context);
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
    /*     <ListGroup>
      <ListGroupItem
        style={{ cursor: "pointer" }}
        active={product.setSelectedType.length === 0}
        onClick={() => product.setSelectedType([])}
      >
        All
      </ListGroupItem>
      {product.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={product.selectedType.includes(type)}
          key={type.id}
          onClick={() => product.setSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup> */
    <Accordion className="mt-3" defaultActiveKey="0">
      <Accordion.Item className="border-0" eventKey="0">
        <Accordion.Header>Types</Accordion.Header>
        <Accordion.Body className="">
          <ListGroup>
            {product.types.map((type) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
               // action // выделяет и подвечивает когда наводишь
                active={product.selectedType.includes(type)}
                key={type.id}
                onClick={() => product.setSelectedType(type)}
              >
                {type.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
});

export default TypeBar;
