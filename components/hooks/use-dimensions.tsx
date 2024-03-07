import { useState, useEffect, useCallback, RefObject } from 'react';

interface UseDimensions {
  width: number;
  height: number;
}

const useDimensions = (ref: RefObject<HTMLElement>): UseDimensions => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const getDimensions = useCallback(() => {
    if (ref.current) {
      const { offsetWidth, offsetHeight } = ref.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [ref]);

  useEffect(() => {
    getDimensions();
  }, [getDimensions]);

  useEffect(() => {
    const handleResize = () => {
      getDimensions();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getDimensions]);

  return { width: dimensions.width, height: dimensions.height };
};

export default useDimensions;
