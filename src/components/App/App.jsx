import React from 'react';

import Header from '../Header/Header';

// Landing page
import Navigation from '../Navigation/Navigation';
import About from '../About/About';
import Technologies from '../Technologies/Technologies';
import Student from '../Student/Student';

// Authorization
import Authorization from '../Authorization/Authorization';

// Main page
import SearchBar from '../SearchBar/SearchBar';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

// Profile
import Profile from '../Profile/Profile';

// Utils
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';

import Footer from '../Footer/Footer';
import { Route, Switch, 
  // Redirect, 
  withRouter, 
  // useHistory 
} from 'react-router-dom';

function App() {

  const [isTooltipPopupOpened, setTooltipPopupOpened] = React.useState(false);

  function toggleTooltipPopup() {
    setTooltipPopupOpened(!isTooltipPopupOpened);
  }

  return (
    <div className="page">
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Header 
              loggedIn={false}
            />
            <Navigation />
            <About />
            <Technologies />
            <Student />
            <Footer />
            <Popup 
              isOpen={isTooltipPopupOpened}
              onClose={toggleTooltipPopup}
            />
            <Preloader />
          </Route>
          <Route path="/sign-in">
            <Authorization 
             signIn={true}
             greeting={'Рады видеть!'}
             submit={'Войти'}
             subline={'Ещё не зарегистрированы? '}
             linkText={'Регистрация'}
             link={'/sign-up'}
            />
          </Route>
          <Route path="/sign-up">
            <Authorization 
             signIn={false}
             greeting={'Добро пожаловать!'}
             submit={'Зарегистрироваться'}
             subline={'Уже зарегистрированы? '}
             linkText={'Войти'}
             link={'/sign-in'}
            />
          </Route>
          <Route path="/main">
            <Header 
              loggedIn={true}
            />
            <SearchBar />
            <MoviesCardList />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header
              loggedIn={true}
            />
            <SearchBar />
            <MoviesCardList 
              savedMovies={true}
            />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header
              loggedIn={true}
            />
            <Profile />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);