import { useEffect, useState } from 'react';

// Components
import Nav from './components/Nav';
import Logo from './components/Logo';
import SearchField from './components/SearchField';
import Box from './components/Box';
import MoviesList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import MoviesDetails from './components/MovieDetails';

// variables
import { API_KEY } from './configs';

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

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('tt3896198');
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
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        if (!res.ok) throw new Error('Something went wrong');

        const data = await res.json();

        if (data.Response === 'False') throw new Error('');

        const { Search } = data;

        setMovies(Search);
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
          {selectedMovie ? (
            <MoviesDetails movieId={selectedMovie} />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <MoviesList data={watched} forWatched={true} />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
