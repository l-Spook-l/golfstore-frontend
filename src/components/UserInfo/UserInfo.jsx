import React, { useContext, useState } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";
import InDevelopmentModal from "../Modals/InDevelopmentModal/InDevelopmentModal";
import style from "./UserInfo.module.css"
import {  updateUserEmail, updateUserFirstName, updateUserLastName, updateUserPhoneNumber } from "../../http/userAPI";
import { observer } from "mobx-react-lite";

const UserInfo = observer(() => {
  const { user } = useContext(Context);

  const [showModal, setShowModal] = useState(false);
  const [editFirstLastName, setEditFirstLastName] = useState(false);
  const [editPhoneNumberEmail, setEditPhoneNumberEmail] = useState(false);
  const [editLogin, setEditLogin] = useState(false)

  const closeModal = () => setShowModal(false);

  const updateFirstLastName = (firstName, lastName) => {
    updateUserFirstName(firstName)
    updateUserLastName(lastName)
    setEditFirstLastName(false)
  }

  const updatePhoneNumberEmail = (phoneNumber, email) => {
    updateUserPhoneNumber(phoneNumber)
    updateUserEmail(email)
    setEditPhoneNumberEmail(false)
  }

  const updateUserLogin = (email) => {
    updateUserEmail(email)
    setEditLogin(false)
  }

  const updateUserCardNumber = (cardNumber) => {
  }
  

  return (
    <Container className={style.forContainer}>
      <h2>Personal information</h2>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0" className="mb-2">
          <Accordion.Header>Personal information</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={4}>
                <p>Last name</p>
                {user.user.last_name}
              </Col>
              <Col md={4}>
                <p>First name</p>
                {user.user.first_name}
              </Col>
              <Col md={4}></Col>
            </Row>
            {editFirstLastName 
            ? <div>
              <Button onClick={() => updateFirstLastName('true')} className="mt-4 bg-success">Save</Button>
              <Button onClick={() => setEditFirstLastName(false)} className="mt-4 bg-success">Cancel</Button>
            </div>
            : <Button onClick={() => setEditFirstLastName(true)} className="mt-4 bg-success">Edit</Button>
            }
            
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" className="mb-2">
          <Accordion.Header className="border-top">Contacts</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={3}>
                <p>Mobile phone</p>
                {user.user.phone_number}
              </Col>
              <Col md={3}>
                <p>Email</p>
                {user.user.email}
              </Col>
            </Row>
            {editPhoneNumberEmail 
            ? <div>
              <Button onClick={() => updatePhoneNumberEmail('true')} className="mt-4 bg-success">Save</Button>
              <Button onClick={() => setEditPhoneNumberEmail(false)} className="mt-4 bg-success">Cancel</Button>
            </div>
            : <Button onClick={() => setEditPhoneNumberEmail(true)} className="mt-4 bg-success">Edit</Button>
            }
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2" className="mb-2">
          <Accordion.Header className="border-top">
            Delivery address
          </Accordion.Header>
          <Accordion.Body>
            <Button onClick={() => setShowModal(true)} className="mt-4 bg-success">Edit</Button>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3" className="mb-2">
          <Accordion.Header className="border-top">Login</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={3}>
                <p>Login (Email)</p>
                {user.user.email}
              </Col>
            </Row>
            {editLogin 
            ? <div>
              <Button onClick={() => updateUserLogin('true')} className="mt-4 bg-success">Save</Button>
              <Button onClick={() => setEditLogin(false)} className="mt-4 bg-success">Cancel</Button>
            </div>
            : <Button onClick={() => setEditLogin(true)} className="mt-4 bg-success">Edit</Button>
            }
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4" className="mb-2">
          <Accordion.Header className="border-top">
            Additional information
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <input id="legal-entity" type="checkbox" className="me-2" />
              <label htmlFor="legal-entity">
                This account is used by a legal entity, company representative
                or private entrepreneur.
              </label>
            </div>
            <Button onClick={() => setShowModal(true)} className="mt-4 bg-success">Edit</Button>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
      <InDevelopmentModal show={showModal} closeModal={closeModal}/>
    </Container>
  );
});

export default UserInfo;
