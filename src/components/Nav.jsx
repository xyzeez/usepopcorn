const Nav = ({ movies, children }) => {
  return (
    <nav className="nav-bar">
      {children}
      <p className="num-results">
        {movies.length > 0 && (
          <span>
            Found <strong>{movies.length}</strong> results
          </span>
        )}
      </p>
    </nav>
  );
};

export default Nav;
