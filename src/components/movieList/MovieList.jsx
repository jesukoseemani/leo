import React from "react";
import GridIcon from "../../components/icons/GridIcon";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Skeleton from "../../components/skeleton/Skeleton";

import "./movieList.scss";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useSelector } from "react-redux";
import { uniqueData } from "../../utils/helperFunction";

function MovieList({ loadMorePage }) {
  const { movies, fetchStatus, hasNextPage } = useSelector(
    (state) => state.movies
  );
  const loading = fetchStatus === "loading";
  const lastMovieRef = useIntersectionObserver(
    () => loadMorePage(),
    [hasNextPage, !loading]
  );

  return (
    <ContentWrapper>
      <div className="movie-list-header">
        <h3 className="movie-list-heading">Movies</h3>
        <GridIcon />
      </div>
      <div className="movie-list-grid">
        {uniqueData(movies)?.map((movie, i) =>
          fetchStatus === "loading" ? (
            <Skeleton
              key={movie.id}
              styleObj={{
                height: "480px",
                width: "282px",
                borderRadius: "4px",
              }}
            />
          ) : (
            <div
              key={movie.id}
              ref={movies.length === i + 1 ? lastMovieRef : null}
            >
              <MovieCard movie={movie} handler="general" />
            </div>
          )
        )}
      </div>
    </ContentWrapper>
  );
}

export default MovieList;
