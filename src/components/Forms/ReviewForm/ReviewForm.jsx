import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ReviewForm = ({ show, onHide, onSubmit, state, oldComment }) => {
  const [comment, setComment] = useState(oldComment !== undefined ? oldComment : '');

  const handleSubmit = () => {
    onSubmit(comment);
    setComment('');
    onHide();
  };

  return (
    <Modal size="lg" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{state}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="comment">
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {state}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewForm;
