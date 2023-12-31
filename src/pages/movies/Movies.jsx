import React, { useEffect, useRef, useState } from "react";
import { ENDPOINT_DISCOVER } from "../../services/apis/movieListApi";
import { fetchMovies } from "../../store/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieHeader from "../../components/movieHeader/MovieHeader";
import { isEmpty } from "../../utils/helperFunction";
import MovieList from "../../components/movieList/MovieList";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
// import useToast from "../../hooks/useToast";

function Movies() {
  const dispatch = useDispatch();
  const effectRan = useRef(false);

  const { movies, fetchStatus, hasNextPage, page } = useSelector(
    (state) => state.movies
  );

  // const handleShowToast = useToast();
  useEffect(() => {
    if (effectRan.current === false) {
      dispatch(fetchMovies(ENDPOINT_DISCOVER(page)));

      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch]);

  const isLoading = false;

  const lastMovieRef = useIntersectionObserver(() => {
    console.log("DID YOU CALL");
  }, [hasNextPage, isLoading]);

  // useEffect(() => {
  //   console.log(fetchStatus);
  //   handleShowToast({
  //     message: "Could not fetch the data",
  //     type: "failure",
  //     id: Date.now(),
  //   });
  // }, [fetchStatus]);

  return (
    <>
      <MovieHeader data={isEmpty(movies) ? [] : movies[0]} />
      {/* <MovieList
        fetchStatus={fetchStatus}
        movies={movies}
        lastMovieRef={lastMovieRef}
      /> */}
      {[...new Array(20)].map((_, i) => (
        <li ref={lastMovieRef} key={i}>
          <div style={{ width: "300px", height: "400px", background: "white" }}>
            ayo
          </div>
        </li>
      ))}
    </>
  );
}

export default Movies;
