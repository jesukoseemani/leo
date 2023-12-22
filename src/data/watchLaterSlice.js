import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice = createSlice({
  name: "watch-later",
  initialState: {
    watchLaterMovies: [],
  },
  reducers: {
    addToWatchLater: (state, action) => {
      //Consider checking whether the movie already exists before adding. it's good practice even if it would be checked before dispatch
      state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
    },
    removeFromWatchLater: (state, action) => {
      const indexOfId = state.watchLaterMovies.findIndex((key) => key.id === action.payload.id);
      state.watchLaterMovies.splice(indexOfId, 1);
    },
    //Consider correcting this typo, could cause confusion
    remveAllWatchLater: (state) => {
      state.watchLaterMovies = [];
    },
  },
});

export default watchLaterSlice;
