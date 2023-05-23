import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from "./Subscribes.module.css";

const Subscribes = () => {
  return (
    <Container className={style.forContainer}>
      <h2>Subscriptions</h2>
      <Row className={style.row}>
        <Col md={6}>
          <h3 className={style.h3}>Subscription Types</h3>
          <p>
            <input className={style.input} id="legal-entity-1" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-1">Polls</label>
          </p>
          <p>
            <input className={style.input} id="legal-entity-2" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-2">News</label>
          </p>
        </Col>

        <Col md={6}>
          <h3 className={style.h3}>Communication Channels</h3>
          <p>
            <input className={style.input} id="legal-entity-3" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-3">Email</label>
          </p>
          <p>
            <input className={style.input} id="legal-entity-4" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-4">Viber Messages</label>
          </p>
          <p>
            <input className={style.input} id="legal-entity-5" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-5">SMS Messages</label>
          </p>
          <p>
            <input className={style.input} id="legal-entity-6" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-6">Push Notifications</label>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Subscribes;
