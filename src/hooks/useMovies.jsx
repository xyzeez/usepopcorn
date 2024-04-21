import { useState, useEffect } from 'react';

// Variables
import { API_KEY } from '../configs';

// Helpers
import { fetchData } from '../helpers';

const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleErrorMessage = (message) => {
    setErrorMessage(!message.length ? 'Movie not found' : message);
  };

  useEffect(() => {
    if (!query) return;

    if (query.length < 3) {
      setErrorMessage(false);
      setMovies([]);
      return;
    }

    const controller = new AbortController();

    const searchMovies = async () => {
      try {
        setIsLoading(true);

        const { Search } = await fetchData(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        setMovies(Search);
      } catch (error) {
        if (error.name !== 'AbortError') handleErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();

    return () => controller.abort();
  }, [query]);

  return [movies, isLoading, errorMessage];
};

export default useMovies;
