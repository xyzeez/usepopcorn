import { useEffect, useRef } from 'react';

const SearchField = ({ searchHandler }) => {
  const inputDOM = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      if (e.code !== 'Enter') return;

      if (inputDOM.current === document.activeElement) return;

      inputDOM.current.focus();

      inputDOM.current.value = '';
      searchHandler('');
    };

    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [searchHandler]);

  return (
    <input
      ref={inputDOM}
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(e) => searchHandler(e.target.value)}
    />
  );
};

export default SearchField;
