import React, { useContext } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";

const UserInfo = () => {
  const { user } = useContext(Context);

  console.log("uesrewqrwqwqr", user);

  return (
    <Container style={{ paddingTop: "63px" }}>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0" className="mb-2">
          <Accordion.Header>Особисті дані</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={4}>
                <p>Прізвище</p>
                {user.user.last_name}
              </Col>
              <Col md={4}>
                <p>Ім'я</p>
                {user.user.first_name}
              </Col>
              <Col md={4}></Col>
            </Row>
            <Button className="mt-4">Редагувати</Button>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" className="mb-2">
          <Accordion.Header className="border-top">Контакти</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={3}>
                <p>Мобільний телефон</p>
              </Col>
              <Col md={3}>
                <p>Електронна пошта</p>
                {user.user.email}
              </Col>
            </Row>
            <Button className="mt-4">Редагувати</Button>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2" className="mb-2">
          <Accordion.Header className="border-top">
            Адреса доставки
          </Accordion.Header>
          <Accordion.Body>
            <Button className="mt-4">Редагувати</Button>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3" className="mb-2">
          <Accordion.Header className="border-top">Логін</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={3}>
                <p>Лоігн (Мобільний телефон)</p>
              </Col>
              <Col md={3}>
                <p>Логін (Електронна пошта)</p>
                {user.user.email}
              </Col>
            </Row>
            <Button className="mt-4">Редагувати</Button>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4" className="mb-2">
          <Accordion.Header className="border-top">
            Додаткова інформація
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <input id="legal-entity" type="checkbox" className="me-2" />
              <label htmlFor="legal-entity">
                Цей акаунт використовується юридичною особою, представником
                компанії або приватним підприємцем
              </label>
            </div>
            <Button className="mt-4">Редагувати</Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default UserInfo;
