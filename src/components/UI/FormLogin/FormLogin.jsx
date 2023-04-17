import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Context } from '../../..';

const FormLogin = observer(({ onSwitchForm }) => {
  const {user} = useContext(Context)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки данных на сервер и обработки ошибок
    console.log('Email:', email);
    console.log('Password:', password);
  }
  // Авторизируем пользователя
  const login = () => {
    user.setIsAuth(true)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login Form</h1>
      <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <Button onClick={login}>Login</Button>
      <div>
        Нет аккаунта? <button type="button" onClick={onSwitchForm}>Зарегистрируйтесь!</button>
      </div>
    </Form>
  );
})

export default FormLogin;