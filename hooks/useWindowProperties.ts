import { useState, useEffect } from 'react';

function useWindowProperties() {
  const [windowProperties, setWindowProperties] = useState<{
    width: number;
    height: number;
    orientation: string;
  }>({
    width: 0,
    height: 0,
    orientation: 'landscape',
  });
  useEffect(() => {
    function handleResize() {
      setWindowProperties({
        width: window.innerWidth,
        height: window.innerHeight,
        orientation:
          window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowProperties;
}

export default useWindowProperties;
