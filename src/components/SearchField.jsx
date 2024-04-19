const SearchField = ({ searchHandler }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(e) => searchHandler(e.target.value)}
    />
  );
};

export default SearchField;
