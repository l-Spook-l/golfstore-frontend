import React from "react";
import { Alert } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import style from "./CustomAlert.module.css";

const CustomAlert = ({ id, name, onClick }) => {
  return (
    <Alert key={id} variant="light" className="me-1 border text-dark p-2">
      {name}
      <AiOutlineClose
        type="button"
        className={style.btnClose}
        onClick={onClick}
      />
    </Alert>
  );
};

export default CustomAlert;
