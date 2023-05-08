import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Subscribes = () => {
  return (
    <Container style={{paddingTop: '63px'}}>
      <Row>
        <Col md={6}>Види розсилок</Col>
        <Col md={6}>Канали зв'язку</Col>
      </Row>
      <div>Subscribes</div>
    </Container>
  );
};

export default Subscribes;
