import { useState, useEffect } from 'react';

// Variables
import { API_KEY } from '../configs';

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

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

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

  return [movies, isLoading, errorMessage];
};

export default useMovies;
