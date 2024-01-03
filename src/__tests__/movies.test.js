import "intersection-observer";
import { testData } from "../utils/data";
import Movies from "../pages/movies/Movies";
import { cleanup, render, screen } from "@testing-library/react";
import { getTestLayout, renderWithProviders } from "../utils/test.helpers";
import MovieHeader from "../components/movieHeader/MovieHeader";
import MovieList from "../components/movieList/MovieList";

describe("movies test", () => {
  describe("ui", () => {
    beforeEach(() => {
      window.scrollTo = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it("should show the movies page", () => {
      const element = getTestLayout(<Movies />, "redux-react-router");
      render(element);
      expect(element).not.toBeNull();
    });
  });

  describe("movies functionality", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it("should show the movie header and the title when there is data", () => {
      renderWithProviders(
        <MovieHeader
          data={testData.movies.moviesAvailableDataState.movies[0]}
          fetchStatus="success"
        />,
        {
          preloadedState: {
            movies: testData.movies.moviesAvailableDataState,
          },
        }
      );

      const movieHeaderHeadingText = screen.getByRole("heading", {
        name: testData.movies.moviesAvailableDataState.movies[0].title,
      });

      expect(movieHeaderHeadingText).toBeInTheDocument();
    });

    it("should show the movie header loader while data is fetching", () => {
      renderWithProviders(
        <MovieHeader
          data={testData.movies.moviesEmptyState.movies[0]}
          fetchStatus="loading"
        />,
        {
          preloadedState: {
            movies: {
              ...testData.movies.moviesEmptyState,
              fetchStatus: "loading",
            },
          },
        }
      );

      const movieHeaderLoader = screen.getByRole("progressbar");

      expect(movieHeaderLoader).toBeInTheDocument();
      expect(movieHeaderLoader).toHaveClass("skeleton");
    });

    it("should show the correct number of movie cards when there is data", async () => {
      renderWithProviders(<MovieList loadMorePage={jest.fn()} />, {
        preloadedState: {
          movies: testData.movies.moviesAvailableDataState,
        },
      });

      const movieListContainer = screen.getByTestId("movie-list-grid");
      expect(movieListContainer.childNodes).toHaveLength(
        testData.movies.moviesAvailableDataState.movies.length
      );
    });
  });
});
