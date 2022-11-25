import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { RootState } from '../types';
import { login, resetLoginFormError } from './loginSlice';
import './styles.css';

function LoginForm():JSX.Element {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const error = useSelector((state:RootState) => state.auth.loginFormError);
  const dispatch = useAppDispatch();

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }
  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    const dispatchResult = await dispatch(
      login({
        username,
        password,
      })
    );

    if (login.fulfilled.match(dispatchResult)) {
      navigate('/');
    }
  }
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(resetLoginFormError());
    }, 5000);
    return () => clearTimeout(id);
  }, [error, dispatch]);

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="login-formLabel" htmlFor="email-input">
        Username
      </label>
      <input
        className="login-input"
        type="text"
        id="email-input"
        autoComplete="email"
        value={username}
        onChange={handleEmailChange}
      />
      <label className="login-formLabel" htmlFor="password-input">
        Пароль
      </label>
      <input
        className="login-input"
        type="password"
        id="password-input"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input className="login-inputSubmit" type="submit" value="войти" style={{ opacity: '0.4' }} />
      <br />
      <br />
      <br />
      {error && <div className="login-formP">{error}</div>}
    </form>
  );
}

export default LoginForm;
