import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from "./Subscribes.module.css";

const Subscribes = () => {
  return (
    <Container style={{ paddingTop: "63px" }}>
      <h2>Розсилки</h2>
      <Row className={style.row}>
        <Col md={6}>
          <h3 className={style.h3}>Види розсилок</h3>
          <p>
            <input className={style.input} id="legal-entity-1" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-1">Опитування</label>
          </p>
          <p>
            <input className={style.input} id="legal-entity-2" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-2">Новини</label>
          </p>
        </Col>

        <Col md={6}>
          <h3 className={style.h3}>Канали зв'язку</h3>
          <p>
            <input className={style.input} id="legal-entity-3" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-3">Email-листи</label>
          </p>
          <p>
            <input className={style.input} id="legal-entity-4" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-4">Повідомлення у Viber</label>
          </p>
          <p>
            <input className={style.input} id="legal-entity-5" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-5">SMS-повідомлення</label>
          </p>
          <p>
            <input className={style.input} id="legal-entity-6" type="checkbox" />
            <label className={style.lable} htmlFor="legal-entity-6">
              Сповіщення у мобільному додатку
            </label>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Subscribes;
