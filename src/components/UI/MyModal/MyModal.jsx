import React from "react";
import { Button, Modal } from "react-bootstrap";

const MyModal = ({ showModal, setShowModal, title, children}) => {

  const modalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal show={showModal} onHide={modalClose}>
        {/* Заголовок в окне (closeButton -добавляет крестик для закрытия)*/}
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={modalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyModal;
