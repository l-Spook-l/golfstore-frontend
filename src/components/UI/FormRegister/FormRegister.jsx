import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Context } from '../../..';

const FormRegister = observer(({ onSwitchForm }) => {
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

  const register = () => {
    user.setIsAuth(true)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Register Form</h1>
      <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <Button onClick={register} type="submit">Register</Button>
      <div>
        Уже есть аккаунт? <button type="button" onClick={onSwitchForm}>Войдите!</button>
      </div>
    </Form>
  );
})

export default FormRegister;
