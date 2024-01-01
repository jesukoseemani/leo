import watchLaterSlice, { addToWatchLater, removeFromWatchLater, removeAllWatchLater } from '../data/watchLaterSlice';
import { moviesMock } from './movies.mocks';

describe('watchLaterSlice test', () => {
  describe('initial state', () => {
    it('should set initial state', () => {
      const initialState = watchLaterSlice.reducer(undefined, { type: '' });
      expect(initialState).toEqual({ watchLaterMovies: [] });
    });
  });

  describe('watchLaterMovies management', () => {
    it('should add movie to watch later', () => {
      const initialState = { watchLaterMovies: [] };
      const action = addToWatchLater(moviesMock[0]);
      const result = watchLaterSlice.reducer(initialState, action);
      expect(result.watchLaterMovies).toEqual([moviesMock[0]]);
    });

    it('should remove movie from watch later', () => {
      const initialState = { watchLaterMovies: [moviesMock[0], moviesMock[1]] };
      const action = removeFromWatchLater(moviesMock[0]);
      const result = watchLaterSlice.reducer(initialState, action);
      expect(result.watchLaterMovies).toEqual([moviesMock[1]]);
    });

    it('should remove all movies', () => {
      const initialState = { watchLaterMovies: [moviesMock[0], moviesMock[1]] };
      const action = removeAllWatchLater();
      const result = watchLaterSlice.reducer(initialState, action);
      expect(result.watchLaterMovies).toEqual([]);
    });
  });
});

