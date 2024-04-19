const Movie = ({ data, forWatched, clickHandler }) => {


  return (
    <div onClick={() => clickHandler(data.imdbID)}>
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

export default Movie;
