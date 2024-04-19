import { useEffect, useState } from 'react';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// Components
const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

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

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
};

const MoviesList = ({ data, forWatched }) => {
  return (
    <ul className="list list-movies">
      {data?.map((movie) => (
        <li key={movie.imdbID}>
          <Movie data={movie} forWatched={forWatched} />
        </li>
      ))}
    </ul>
  );
};

const Movie = ({ data, forWatched }) => {
  return (
    <div>
      <img src={data.Poster} alt={`${data.Title} poster`} />
      <div className="inner">
        <h3>{data.Title}</h3>
        {forWatched ? (
          <div>
            <p>
              <span>⭐️</span>
              <span>{data.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{data.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{data.runtime} min</span>
            </p>
          </div>
        ) : (
          <p>
            <span>🗓</span>
            <span>{data.Year}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const MoviesDetails = () => {
  return (
    <div className="details">
      <header>
        <button className="btn-back">←</button>

        <img
          src="https://m.media-amazon.com/images/M/MV5BMTQ4ZDY3NzQtNTJjYy00Zjc4LWIxYTQtZDZjZjk0ODU2MWRhL2ltYWdlXkEyXkFqcGdeQXVyNzIyODY5MDk@._V1_SX300.jpg"
          alt="Poster of [object Object] movie"
        />
        <div className="details-overview">
          <h2>Dans tes bras</h2>
          <p>01 Jul 2009 • 83 min</p>
          <p>Drama</p>
          <p>
            <span>⭐️</span>5.7 IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div></div>
        <p>
          <em>
            Adopted when he was young, Louis has a fight with his parents and
            looks for his birth mother. When the son she gave up suddenly
            appears, Solange denies him and Louis falls into despair. The film
            follows an adopted adolescent boy s...
          </em>
        </p>
        <p>Starring Michèle Laroque, Martin Loizillon, Lola Naymark</p>
        <p>Directed by Hubert Gillet</p>
      </section>
    </div>
  );
};

const Loader = () => {
  return <div className="loader">Loading...</div>;
};

const ErrorMessage = ({ message }) => {
  return <div className="error">⛔ {message}</div>;
};

const convertMoviesFormat = (movies) => {
  return movies.map((movie) => ({
    imdbID: movie.id.toString(),
    Title: movie.title,
    Year: movie.release_date.split('-')[0],
    Poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : 'N/A',
  }));
};

const KEY = '4ee0e3464f7ff5d7c291f4f2d71046d0';
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSetMovies = () => {};

  const handleQuery = (query) => {
    if (query.length < 3) {
      setMovies([]);
      setErrorMessage(false);
      return;
    }

    setQuery(query);
  };

  const handleErrorMessage = (message) => {
    setErrorMessage(!message.length ? 'Movie not found' : message);
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${KEY}`
        );

        if (!res.ok) throw new Error('Something went wrong');

        const data = await res.json();

        const { results } = data;

        if (!results.length) throw new Error('');

        const newArray = convertMoviesFormat(results);

        setMovies(newArray);
      } catch (error) {
        console.log(error);
        console.log(error.message);
        handleErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <>
      <Nav movies={movies}>
        <Logo />
        <SearchField searchHandler={handleQuery} />
      </Nav>

      <main className="main">
        <Box>
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <ErrorMessage message={errorMessage} />
          ) : (
            <MoviesList data={movies} />
          )}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <MoviesList data={watched} forWatched={true} />
        </Box>
      </main>
    </>
  );
}
