import React from 'react';
import { Link, useHistory  } from 'react-router-dom';
import logo from '../../images/svg/header__logo.svg';

// Sidebar
import Sidebar from '../Sidebar/Sidebar';

function Header(props) {

  const history = useHistory();
  const currentLoaction = history.location.pathname;

  const [ isSidebarOpen, setSidebarOpen ] = React.useState(false);
  const [ areLinksDisplayed, setLinksDisplayed ] = React.useState(false);
  
  function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }

  React.useEffect(() => {
    if (currentLoaction === "/") {
      setLinksDisplayed(true);
    }
  }, [currentLoaction]);

  return (
    <header className={`header ${props.loggedIn ? 'header__state_logged-in' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__link">
          <img src={logo} alt="Логотип Проекта" className="header__logo" />
        </Link>
        <div className={`${props.loggedIn ? 'hidden' : 'header__link-container header__link-container_page_landing'}`}>
          <Link to="/sign-up" className="header__link">Регистрация</Link>
          <Link to="/sign-in" className="header__link header__link_outlined">Войти</Link>
        </div>
        <div className={`${props.loggedIn ? 'header__link-container' : 'hidden'}`}>
          <Link to="/main" className="header__link header__link_state_logged-in">Фильмы</Link>
          <Link to="/saved-movies" className="header__link header__link_state_logged-in">Сохраненные фильмы</Link>
          <Link to="/profile" className="header__link-box">
            Аккаунт
            <div className="header__link-icon"></div>
          </Link>
        </div>
        <button type="button" className={`${areLinksDisplayed ? 'hidden' : 'header__burger-button'}`} onClick={toggleSidebar}></button>
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </header>
  );
}

export default Header;