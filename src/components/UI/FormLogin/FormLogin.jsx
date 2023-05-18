import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { Context } from "../../..";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "../../../utils/consts";
import { login } from "../../../http/userAPI";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const FormLogin = observer(({ onSwitchForm, show, onHide }) => {
  const { user } = useContext(Context);

  const navigate = useNavigate();

  //const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Были ли мы в ipnut
  const [usernameDirty, setUsernameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  // Ошибка полей
  const [usernameError, setUsernameError] = useState("username не может быть пустым");
  //const [emailError, setEmailError] = useState('Email не может быть пустым')
  const [passwordError, setPasswordError] = useState("password не может быть пустым");

  // Общая проверка валидации формы
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (usernameError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [usernameError, passwordError]);

  const loginUser = () => {
    try {
      const userData = login(username, password);
      //console.log("Auth login-userData", userData);

      userData.then((data) => {
        console.log('userData.then((data)', data)
        user.setUser(data)
        user.setIsAuth(true);

      })

      console.log("Auth user", user);
      onHide()
      //navigate(MAIN_ROUTE);
    } catch (error) {
      console.log("error", error);
      console.log("error.response", error.response);
      alert(error.response.data.message);
    }
  };

  /*   const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некоректный email')
    } else {
      setEmailError('')
    }
  } */

  const usernameHandler = (e) => {
    setUsername(e.target.value);
    console.log("usernameHandler", e.target.value);
    console.log("e.target.value < 3", e.target.value.length < 3);
    if (e.target.value.length < 3) {
      setUsernameError("username должен быть длиннее 8 символов");
      if (!e.target.value) {
        setUsernameError("username не может быть пустым");
      }
    } else {
      setUsernameError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Пароль должен быть длиннее 8 символов");
      if (!e.target.value) {
        setPasswordError("password не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "username":
        setUsernameDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title >Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Adress</Form.Label>
            <Form.Control
              onBlur={(e) => blurHandler(e)}
              name="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => usernameHandler(e)}
            />
            {usernameDirty && usernameError && (
              <Form.Text className="text-danger">{usernameError}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
            <Form.Control
              onBlur={(e) => blurHandler(e)}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => passwordHandler(e)}
            />
            <Button className="ms-3" variant="outline-secondary" onClick={toggleShowPassword}>
            {showPassword ? <AiOutlineEye style={{fontSize: '20px'}}/> :<AiOutlineEyeInvisible style={{fontSize: '20px'}}/> }
            </Button>
            </InputGroup>
            
            {passwordDirty && passwordError && (
              <Form.Text className="text-danger">{passwordError}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mt-2" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          
          <Row className="mt-2">
            <Col md={8} className="d-flex">
              No account?
              <Button className="ms-2" type="button" onClick={onSwitchForm}>
                Sign up!
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button disabled={!formValid} onClick={() => loginUser()}>
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default FormLogin;
