import { useState } from 'react';

// Hooks
import useMovies from './hooks/useMovies';
import useLocalStorage from './hooks/useLocalStorage';

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

// Variables
import { LOCAL_STORAGE_KEY } from './configs';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, isLoading, errorMessage] = useMovies(query);
  const [watched, setWatched] = useLocalStorage([], LOCAL_STORAGE_KEY);
  const [selectedMovie, setSelectedMovie] = useState('');

  const handleSetWatched = (newMovie) => {
    setWatched((watched) => [...watched, newMovie]);
  };

  const handleDeleteWatched = (movieId) => {
    setWatched((watched) =>
      watched.filter((watched) => (watched.imdbID !== movieId ? watched : ''))
    );
  };

  const handleQuery = (query) => {
    handleSelectedMovie('');
    setQuery(query);
  };

  const handleSelectedMovie = (movieId) => {
    if (!movieId || movieId === selectedMovie) setSelectedMovie('');
    else setSelectedMovie(movieId);
  };

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
              key={selectedMovie}
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
