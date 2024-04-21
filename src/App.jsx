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

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSetWatched = (newMovie) => {
    setWatched((watched) => [...watched, newMovie]);
  };

  const handleSelectedMovie = (movieId) => {
    if (!movieId || movieId === selectedMovie) setSelectedMovie('');
    else setSelectedMovie(movieId);
  };

  const handleDeleteWatched = (movieId) => {
    setWatched((watched) =>
      watched.filter((watched) => (watched.imdbID !== movieId ? watched : ''))
    );
  };

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

    handleSelectedMovie('');

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        console.log(res);

        if (!res.ok) throw new Error('Something went wrong');

        const data = await res.json();

        if (data.Response === 'False') throw new Error('');

        const { Search } = data;

        setMovies(Search);
      } catch (error) {
        console.log(error);
        console.log(error.message);
        if (error.name !== 'AbortError') handleErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
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
            <MoviesList data={movies} clickHandler={handleSelectedMovie} />
          )}
        </Box>
        <Box>
          {selectedMovie ? (
            <MoviesDetails
              movieId={selectedMovie}
              buttonHandler={handleSelectedMovie}
              watchedList={watched}
              setWatchedHandler={handleSetWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <MoviesList
                data={watched}
                forWatched={true}
                deleteHandler={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
