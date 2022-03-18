import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { CAPTION } from '../../utils/constants';

export default function MainHeader() {
  return (
    <header className="header">
      <Link className="header__link header__link_logo" to="/" />
      <div className="header__menu">
        <Link className="header__link header__link_signup" to="signup">
          {CAPTION.SIGN_UP}
        </Link>
        <Link className="header__link header__link_signin" to="signin">
          {CAPTION.SIGN_IN}
        </Link>
      </div>
    </header>
  );
}