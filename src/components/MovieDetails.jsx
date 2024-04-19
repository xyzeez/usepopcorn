import { useEffect, useState } from 'react';

// Components
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

// variables
import { API_KEY } from '../configs';

const MoviesDetails = ({ movieId }) => {
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleErrorMessage = (message) => {
    setErrorMessage(!message.length ? 'Movie not found' : message);
  };

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
        );

        if (!res.ok) throw new Error('Something went wrong!');

        const data = await res.json();

        if (!data) throw new Error('');

        setDetails(data);
      } catch (error) {
        console.log(error);
        console.log(error.message);
        handleErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <>
          <header>
            <button className="btn-back">←</button>

            <img
              src={details.Poster}
              alt={`Poster of ${details.Title} movie`}
            />
            <div className="details-overview">
              <h2>{details.Title}</h2>
              <p>
                {details.Released} • {details.Runtime}
              </p>
              <p>Drama</p>
              <p>
                <span>⭐️</span>
                {details.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div></div>
            <p>
              <em>{details.Plot}</em>
            </p>
            <p>Starring {details.Actors}</p>
            <p>Directed by {details.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MoviesDetails;
