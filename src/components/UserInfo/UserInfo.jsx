import React, { useContext } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";

const UserInfo = () => {
  const { user } = useContext(Context);

  return (
    <Container style={{ paddingTop: "63px" }}>
      <h2>Personal information</h2>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0" className="mb-2">
          <Accordion.Header>Personal information</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={4}>
                <p>Last name</p>
                {user.user.last_name}
              </Col>
              <Col md={4}>
                <p>First name</p>
                {user.user.first_name}
              </Col>
              <Col md={4}></Col>
            </Row>
            <Button className="mt-4">Edit</Button>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" className="mb-2">
          <Accordion.Header className="border-top">Contacts</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={3}>
                <p>Mobile phone</p>
              </Col>
              <Col md={3}>
                <p>Email</p>
                {user.user.email}
              </Col>
            </Row>
            <Button className="mt-4">Edit</Button>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2" className="mb-2">
          <Accordion.Header className="border-top">
            Delivery address
          </Accordion.Header>
          <Accordion.Body>
            <Button className="mt-4">Edit</Button>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3" className="mb-2">
          <Accordion.Header className="border-top">Login</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={3}>
                <p>Login (Mobile phone)</p>
              </Col>
              <Col md={3}>
                <p>Login (Email)</p>
                {user.user.email}
              </Col>
            </Row>
            <Button className="mt-4">Edit</Button>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4" className="mb-2">
          <Accordion.Header className="border-top">
            Additional information
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <input id="legal-entity" type="checkbox" className="me-2" />
              <label htmlFor="legal-entity">
                This account is used by a legal entity, company representative
                or private entrepreneur.
              </label>
            </div>
            <Button className="mt-4">Edit</Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default UserInfo;
