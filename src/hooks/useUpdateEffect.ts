import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef(false);

  // for react-refresh
  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      effect();
    }
  }, deps);
};

export default useUpdateEffect;
