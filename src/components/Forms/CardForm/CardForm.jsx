import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import style from "./CardForm.module.css"
import InDevelopmentModal from '../../Modals/InDevelopmentModal/InDevelopmentModal';

const CardForm = () => {
  const [show, setShow] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);

  const handleClose = () => {
    setShow(false)
    setShowDevModal(true)
  };
  const handleShow = () => setShow(true);

  const closeDevModal = () => setShowDevModal(false);

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
              <Form.Control type="text" placeholder="Enter card number" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Expiration date</Form.Label>
              <Form.Control type="text" placeholder="Enter expiration date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <InDevelopmentModal show={showDevModal} closeModal={closeDevModal}/>
    </div>
  );
};

export default CardForm;
