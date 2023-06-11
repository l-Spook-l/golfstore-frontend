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

  const [firstName, setFirstName] = useState(user.user.first_name)
  const [lastName, setLastName] = useState(user.user.last_name)
  const [phoneNumber, setPhoneNumber] = useState(user.user.phone_number)
  const [email, setEmail] = useState(user.user.email)

  const closeModal = () => setShowModal(false);

  const updateFirstLastName = () => {
    updateUserFirstName(firstName)
    updateUserLastName(lastName)
    setEditFirstLastName(false)
  }

  const updatePhoneNumberEmail = () => {
    updateUserPhoneNumber(phoneNumber)
    updateUserEmail(email)
    setEditPhoneNumberEmail(false)
  }

  const updateUserLogin = () => {
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
              {editFirstLastName
                ? <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                : lastName
                }
              </Col>
              <Col md={4}>
                <p>First name</p>
                {editFirstLastName
                ? <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                : firstName
                }
              </Col>
              <Col md={4}></Col>
            </Row>
            {editFirstLastName 
            ? <div>
                <Button onClick={() => updateFirstLastName()} className="mt-4 bg-success">Save</Button>
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
                {editPhoneNumberEmail
                ? <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                : phoneNumber
                }
              </Col>
              <Col md={3}>
                <p>Email</p>
                {editPhoneNumberEmail
                ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                : email
                }
              </Col>
            </Row>
            {editPhoneNumberEmail 
            ? <div>
                <Button onClick={() => updatePhoneNumberEmail()} className="mt-4 bg-success">Save</Button>
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
                {editLogin
                ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                : email
                }
              </Col>
            </Row>
            {editLogin 
            ? <div>
                <Button onClick={() => updateUserLogin()} className="mt-4 bg-success">Save</Button>
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
