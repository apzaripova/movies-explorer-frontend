import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import {useFormValidation} from '../../utils/ValidateForm';
import './Register.css';

function Register(props) {

  const validation = useFormValidation();
  const {name, email, password} = validation.values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister({name, email, password})
  }

  return (
    <section className="login">
    <AuthForm
      title="Добро пожаловать!"
      buttonName="Зарегистрироваться"
      message="Уже зарегистрированы?"
      link="/signin"
      linkName="Войти"
      onSubmit={handleSubmit}
      isFormValid={validation.isFormValid}
      isLoading={props.isLoading}>
      <div className="user-entry__container">
        <label className="user-entry__lable" htmlFor="profile-name">Имя</label>
        <input 
        type="text" 
        className={`form-input form__input_type_sign ${!validation.validity.name && "form-input-error"}`}
        id="profile-name"
        name="name"
        value={validation.values.name || ''}
        onChange={validation.handleChange}
        minLength="2" 
        maxLength="40" 
        disabled={props.isLoading}
        required />
      </div>
      <span 
        className={`input-error ${!validation.isFormValid && "input-error_active"}`} 
        id="profile-name-error">{validation.errors.name}
      </span>
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
          required />
      </div>
      <span 
        className={`input-error ${!validation.isFormValid && "input-error_active"}`}
        id="password-error">{validation.errors.password}
      </span>
    </AuthForm>
    </section>
  )
};

export default Register;