import React from "react";
import GridIcon from "../../components/icons/GridIcon";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Skeleton from "../../components/skeleton/Skeleton";

import "./movieList.scss";

const MovieList = React.forwardRef(({ fetchStatus, movies }, lastMovieRef) => {
  return (
    <ContentWrapper>
      <div className="movie-list-header">
        <h3 className="movie-list-heading">Movies</h3>
        <GridIcon />
      </div>
      <div className="movie-list-grid">
        {movies?.map((movie, i, movies) =>
          fetchStatus === "loading" ? (
            <Skeleton
              styleObj={{
                height: "480px",
                width: "282px",
                borderRadius: "4px",
              }}
            />
          ) : (
            <MovieCard
              key={movie.id}
              movie={movie}
              handler="general"
              ref={movie.length - 1 === i ? lastMovieRef : null}
            />
          )
        )}
      </div>
    </ContentWrapper>
  );
});

export default MovieList;
