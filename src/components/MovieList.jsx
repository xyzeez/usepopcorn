// Components
import Movie from './Movie';

const MoviesList = ({ data, forWatched, clickHandler }) => {
  return (
    <ul className="list list-movies">
      {data?.map((movie) => (
        <li key={movie.imdbID}>
          <Movie
            data={movie}
            forWatched={forWatched}
            clickHandler={clickHandler}
          />
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
