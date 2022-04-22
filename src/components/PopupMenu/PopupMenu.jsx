import React from "react";
import { Link } from "react-router-dom";
import "./PopupMenu.css";

function PopupMenu(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      onClick={props.onClose}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        <nav className="header-nav popup-navlink">
          <Link to="/" className="popup__nav">
            Главная
          </Link>
          <Link to="/movies" className="header-nav__movies popup__nav">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header-nav__saved-movies popup__nav">
            Сохраненные фильмы
          </Link>
        </nav>
        <div className="header-auth">
          <Link to="/profile">
            <div className="header__profile popup__nav" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PopupMenu;