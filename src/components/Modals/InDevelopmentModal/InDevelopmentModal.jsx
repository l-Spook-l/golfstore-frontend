import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const InDevelopmentModal = ({ show, closeModal }) => {
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>This feature is under development.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Unfortunately, this function is not ready for use yet.</p>
        <p>
          We are working on implementing it and will add it to the application
          soon.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InDevelopmentModal;
