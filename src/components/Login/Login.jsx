import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import {useFormValidation} from '../../utils/ValidateForm';
import './Login.css';

function Login(props) {

  const validation = useFormValidation();
  const {email, password} = validation.values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
      props.onLogin({email, password})
  }

  return (
    <section className="login">
    <AuthForm
    title="Рады видеть!"
    buttonName="Войти"
    message="Ещё не зарегистрированы?"
    link="/signup"
    linkName="Регистрация"
    onSubmit={handleSubmit}
    isFormValid={validation.isFormValid}
    isLoading={props.isLoading}>
      <div className="user-entry__container">
        <label className="user-entry__lable" htmlFor="email">E-mail</label>
        <input 
        type="email" 
        className={`form-input form__input_type_sign ${!validation.validity.email && "form-input-error"}`} 
        id="email"
        name="email" 
        value={validation.values.email || ''}
        onChange={validation.handleChange} 
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        title="Введите Ваш email" 
        disabled={props.isLoading}
        required />
      </div>
      <span 
        className={`input-error ${!validation.isFormValid && "input-error_active"}`} 
        id="email-error">{validation.errors.email}
        </span>
      <div className="user-entry__container">
        <label className="user-entry__lable" htmlFor="password">Пароль</label>
        <input 
          type="password" 
          className={`form-input form__input_type_sign ${!validation.validity.password && "form-input-error"}`} 
          id="password"
          name="password"
          value={validation.values.password || ''}
          onChange={validation.handleChange} 
          minLength="8"
          title="Введите Ваш пароль" 
          disabled={props.isLoading}
          required 
        />
      </div>
      <span 
          className={`input-error ${!validation.isFormValid && "input-error_active"}`} 
          id="password-error">{validation.errors.password}
        </span>
    </AuthForm>
    </section>
  )
};

export default Login;