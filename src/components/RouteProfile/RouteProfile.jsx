import React from 'react';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';

function RouteSavedMovies(props) {
  return (
    <>
      <Header
        loggedIn={props.loggedIn}
      />
      <Profile
        onSubmit={props.onSubmit}
        signOut={props.signOut}
      />
    </>
  );
}

export default RouteSavedMovies;