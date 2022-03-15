import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <section className="navigation">
      <div className="navigation__heading-container">
        <h1 className="navigation__heading">Учебный проект студента факультета Веб-разработки.</h1>
      </div>
      <nav className="navigation__nav-box">
        <Link to={'1'} className="navigation__nav-link">О проекте</Link>
        <Link to={'1'} className="navigation__nav-link">Технологии</Link>
        <Link to={'1'} className="navigation__nav-link">Студент</Link>
      </nav>
    </section>
  );
}

export default Navigation;