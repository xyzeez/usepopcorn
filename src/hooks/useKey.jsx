import { useEffect } from 'react';

const useKey = (key, action) => {
  useEffect(() => {
    const callback = (e) => {
      if (e.code === key) action();
    };

    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [key, action]);
};

export default useKey;
