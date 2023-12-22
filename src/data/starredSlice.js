import { createSlice } from "@reduxjs/toolkit"

const starredSlice = createSlice({
    name: 'starred',
    initialState: {
        starredMovies: []
    },
    reducers: {
        starMovie: (state, action) => {
            //Consider checking whether the movie already exists before adding. it's good practice even if it would be checked before dispatch
            state.starredMovies = [action.payload, ...state.starredMovies]
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

export default starredSlice
