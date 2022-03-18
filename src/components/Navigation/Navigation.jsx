import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  return (
    <>
      <nav className="header-nav">
        <NavLink to="/">
          <div className="header__logo" />
        </NavLink>
        <NavLink
          to="/movies"
          className="header-nav__movies"
          activeClassName="header-nav__movies_active"
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className="header-nav__saved-movies"
          activeClassName="header-nav__movies_active"
        >
          Сохраненные фильмы
        </NavLink>
      </nav>
      <div className="header-auth">
        <Link to="/profile">
          <div className="header__profile" />
        </Link>
        <div className="header__menu" onClick={props.onClick} />
      </div>
    </>
  );
}

export default Navigation;