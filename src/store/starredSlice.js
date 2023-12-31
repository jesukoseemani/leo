import { createSlice } from "@reduxjs/toolkit"

const starredSlice = createSlice({
    name: 'starred',
    initialState: {
        starredMovies: []
    },
    reducers: {
        starMovie: (state, action) => {
            const movieToAdd = action.payload;

            const isAlreadyStarred = state.starredMovies.some(movie => movie.id === movieToAdd.id);

            if (!isAlreadyStarred) {
                state.starredMovies = [movieToAdd, ...state.starredMovies];
            }

        },
        unstarMovie: (state, action) => {
            const indexOfId = state.starredMovies.findIndex(key => key.id === action.payload.id)
            state.starredMovies.splice(indexOfId, 1)
        },
        clearAllStarred: (state) => {
            state.starredMovies = []
        },
    },
})

export const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions


export default starredSlice
