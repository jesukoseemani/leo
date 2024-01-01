import moviesSlice, { fetchMovies } from '../data/moviesSlice'
import { moviesMock } from './movies.mocks'

describe('MovieSlice test', () => {
    it('should set loading true while action is pending', () => {
        const action = { type: fetchMovies.pending };
        const initialState = moviesSlice.reducer(
            {
                movies: [],
                fetchStatus: '',
            },
            action
        );
        expect(initialState.fetchStatus).toEqual('loading');
    });

    it('should return payload when action is fulfilled', () => {
        const action = {
            type: fetchMovies.fulfilled,
            payload: moviesMock,
        };
        const initialState = moviesSlice.reducer(
            {
                movies: [],
                fetchStatus: '',
            },
            action
        );
        expect(initialState.fetchStatus).toEqual('success');
        expect(initialState.movies).toEqual(moviesMock.results);
        expect(initialState.page).toEqual(moviesMock.page);
        expect(initialState.totalPage).toEqual(moviesMock.total_pages);
        expect(initialState.hasNextPage).toEqual(
            moviesMock.page === moviesMock.total_pages ? false : true
        );
    });

    it('should set error when action is rejected', () => {
        const action = { type: fetchMovies.rejected };
        const initialState = moviesSlice.reducer(
            {
                movies: [],
                fetchStatus: '',
            },
            action
        );
        expect(initialState.fetchStatus).toEqual('error');
    });
});
