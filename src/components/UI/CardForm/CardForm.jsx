import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import style from "./CardForm.module.css"

const CardForm = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className={style.buttonAddCard} variant="primary" onClick={handleShow}>
        Добавить карту
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавление карты</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Номер карты</Form.Label>
              <Form.Control type="text" placeholder="Введите номер карты" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Срок действия</Form.Label>
              <Form.Control type="text" placeholder="Введите срок действия" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardForm;
