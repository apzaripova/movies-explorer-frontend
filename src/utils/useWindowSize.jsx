import React from 'react';

export function useWindowSize() {
  const getWindowSize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  React.useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}