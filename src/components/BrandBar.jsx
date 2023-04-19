import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Card, Col, Form, Row } from "react-bootstrap";

const BrandBar = observer(() => {
  const { product } = useContext(Context);
  // console.log('selectedBrand', product.selectedBrand);

  return (
    <Row>
      <Col className="d-flex flex-wrap" style={{ height: 40 }}>
        {product.brands.map((brand) => (
          <Card
            key={brand.id}
            className="p-2 m-1"
            style={{ cursor: "pointer" }}
            onClick={() => product.setSelectedBrand(brand)}
            border={product.selectedBrand.includes(brand) ? "danger" : "light"}
          >
            <Form.Check
              type="checkbox"
              checked={product.selectedBrand.includes(brand)} // Определение, должен ли быть флажок отмечен или нет
              onChange={() => product.setSelectedBrand(brand)} // Обработчик событий onChange для обновления состояния выбранных брендов
            />
            {brand.name}
          </Card>
        ))}
      </Col>
    </Row>
  );
});

export default BrandBar;
