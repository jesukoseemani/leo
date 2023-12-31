import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice = createSlice({
  name: "watch-later",
  initialState: {
    watchLaterMovies: [],
  },
  reducers: {
    addToWatchLater: (state, action) => {
      const movieToAdd = action.payload;

      const isAlreadyOnWatchLater = state.watchLaterMovies.some(movie => movie.id === movieToAdd.id);

      if (!isAlreadyOnWatchLater) {
        state.watchLaterMovies = [movieToAdd, ...state.watchLaterMovies];
      }

    },
    removeFromWatchLater: (state, action) => {
      const indexOfId = state.watchLaterMovies.findIndex((key) => key.id === action.payload.id);
      state.watchLaterMovies.splice(indexOfId, 1);
    },
    removeAllWatchLater: (state) => {
      state.watchLaterMovies = [];
    },
  },
});

export const { addToWatchLater, removeFromWatchLater, removeAllWatchLater } = watchLaterSlice.actions


export default watchLaterSlice;
