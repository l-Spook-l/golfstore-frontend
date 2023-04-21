import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { Accordion, Button, Card, Col, Form, Row } from "react-bootstrap";

const BrandBar = observer(() => {
  const { product } = useContext(Context);
  // console.log('selectedBrand', product.selectedBrand);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    /*     <Row>
      <Col className="" style={{ height: 40 }}>
        {product.brands.map((brand) => (
          <Card
            key={brand.id}
            className="p-2 m-1 "
            style={{ cursor: "pointer" }}
            onClick={() => product.setSelectedBrand(brand)}
            border={product.selectedBrand.includes(brand) ? "danger" : "light"}
          >
            <div className="d-flex">
              <Form.Check
                type="checkbox"
                className="me-3"
                checked={product.selectedBrand.includes(brand)} // Определение, должен ли быть флажок отмечен или нет
                onChange={() => product.setSelectedBrand(brand)} // Обработчик событий onChange для обновления состояния выбранных брендов
              />
              {brand.name}
            </div>
          </Card>
        ))}
      </Col>
    </Row> */

  
    <Accordion className="mt-3" defaultActiveKey="0">
      <Accordion.Item  className="border-0" eventKey="0">
        <Accordion.Header>Brands</Accordion.Header>
        <Accordion.Body className="">
          {product.brands.map((brand) => (
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
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
});

export default BrandBar;
