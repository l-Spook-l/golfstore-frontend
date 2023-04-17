import React from "react";
import { Modal } from "react-bootstrap";

const MyModal = ({children, showModal, setShowModal, title}) => {

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
      </Modal>
    </div>
  );
};

export default MyModal;
