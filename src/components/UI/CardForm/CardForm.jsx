import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import style from "./CardForm.module.css"

const CardForm = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='mt-4'>
      <Button className={style.buttonAddCard} variant="primary" onClick={handleShow}>
        Add card
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Card number</Form.Label>
              <Form.Control type="text" placeholder="Введите номер карты" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Expiration date</Form.Label>
              <Form.Control type="text" placeholder="Введите срок действия" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardForm;
