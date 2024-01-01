import React, { useEffect, useRef } from "react";
import { ENDPOINT_DISCOVER } from "../../services/apis/movieListApi";
import { fetchMovies } from "../../store/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieHeader from "../../components/movieHeader/MovieHeader";
import { isEmpty } from "../../utils/helperFunction";
import MovieList from "../../components/movieList/MovieList";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import useScroll from "../../hooks/useScroll";
import EmptyState from "../../components/emptyState/EmptyState";

function Movies() {
  const dispatch = useDispatch();
  const scroll = useScroll();
  const effectRan = useRef(false);

  const { movies, fetchStatus, page } = useSelector((state) => state.movies);

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

  return (
    <>
      {isEmpty(movies) && fetchStatus === "success" ? (
        <EmptyState
          desc="Sorry, we couldn't find any match"
          isSearchEmpty={true}
        />
      ) : (
        <div data-testid="movie-pg">
          <MovieHeader
            data={isEmpty(movies) ? {} : movies[0]}
            fetchStatus={fetchStatus}
          />
          <MovieList loadMorePage={loadMorePage} />
          <ScrollToTop scroll={scroll} />
        </div>
      )}
    </>
  );
}

export default Movies;
