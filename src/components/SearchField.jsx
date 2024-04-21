import { useRef } from 'react';

// Hooks
import useKey from '../hooks/useKey';

const SearchField = ({ searchHandler }) => {
  const inputDOM = useRef(null);

  const focusSearchField = () => {
    if (inputDOM.current === document.activeElement) return;

    inputDOM.current.focus();

    inputDOM.current.value = '';
    searchHandler('');
  };

  useKey('Enter', focusSearchField);

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
