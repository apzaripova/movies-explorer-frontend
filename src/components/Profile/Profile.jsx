import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [changedName, setChangedName] = useState(false);
  const [changedEmail, setChangedEmail] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (currentUser.name !== undefined) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setChangedName(true);
    const validName = /^[a-zA-Z- ]+$/.test(e.target.value);

    if (e.target.value.length < 2) {
      setNameError("Длина имени должна быть не менее 2 символов");
    } else if (e.target.value.length > 30) {
      setNameError("Длина имени должна должна быть не более 30 символов");
    } else if (!validName) {
      setNameError("Имя должно быть указано латиницей");
    } else {
      setNameError("");
    }
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setChangedEmail(true);
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      e.target.value
    );

    if (!validEmail) {
      setEmailError("Неверный формат почты");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  }

  function changeInputDisabled() {
    setIsInputDisabled(!isInputDisabled);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditUser({
      name,
      email,
    });
    changeInputDisabled();
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError]);

  useEffect(() => {
    if (currentUser.name === name && currentUser.email === email) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [name, email, currentUser.name, currentUser.email]);
  return (
    <>
      <Header className="header header__white">
        <Navigation onClick={props.onMenu} />
      </Header>
      <section className="profile">
        <h2 className="form__heading-profile">{`Привет, ${currentUser.name}!`}</h2>
        <form className="form__profile" id="profile" onSubmit={handleSubmit}>
              <div className="profile__field">
                <label className="profile__text profile__text_subtitle">
                  Имя
                  <input
                    id="profile-name"
                    className="profile__text profile__input"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    disabled={!isInputDisabled}
                  />
                </label>
                <span className="form__item-profile_error form__profile_span">
                {nameError}
              </span>
              </div>
              <div className="profile__field form__input-container_border">
                <label className="profile__text profile__text_subtitle">
                  Почта
                  <input
                    id="profile-email"
                    className="profile__text profile__input"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={!isInputDisabled}
                  />
                </label>
              </div>
              <span className="form__item-profile_error">{emailError}</span>
              <button type="submit" className="profile__button" disabled={!formValid || name < 2 || email < 2}>
                Редактировать
               </button>
              <button className="profile__button profile__button_styled" type="button" onClick={props.onSignOut}>
                  Выйти из аккаунта
              </button>
        </form>
      </section>
    </>
  );
}

export default Profile;