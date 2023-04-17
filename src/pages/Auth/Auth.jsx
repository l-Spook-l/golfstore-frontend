import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../../utils/consts";

const Auth = () => {
  const location = useLocation(); // получаем текущий URL стр

  const isLogin = location.pathname === LOGIN_ROUTE;

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card className="p-5" style={{ width: 600 }}>
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Adress</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-mited">some text ooo</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>
          <Form.Group className="mt-2" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Row className="mt-2">
            <Col className="">
              {isLogin 
              ? 
              <div>
              Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрируйся!</NavLink>
              </div>
              :
              <div>
              Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
              }
            </Col>
            <Col className="d-flex justify-content-end">
              <Button >{isLogin ? "Войти" : "Регистрация"}</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      
    </Container>

  );
};

export default Auth;
