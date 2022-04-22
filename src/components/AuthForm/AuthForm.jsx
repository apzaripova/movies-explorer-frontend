import logoPath from '../../images/svg/header__logo.svg';
import { Link } from "react-router-dom";
import './AuthForm.css';

function AuthForm(props) {

  return (
    <div className="user-entry">
      <Link to="/" className="header__link">
        <img className="header__logo" src={logoPath} alt="Movies portal logo" />
      </Link>
      <form 
        className="user-entry__info" 
        name="user-entry" 
        onSubmit={props.onSubmit}>
          <h2 className="user-entry__title">{props.title}</h2>
          <div className="profile__container">
            {props.children}
          </div>
          <button 
            type="submit" 
            className={`button button_type_sign ${!props.isFormValid ? "button_type_sign_disabled" : ""}`} disabled={props.isLoading}>
            {props.buttonName}
          </button>
          <p className="user-entry__message">
          {props.message} 
          <Link to={props.link} className="link user-entry__link">
            {props.linkName}
          </Link>
        </p>
      </form>
    </div>
  )
};

export default AuthForm;