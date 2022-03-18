import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';
import * as CONSTANTS from '../../utils/constants';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [ name, setName ] = React.useState('');
  const [ email, setEmail ] = React.useState('');

  const [ nameValid, setNameValid ] = React.useState(false);
  const [ emailValid, setEmailValid ] = React.useState(false);

  const [ submitDisabled, setSubmitDisabled ] = React.useState(true);
  const [ isTooltipVisible, setTooltipVisible ] = React.useState(false);

  React.useEffect(() => {
    if (!currentUser.name || !currentUser.email) {
      currentUser.name = 'загрузка данных...';
      currentUser.email = 'загрузка данных...';
    }
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function toggletooltip() {
    if(!nameValid || !emailValid) {
      setTooltipVisible(true);
    } else {
      setTooltipVisible(false);
    }
  }

  React.useEffect(() => {
    if (nameValid && emailValid) {
      setSubmitDisabled(false);
    } else if (name === currentUser.name && email === currentUser.email) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(true);
    } 
    return submitDisabled;
  }, [name, email, currentUser.name, currentUser.email, emailValid, nameValid, submitDisabled]);

  const nameHandler = (evt) => {
    setName(evt.target.value);
    const re = CONSTANTS.NAME_REGEX;
    if (!re.test(String(evt.target.value).toLowerCase()) && evt.target.value.length >= 1) {
      setNameValid(false);
    } else if (evt.target.value === '') {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const emailHandler = (evt) => {
    setEmail(evt.target.value);
    const re = CONSTANTS.MAIL_REGEX;
    if (!re.test(String(evt.target.value).toLowerCase()) && evt.target.value.length >= 1) {
      setEmailValid(false);
    } else if (evt.target.value === '') {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({name, email});
  };

  return (
    <section className="profile">
      <div className={`tooltip ${!isTooltipVisible ? 'hidden' : ''}`}>
        <ul className="tooltip__list">
          <li className="tooltip__list-item">Данные должны отличаться от текущих;</li>
          <li className="tooltip__list-item">Имя должно включать только русские / английские буквы, пробел, либо дефис;</li>
          <li className="tooltip__list-item">Email должен соответсвовать конструкции: example@example.com</li>
        </ul>
      </div>
      <h2 className="profile__greeting">Привет, {currentUser.name || 'Username'}!</h2>
      <form className="profile__form" 
        onSubmit={evt => handleSubmit(evt)}
        onChange={toggletooltip}
      >
        <div className="profile__data-container">
          <label className="profile__text">
            Имя
          </label>
          <input 
            type="text"
            className={`profile__input ${!nameValid ? 'profile__input-error' : ''}`}
            placeholder={currentUser.name || 'Username'}
            name="name"
            value={name}
            onChange={evt => nameHandler(evt)}
          />
        </div>
        <div className="profile__data-container">
          <label className="profile__text">
            Email
          </label>
          <input 
            type="email" 
            className={`profile__input ${!emailValid ? 'profile__input-error' : ''}`}
            placeholder={currentUser.email || 'Email'}
            name="email"
            value={email}
            onChange={evt => emailHandler(evt)}
          />
        </div>
        <button type="submit"
          className={`profile__button ${submitDisabled ? 'profile__button_disabled' : ''}`}
          disabled={submitDisabled}
        >Редактировать</button>
      </form>
      <button type="button" className="profile__button profile__button_type_signout" 
        onClick={props.signOut}
      >Выйти из аккаунта</button>
    </section>
  );
}
  
  export default Profile;