// Navbar.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Install this package if not installed

import Navbar from './Navbar';
import { fetchMovies } from '../../store/moviesSlice';

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
    starred: { starredMovies: [] },
    watchLater: { watchLaterMovies: [] },
};
const store = mockStore(initialState);

test('renders Navbar component with logo and links', () => {
    const history = createMemoryHistory();

    render(
        <Provider store={store}>
            <Router history={history}>
                <Navbar />
            </Router>
        </Provider>
    );

    expect(screen.getByText('ML')).toBeInTheDocument();

    expect(screen.getByText('FAVOURITES')).toBeInTheDocument();
    expect(screen.getByText('WATCH LATER')).toBeInTheDocument();
});

test('clicking on logo navigates to /movies', () => {
    const history = createMemoryHistory();

    render(
        <Provider store={store}>
            <Router history={history}>
                <Navbar />
            </Router>
        </Provider>
    );

    fireEvent.click(screen.getByText('ML'));

    // Ensure that clicking on the logo navigates to /movies
    expect(history.location.pathname).toBe('/movies');
});


