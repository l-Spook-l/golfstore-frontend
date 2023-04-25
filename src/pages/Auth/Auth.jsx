import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTER_ROUTE,
} from "../../utils/consts";
import { Context } from "../..";
import { login, registration } from "../../http/userAPI";
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
  const { user } = useContext(Context);

  // получаем текущий URL стр для выбора логина или регистрации
  const location = useLocation();

  const isLogin = location.pathname === LOGIN_ROUTE;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let userData;  // получаем пользователя
      if (isLogin) {
        userData = await login(username, password);
        console.log("Auth login-userData", userData);
      } else {
        userData = await registration(username, password);
        console.log("Auth registration-userData", userData);
      }
      user.setUser(userData);
      user.setIsAuth(true);
      console.log('Auth user', user)
      navigate(MAIN_ROUTE);
    } catch (error) {
      console.log('error', error)
      console.log('error.response',error.response)
      alert(error.response.data.message);
    }
  };
  //console.log('Auth user', user)

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
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Text className="text-mited">some text ooo</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Row className="mt-2">
            <Col className="">
              {isLogin ? (
                <div>
                  Нет аккаунта?{" "}
                  <NavLink to={REGISTER_ROUTE}>Зарегистрируйся!</NavLink>
                </div>
              ) : (
                <div>
                  Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                </div>
              )}
            </Col>
            <Col className="d-flex justify-content-end">
              <Button onClick={() => click()}>
                {isLogin ? "Войти" : "Регистрация"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
