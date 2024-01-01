import starredSlice, { starMovie, unstarMovie, clearAllStarred } from '../data/starredSlice';
import { moviesMock } from './movies.mocks';

describe('starredSlice test', () => {
  describe('initial state', () => {
    it('should set an initial state', () => {
      const initialState = starredSlice.reducer(undefined, { type: '' });
      expect(initialState).toEqual({ starredMovies: [] });
    });
  });

  describe('starredMovies management', () => {
    it('should add movie to starred', () => {
      const initialState = { starredMovies: [] };
      const action = starMovie(moviesMock[0]);
      const result = starredSlice.reducer(initialState, action);
      expect(result.starredMovies).toEqual([moviesMock[0]]);
    });

    it('should remove movie from starred', () => {
      const initialState = { starredMovies: [moviesMock[0], moviesMock[1]] };
      const action = unstarMovie(moviesMock[0]);
      const result = starredSlice.reducer(initialState, action);
      expect(result.starredMovies).toEqual([moviesMock[1]]);
    });

    it('should remove all movies', () => {
      const initialState = { starredMovies: [moviesMock[0], moviesMock[1]] };
      const action = clearAllStarred();
      const result = starredSlice.reducer(initialState, action);
      expect(result.starredMovies).toEqual([]);
    });
  });
});
