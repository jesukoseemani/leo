import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import WatchLater from "../pages/watchLater/WatchLater";
import { getTestLayout, renderWithProviders } from "../utils/test.helpers";
import { testData } from "../utils/data";
import watchLaterSlice, {
  removeAllWatchLater,
  removeFromWatchLater,
} from "../store/watchLaterSlice";
import MovieCard from "../components/movieCard/MovieCard";
import modalSlice, { openModal } from "../store/modalSlice";

describe("watch later page", () => {
  describe("ui", () => {
    let element;
    beforeEach(() => {
      element = getTestLayout(<WatchLater />, "redux-react-router");
    });

    it("should show the watch later page", () => {
      render(element);
      expect(element).not.toBeNull();
    });

    it("should show the watch later page title", () => {
      render(element);
      const header = screen.getByRole("heading");
      expect(header).toHaveTextContent("watchlist");
    });
  });

  describe("watch later page functionality", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it("should show a text for empty list when the watch later list is empty", () => {
      renderWithProviders(<WatchLater />);

      const emptyListText = screen.getByTestId("empty_list_desc");
      expect(emptyListText).toHaveTextContent(
        "Sorry!!, your watchlist list is empty"
      );
    });

    it("should render the right amount of watch later movie cards when there is data", () => {
      renderWithProviders(<WatchLater />, {
        preloadedState: {
          watchLater: testData.watchLaterSlice.watchLaterAvailableDataState,
        },
      });

      const watchListContainer = screen.getByTestId("page-list-container");
      expect(watchListContainer.childNodes.length).toBe(
        testData.watchLaterSlice.watchLaterAvailableDataState.watchLaterMovies
          .length
      );
    });

    it("should show a button to clear watch list when list has data", () => {
      renderWithProviders(<WatchLater />, {
        preloadedState: {
          watchLater: testData.watchLaterSlice.watchLaterAvailableDataState,
        },
      });

      const emptyListText = screen.getByRole("button", {
        name: "Clear All",
      });
      expect(emptyListText).toBeInTheDocument();
    });

    it("should clear the watch list state when the button to clear all watch later data is clicked", () => {
      renderWithProviders(<WatchLater />, {
        preloadedState: {
          watchLater: testData.watchLaterSlice.watchLaterAvailableDataState,
        },
      });

      const emptyListText = screen.getByRole("button", {
        name: "Clear All",
      });
      fireEvent.click(emptyListText);

      const watchListReducerState = watchLaterSlice.reducer(
        testData.watchLaterSlice.watchLaterAvailableDataState,
        removeAllWatchLater()
      );

      expect(watchListReducerState.watchLaterMovies.length).toBe(0);
    });
  });

  describe("movie card", () => {
    const itShouldShowTheNameOfASavedMovie = idx =>
      it(`should show the name of a saved movie in the ${idx} index of the watch later list data`, () => {
        const element = getTestLayout(
          <MovieCard
            movie={
              testData.watchLaterSlice.watchLaterAvailableDataState
                .watchLaterMovies[idx]
            }
            data={
              testData.watchLaterSlice.watchLaterAvailableDataState
                .watchLaterMovies
            }
          />,
          "redux-react-router"
        );
        render(element);
        const movieName = screen.getByRole("heading");

        expect(movieName).toHaveTextContent(
          testData.watchLaterSlice.watchLaterAvailableDataState
            .watchLaterMovies[idx].title
        );
      });

    const itShouldShowTheRatingsOfASavedMovie = idx =>
      it(`should show the ratings of a saved movie in the ${idx} index of the watch later list data`, () => {
        const element = getTestLayout(
          <MovieCard
            movie={
              testData.watchLaterSlice.watchLaterAvailableDataState
                .watchLaterMovies[idx]
            }
            data={
              testData.watchLaterSlice.watchLaterAvailableDataState
                .watchLaterMovies
            }
          />,
          "redux-react-router"
        );
        render(element);
        const movieName = screen.getByTestId("movie-card-rating");

        expect(movieName).toHaveTextContent(
          testData.watchLaterSlice.watchLaterAvailableDataState
            .watchLaterMovies[idx].vote_average
        );
      });

    const itShouldShowTheAppropriateIconForAWatchLaterMovie = (
      action,
      data_testid
    ) => {
      it(`should show the button to ${action} a movie from the watch later list on a movie card`, () => {
        const element = getTestLayout(
          <MovieCard
            handler="watchlist"
            movie={
              testData.watchLaterSlice.watchLaterAvailableDataState
                .watchLaterMovies[0]
            }
            data={
              testData.watchLaterSlice.watchLaterAvailableDataState
                .watchLaterMovies
            }
          />,
          "redux-react-router"
        );
        render(element);

        const button = screen.getByTestId(data_testid);
        expect(button).toBeInTheDocument();
      });
    };

    const itShouldRemoveAMovieFromTheWatchLaterListWhenDeleteButtonIsClicked =
      id => {
        it(`should remove a movie with ${id} id from the watch later list when the remove button is clicked`, () => {
          renderWithProviders(
            <MovieCard
              handler="watchlist"
              movie={
                testData.watchLaterSlice.watchLaterAvailableDataState
                  .watchLaterMovies[0]
              }
              data={
                testData.watchLaterSlice.watchLaterAvailableDataState
                  .watchLaterMovies
              }
            />,
            {
              preloadedState: {
                watchLater:
                  testData.watchLaterSlice.watchLaterAvailableDataState,
              },
            }
          );

          const button = screen.getByTestId("remove-movie-icon");
          fireEvent.click(button);

          const watchListReducerState = watchLaterSlice.reducer(
            testData.watchLaterSlice.watchLaterAvailableDataState,
            removeFromWatchLater({
              id,
            })
          );

          expect(watchListReducerState.watchLaterMovies.length).toBe(1);
        });
      };

    itShouldShowTheNameOfASavedMovie(0);
    itShouldShowTheNameOfASavedMovie(1);

    itShouldShowTheRatingsOfASavedMovie(0);
    itShouldShowTheRatingsOfASavedMovie(1);

    itShouldShowTheAppropriateIconForAWatchLaterMovie(
      "remove",
      "remove-movie-icon"
    );
    itShouldShowTheAppropriateIconForAWatchLaterMovie(
      "play",
      "play-movie-icon"
    );
    itShouldRemoveAMovieFromTheWatchLaterListWhenDeleteButtonIsClicked(27205);
    itShouldRemoveAMovieFromTheWatchLaterListWhenDeleteButtonIsClicked(27204);

    it("should update the state to open the modal to view a movie when the play button is clicked", () => {
      renderWithProviders(
        <MovieCard
          handler="watchlist"
          movie={
            testData.watchLaterSlice.watchLaterAvailableDataState
              .watchLaterMovies[0]
          }
          data={
            testData.watchLaterSlice.watchLaterAvailableDataState
              .watchLaterMovies
          }
        />,
        {
          preloadedState: {
            watchLater: testData.watchLaterSlice.watchLaterAvailableDataState,
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
