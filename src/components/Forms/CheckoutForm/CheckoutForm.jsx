import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const CheckoutForm = ( onFormSubmit ) => {
  const [validated, setValidated] = useState(false);
  const [confirm, setConfirm] = useState(false)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");

  const submitFormData = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formData = {
        firstName,
        lastName,
        city,
        country,
        address,
        email,
        phone,
        zip,
      };
      setConfirm(true)
      onFormSubmit.onFormSubmit(formData);
    }
    setValidated(true); 
  };

  const firstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const cityChange = (event) => {
    setCity(event.target.value);
  };

  const countryChange = (event) => {
    setCountry(event.target.value);
  };

  const addressChange = (event) => {
    setAddress(event.target.value);
  };

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const phoneChange = (event) => {
    setPhone(event.target.value);
  };

  const zipChange = (event) => {
    setZip(event.target.value);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={submitFormData}
      className="mt-3"
    >
      <h3>Checkout Form</h3>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={firstNameChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid first name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={lastNameChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid last name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="2" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            required
            value={city}
            onChange={cityChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom04">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            required
            value={country}
            onChange={countryChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Country.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Address"
            value={address}
            onChange={addressChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid address.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="Email"
            placeholder="Email"
            value={email}
            onChange={emailChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid last name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom01">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={phoneChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Phone.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="Zip"
            required
            value={zip}
            onChange={zipChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
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
      {confirm  
      ? <Button className="mt-3" disabled variant="success" type="submit">Data confirmed</Button>
      : <Button className="mt-3" type="submit">Сonfirm entered data</Button>
      }
    </Form>
  );
};

export default CheckoutForm;
