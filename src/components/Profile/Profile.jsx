import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {useFormValidation} from '../../utils/ValidateForm';

function Profile(props) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const validation = useFormValidation();

  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    setUserName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const handleUserNameChange = (e) => {
    validation.handleChange(e);
    if (currentUser.name !== e.target.value) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    setUserName(e.target.value);
  }

  const handleEmailChange = (e) => {
    validation.handleChange(e);
    if (currentUser.email !== e.target.value) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name: userName,
      email: email,
    })
    setIsFormValid(false);
    validation.resetForm();
  }

  return (
    <>
      <Header className="header header__white">
        <Navigation onClick={props.onMenu} />
      </Header>
      <section className="profile">
      <form 
        className="profile__info" 
        name="profile" 
        onSubmit={handleSubmit}>
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__container">
          <div className="profile__container-item">
            <label className="profile__lable" htmlFor="profile-name">Имя</label>
            <input 
              type="text" 
              className={`form-input form__input_type_profile ${!validation.validity.name && "form-input-error"}`} 
              id="profile-name"
              name="name"
              value={userName}
              onChange={handleUserNameChange}
              placeholder="Ваше имя"
              minLength="2" 
              maxLength="40" 
              required />
            <span 
                className="profile__input-error" 
                id="profile-name-error">{validation.errors.name}
            </span>
          </div>
          <div className="profile__container-item">
            <label className="profile__lable" htmlFor="profile-email">E-mail</label>
            <input 
              type="email" 
              className={`form-input form__input_type_profile ${!validation.validity.email && "form-input-error"}`} 
              id="profile-email"
              name="email" 
              value={email}
              onChange={handleEmailChange}
              placeholder="Ваш e-mail"
              minLength="2" 
              maxLength="40" 
              required 
            />
            <span 
                className="profile__input-error" 
                id="profile-email-error">{validation.errors.email}
            </span>
          </div> 
        </div> 
        <button 
          type="submit" 
          className={`button button_type_edit ${!validation.isFormValid ? "button_type_edit_disabled" : ""}`}
          disabled={validation.isFormValid && isFormValid ? false : true}>
          Редактировать
        </button>
        <Link className="link profile__signout-link" to='/' onClick={props.onSignOut}>Выйти из аккаунта</Link>
      </form>
      </section>
    </>
  );
}

export default Profile;