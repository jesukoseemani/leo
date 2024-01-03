import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { getTestLayout, renderWithProviders } from "../utils/test.helpers";
import { testData } from "../utils/data";
import watchLaterSlice, { removeAllWatchLater } from "../store/watchLaterSlice";
import MovieCard from "../components/movieCard/MovieCard";
import modalSlice, { openModal } from "../store/modalSlice";
import Favourites from "../pages/favourites/Favourites";
import starredSlice, { unstarMovie } from "../store/starredSlice";

describe("favourites page", () => {
  describe("ui", () => {
    let element;
    beforeEach(() => {
      element = getTestLayout(<Favourites />, "redux-react-router");
    });

    afterEach(() => {
      cleanup();
    });

    it("should show the favourites page", () => {
      render(element);
      expect(element).not.toBeNull();
    });

    it("should show the favourites page title", () => {
      render(element);
      const header = screen.getByRole("heading");
      expect(header).toHaveTextContent("favourite");
    });
  });

  describe("favourites page functionality", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it("should show a text for empty list when the favourites list is empty", () => {
      renderWithProviders(<Favourites />);
      starredSlice.reducer(testData.starred.starredEmptyState, {
        type: "unknown",
      });

      const emptyListText = screen.getByTestId("empty_list_desc");
      expect(emptyListText).toHaveTextContent(
        "Sorry!!, your favourites list is empty"
      );
    });

    it("should render the right amount of favourites movie cards when there is data", () => {
      renderWithProviders(<Favourites />, {
        preloadedState: {
          starred: testData.starred.starredAvailableDataState,
        },
      });

      const starredListContainer = screen.getByTestId("page-list-container");
      expect(starredListContainer.childNodes.length).toBe(
        testData.starred.starredAvailableDataState.starredMovies.length
      );
    });

    it("should show a button to clear the favourite list when list has data", () => {
      renderWithProviders(<Favourites />, {
        preloadedState: {
          starred: testData.starred.starredAvailableDataState,
        },
      });

      const emptyListText = screen.getByRole("button", {
        name: "Clear All",
      });
      expect(emptyListText).toBeInTheDocument();
    });

    it("should clear the the favorite list state when the button to clear all watch later data is clicked", () => {
      renderWithProviders(<Favourites />, {
        preloadedState: {
          starred: testData.starred.starredAvailableDataState,
        },
      });

      const emptyListText = screen.getByRole("button", {
        name: "Clear All",
      });
      fireEvent.click(emptyListText);

      const favouritesListReducerState = watchLaterSlice.reducer(
        testData.starred.starredAvailableDataState,
        removeAllWatchLater()
      );

      expect(favouritesListReducerState.watchLaterMovies.length).toBe(0);
    });
  });

  describe("movie card", () => {
    const itShouldShowTheNameOfAFavoriteMovie = idx =>
      it(`should show the name of a favorite movie in the ${idx} index of the favorites list data`, () => {
        const element = getTestLayout(
          <MovieCard
            movie={
              testData.starred.starredAvailableDataState.starredMovies[idx]
            }
            data={testData.starred.starredAvailableDataState.starredMovies}
          />,
          "redux-react-router"
        );
        render(element);
        const movieName = screen.getByRole("heading");

        expect(movieName).toHaveTextContent(
          testData.starred.starredAvailableDataState.starredMovies[idx].title
        );
      });

    const itShouldShowTheRatingsOfASavedMovie = idx =>
      it(`should show the ratings of a saved movie in the ${idx} index of the favorites list data`, () => {
        const element = getTestLayout(
          <MovieCard
            handler="favourites"
            movie={
              testData.starred.starredAvailableDataState.starredMovies[idx]
            }
            data={testData.starred.starredAvailableDataState.starredMovies}
          />,
          "redux-react-router"
        );
        render(element);
        const movieName = screen.getByTestId("movie-card-rating");

        expect(movieName).toHaveTextContent(
          testData.starred.starredAvailableDataState.starredMovies[idx]
            .vote_average
        );
      });

    const itShouldShowTheAppropriateIconForAFavoriteMovie = (
      action,
      data_testid
    ) => {
      it(`should show the button to ${action} a movie from the favorites list on a movie card`, () => {
        const element = getTestLayout(
          <MovieCard
            handler="favourites"
            movie={testData.starred.starredAvailableDataState.starredMovies[0]}
            data={testData.starred.starredAvailableDataState.starredMovies}
          />,
          "redux-react-router"
        );
        render(element);

        const button = screen.getByTestId(data_testid);
        expect(button).toBeInTheDocument();
      });
    };

    const itShouldRemoveAMovieWithIDFromTheFavoritesListWhenDeleteButtonIsClicked =
      id => {
        it(`should un-star a movie with ${id} id from the favorites list when the like button is clicked`, () => {
          renderWithProviders(
            <MovieCard
              handler="favourites"
              movie={
                testData.starred.starredAvailableDataState.starredMovies[0]
              }
              data={testData.starred.starredAvailableDataState.starredMovies}
            />,
            {
              preloadedState: {
                starred: testData.starred.starredAvailableDataState,
              },
            }
          );

          const button = screen.getByTestId("like-icon");
          fireEvent.click(button);

          const starredListReducerState = starredSlice.reducer(
            testData.starred.starredAvailableDataState,
            unstarMovie({
              id,
            })
          );

          expect(starredListReducerState.starredMovies.length).toBe(1);
          expect(starredListReducerState.starredMovies[0].id).not.toBe(id);
        });
      };

    itShouldShowTheNameOfAFavoriteMovie(0);
    itShouldShowTheNameOfAFavoriteMovie(1);

    itShouldShowTheRatingsOfASavedMovie(0);
    itShouldShowTheRatingsOfASavedMovie(1);

    itShouldShowTheAppropriateIconForAFavoriteMovie(
      "remove",
      "remove-movie-icon"
    );
    itShouldShowTheAppropriateIconForAFavoriteMovie("play", "play-movie-icon");
    itShouldRemoveAMovieWithIDFromTheFavoritesListWhenDeleteButtonIsClicked(
      27205
    );
    itShouldRemoveAMovieWithIDFromTheFavoritesListWhenDeleteButtonIsClicked(
      27204
    );

    it("should update the state to open the modal to view a movie when the play button is clicked", () => {
      renderWithProviders(
        <MovieCard
          handler="favourites"
          movie={testData.starred.starredAvailableDataState.starredMovies[0]}
          data={testData.starred.starredAvailableDataState.starredMovies}
        />,
        {
          preloadedState: {
            starred: testData.starred.starredAvailableDataState,
            modal: testData.modal.modalClosedState,
          },
        }
      );

      const button = screen.getByTestId("play-movie-icon");
      fireEvent.click(button);

      const modalReducerState = modalSlice.reducer(
        testData.modal.modalClosedState,
        openModal({
          isModalOpen: true,
          isModalType: "VideoModal",
          isModalProps: 27204,
        })
      );

      expect(modalReducerState.isModalOpen).toBe(true);
    });
  });
});
