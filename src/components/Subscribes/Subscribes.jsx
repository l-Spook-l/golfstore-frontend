import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Subscribes = () => {
  return (
    <Container style={{ paddingTop: "63px" }}>
      <h1>Розсилки</h1>
      <Row>
        <Col md={6}>
          Види розсилок
          <p>
            <input id="legal-entity" type="checkbox" className="me-2" />
            <label htmlFor="legal-entity">Опитування</label>
          </p>
          <p>
            <input id="legal-entity" type="checkbox" className="me-2" />
            <label htmlFor="legal-entity">Новини Rozetka</label>
          </p>
        </Col>

        <Col md={6}>
          Канали зв'язку
          <p>
            <input id="legal-entity" type="checkbox" className="me-2" />
            <label htmlFor="legal-entity">Email-листи</label>
          </p>
          <p>
            <input id="legal-entity" type="checkbox" className="me-2" />
            <label htmlFor="legal-entity">Повідомлення у Viber</label>
          </p>
          <p>
            <input id="legal-entity" type="checkbox" className="me-2" />
            <label htmlFor="legal-entity">SMS-повідомлення</label>
          </p>
          <p>
            <input id="legal-entity" type="checkbox" className="me-2" />
            <label htmlFor="legal-entity">
              Сповіщення у мобільному додатку
            </label>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Subscribes;
