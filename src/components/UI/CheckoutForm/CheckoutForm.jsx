import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const CheckoutForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h3>Checkout Form</h3>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control required type="text" placeholder="First name" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid first name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control required type="text" placeholder="Last name" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid last name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="2" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom04">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Country" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Country.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="Email" placeholder="Email" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid last name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Phone</Form.Label>
          <Form.Control required type="text" placeholder="Phone" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Phone.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
    </Form>
  );
};

export default CheckoutForm;
