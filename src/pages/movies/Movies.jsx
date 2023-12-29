import React, { useEffect, useRef, useState } from "react";
import { ENDPOINT_DISCOVER } from "../../services/apis/movieListApi";
import { fetchMovies } from "../../store/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieHeader from "../../components/movieHeader/MovieHeader";
import { isEmpty } from "../../utils/helperFunction";
import MovieList from "../../components/movieList/MovieList";

function Movies() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      dispatch(fetchMovies(ENDPOINT_DISCOVER(page)));

      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch]);

  const { movies, fetchStatus } = useSelector((state) => state.movies);

  return (
    <>
      <MovieHeader data={isEmpty(movies) ? {} : movies?.results[0]} />
      <MovieList fetchStatus={fetchStatus} movies={movies} />
    </>
  );
}

export default Movies;
