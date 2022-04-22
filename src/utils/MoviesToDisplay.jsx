import React from 'react';

function DisplayMovieCards() {

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
  
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
   };

   window.addEventListener("resize", handleWindowResize)
    
   return () => window.removeEventListener("resize", handleWindowResize)
  },[]);

  return { windowWidth };
};

export default DisplayMovieCards;