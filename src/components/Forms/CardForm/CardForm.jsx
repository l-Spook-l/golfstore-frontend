import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./CardForm.module.css";

const CardForm = ({ card }) => {
  const [show, setShow] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  const handleClose = () => setShow(false);

  const addOrChangeCardNumber = () => {
    card(cardNumber);
  }
  
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    console.log('value name', value, name)
    const isValid = /^[0-9\s]+$/.test(value);
    if (value.length > 0 && isValid) {
      // Удаляем все нечисловые символы из ввода
      const numericValue = value.replace(/\D/g, "");
      // Разделяем номер карты на блоки по 4 цифры
      const formattedValue = numericValue.match(/.{1,4}/g).join(" ").trim();
      setCardNumber(formattedValue);
    } else if (value.length === 0){
      setCardNumber('')
    }
  };

  console.log("cardNumber",cardNumber)

  return (
    <div className="mt-4">
      <Button
        className={style.buttonAddCard}
        variant="primary"
        onClick={handleShow}
      >
        Add card
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={style.formCard}>
            <div>
              <label htmlFor="card-number">Card Number:</label>
              <input
                type="text"
                className={style.fieldForCard}
                name="cardNumber"
                value={cardNumber}
                maxLength="19" // Длина включает пробелы (4 блока по 4 цифры и 3 пробела)
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={cardNumber.length !== 19} variant="primary" onClick={addOrChangeCardNumber}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardForm;
