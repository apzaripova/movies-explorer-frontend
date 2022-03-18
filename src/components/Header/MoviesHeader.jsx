import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CAPTION } from '../../utils/constants';
import './Header.css';

export default function MoviesHeader() {
  const location = useLocation().pathname;
  const activeStyle = {
    fontWeight: 500,
  };

  const renderHeader = (bgStyle = '', linkStyle = '') => (
    <header className={`header ${bgStyle}`}>
      <Link className="header__link header__link_logo" to="/" />
      <div className="header__menu header__menu_theme_light">
        <NavLink
          className={`header__link header__link_nav ${linkStyle}`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/movies"
        >
          {CAPTION.MOVIES}
        </NavLink>
        <NavLink
          className={`header__link header__link_nav ${linkStyle}`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/saved-movies"
        >
          {CAPTION.SAVED_MOVIES}
        </NavLink>
      </div>
      <NavLink
        className={`header__link header__link_nav header__link_profile ${linkStyle}`}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to="/profile"
      >
        {CAPTION.PROFILE}
        <span className="header__profile_decor" />
      </NavLink>
    </header>
  );

  return location === '/'
    ? renderHeader('', 'header__link_nav_light')
    : renderHeader('header_theme_light', '');
}