import React from "react";
import { Alert, Button } from "react-bootstrap";

const CustomAlert = ({ id, name, onClick }) => {
  return (
    <Alert key={id} variant="light" className="me-1 border text-dark p-2">
      {name}
      <Button
        type="button"
        className="ms-1 btn-close"
        style={{ fontSize: 12 }}
        aria-label="Close"
        onClick={onClick}
      ></Button>
    </Alert>
  );
};

export default CustomAlert;
