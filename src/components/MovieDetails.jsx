const MoviesDetails = () => {
  return (
    <div className="details">
      <header>
        <button className="btn-back">←</button>

        <img
          src="https://m.media-amazon.com/images/M/MV5BMTQ4ZDY3NzQtNTJjYy00Zjc4LWIxYTQtZDZjZjk0ODU2MWRhL2ltYWdlXkEyXkFqcGdeQXVyNzIyODY5MDk@._V1_SX300.jpg"
          alt="Poster of [object Object] movie"
        />
        <div className="details-overview">
          <h2>Dans tes bras</h2>
          <p>01 Jul 2009 • 83 min</p>
          <p>Drama</p>
          <p>
            <span>⭐️</span>5.7 IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div></div>
        <p>
          <em>
            Adopted when he was young, Louis has a fight with his parents and
            looks for his birth mother. When the son she gave up suddenly
            appears, Solange denies him and Louis falls into despair. The film
            follows an adopted adolescent boy s...
          </em>
        </p>
        <p>Starring Michèle Laroque, Martin Loizillon, Lola Naymark</p>
        <p>Directed by Hubert Gillet</p>
      </section>
    </div>
  );
};

export default MoviesDetails;
