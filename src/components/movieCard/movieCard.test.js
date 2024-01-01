import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieCard from './MovieCard';

// Mock any external dependencies like useDispatch and useToast
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));
jest.mock('../../hooks/useToast', () => jest.fn());

describe('MovieCard Component', () => {
    const movie = {
        id: 123,
        overview: 'Movie overview',
        poster_path: 'poster.jpg',
        title: 'Movie Title',
        vote_average: 8.5,
        backdrop_path: 'backdrop.jpg',
        release_date: '2022-01-01',
    };

    it('renders MovieCard correctly', () => {
        render(<MovieCard movie={movie} />);

        expect(screen.getByText('Movie Title')).toBeInTheDocument();
        expect(screen.getByText('Movie overview')).toBeInTheDocument();
        expect(screen.getByText('8.5')).toBeInTheDocument();
    });

    it('handles like click', () => {
        render(<MovieCard movie={movie} />);
        fireEvent.click(screen.getByTestId('like-icon')); fireEvent.click(screen.getByText('Love Icon'));


        expect(screen.getByTestId('like-icon')).toHaveClass('liked');
    });

    it('handles stream click', () => {
        render(<MovieCard movie={movie} />);

        userEvent.click(screen.getByText('Stream movie'));

    });

    it('handles watch later click', () => {
        render(<MovieCard movie={movie} />);

        userEvent.click(screen.getByText('Add to watchlist'));


    });
});
