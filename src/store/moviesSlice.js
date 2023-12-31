import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        fetchStatus: '',
        page: 1,
        hasNextPage: true,
        totalPage: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = [...state.movies, action.payload.results]
            state.page = action.payload.page
            state.totalPage = action.payload.total_pages
            state.hasNextPage = action.payload.page === action.payload.total_pages ? false : true
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})


export default moviesSlice
