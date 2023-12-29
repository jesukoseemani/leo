import React from "react";
import GridIcon from "../../components/icons/GridIcon";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Skeleton from "../../components/skeleton/Skeleton";

import "./movieList.scss";

function MovieList({ fetchStatus, movies }) {
  const { results } = movies;
  return (
    <ContentWrapper>
      <div className="movie-list-header">
        <h3 className="movie-list-heading">Movies</h3>
        <GridIcon />
      </div>
      <div className="movie-list-grid">
        {results?.map((movie) =>
          !fetchStatus ? (
            <Skeleton
              styleObj={{
                height: "480px",
                width: "282px",
                borderRadius: "4px",
              }}
            />
          ) : (
            <MovieCard movie={movie} handler="general" />
          )
        )}
      </div>
    </ContentWrapper>
  );
}

export default MovieList;
