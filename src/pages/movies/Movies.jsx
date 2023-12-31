import React, { useEffect, useRef } from "react";
import { ENDPOINT_DISCOVER } from "../../services/apis/movieListApi";
import { fetchMovies } from "../../store/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieHeader from "../../components/movieHeader/MovieHeader";
import { isEmpty } from "../../utils/helperFunction";
import MovieList from "../../components/movieList/MovieList";
// import useToast from "../../hooks/useToast";

function Movies() {
  const dispatch = useDispatch();
  const effectRan = useRef(false);

  const { movies, fetchStatus, page } = useSelector((state) => state.movies);

  // const handleShowToast = useToast();
  useEffect(() => {
    if (effectRan.current === false) {
      dispatch(fetchMovies(ENDPOINT_DISCOVER(page)));

      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch, page]);

  const loadMorePage = () => {
    dispatch(fetchMovies(ENDPOINT_DISCOVER(page + 1)));
  };

  useEffect(() => {
    console.log(fetchStatus);
    // handleShowToast({
    //   message: "Could not fetch the data",
    //   type: "failure",
    //   id: Date.now(),
    // });
  }, [fetchStatus]);

  return (
    <>
      <MovieHeader
        data={isEmpty(movies) ? [] : movies[0]}
        fetchStatus={fetchStatus}
      />
      <MovieList loadMorePage={loadMorePage} />
    </>
  );
}

export default Movies;
