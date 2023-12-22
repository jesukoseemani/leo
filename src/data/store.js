import { configureStore } from "@reduxjs/toolkit"
import moviesSlice from './moviesSlice'
import starredSlice from './starredSlice'
import watchLaterSlice from './watchLaterSlice'

const store = configureStore({
    //Since Starred and watchlater array are been stored in local state and can be lost upon refresh, Consider using the persist store feature form redux toolkit with session storage as better way to store the array on the computer.
    reducer: {
        movies: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer
    },
})

export default store
