import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar(props) {

  function closeSideBar(evt) {
    if (!evt.target.closest('.sidebar__container')) {
      props.toggleSidebar();
    }
  }

  return (
    <section className={`sidebar ${props.isOpen ? 'sidebar_opened' : ' '}`} onClick={closeSideBar}>
      <div className={`sidebar__container ${props.isOpen ? 'sidebar__container-animation' : ' '}`}>
        <ul className="sidebar__list">
          <li className="sidebar__list-item">
            <NavLink exact={true} to="/" className="sidebar__link" activeClassName="sidebar__link_active" onClick={props.toggleSidebar}>Главная</NavLink>
          </li>
          <li className="sidebar__list-item">
            <NavLink to="/main" className="sidebar__link" activeClassName="sidebar__link_active" onClick={props.toggleSidebar}>Фильмы</NavLink>
          </li>
          <li className="sidebar__list-item">
            <NavLink to="/saved-movies" className="sidebar__link" activeClassName="sidebar__link_active" onClick={props.toggleSidebar}>Сохраненные фильмы</NavLink>
          </li>
          <li className="sidebar__list-item">
            <NavLink to="/profile" className="sidebar__link-box" activeClassName="sidebar__link_active" onClick={props.toggleSidebar}>
              Аккаунт
              <div className="header__link-icon"></div>
            </NavLink>
          </li>
        </ul>
        <button type="button" className="sidebar__close-button" onClick={props.toggleSidebar}></button>
      </div>
    </section>
  );
}

export default Sidebar;