const Nav = ({ movies, children }) => {
  return (
    <nav className="nav-bar">
      {children}
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
};

export default Nav;
