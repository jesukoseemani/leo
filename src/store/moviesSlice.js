import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
});


const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: {},
        fetchStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
