import { useEffect, useState } from 'react';

// Hooks
import useKey from '../hooks/useKey';

// Components
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import StarRating from './StarRating';

// variables
import { API_KEY } from '../configs';

// Helpers
import { isAdded, getRating } from '../helpers';

const MoviesDetails = ({
  movieId,
  buttonHandler,
  watchedList,
  setWatchedHandler,
}) => {
  const [details, setDetails] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const added = isAdded(watchedList, movieId);

  const watchedRating = getRating(watchedList, movieId);

  const handleAddToList = () => {
    if (added) return;

    const movieData = {
      imdbID: details.imdbID,
      Title: details.Title,
      Year: details.Year,
      Poster: details.Poster,
      runtime: parseInt(details.Runtime.match(/\d+/)[0]),
      imdbRating: details.imdbRating,
      userRating: userRating,
    };

    setWatchedHandler(movieData);
    setUserRating(0);
  };

  useKey('Escape', () => buttonHandler(''));

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

  useEffect(() => {
    document.title = `Movie | ${details && details.Title}`;

    return () => {
      document.title = 'usePopcorn';
    };
  }, [details]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => buttonHandler('')}>
              <span>←</span>
            </button>

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
            <div className="rating">
              {added ? (
                `You rated this movie 🌟 ${watchedRating}`
              ) : (
                <>
                  <StarRating
                    rating={userRating}
                    ratingHandler={setUserRating}
                    addStatus={added}
                  />

                  {userRating > 0
                    ? !added && (
                        <button onClick={handleAddToList} className="btn-add">
                          + Add to List
                        </button>
                      )
                    : ''}
                </>
              )}
            </div>
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
