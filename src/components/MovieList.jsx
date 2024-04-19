import Movie from './Movie';

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

export default MoviesList;
