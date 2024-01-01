import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

test('renders Movies component when the path is /movies', () => {
    render(
        <MemoryRouter initialEntries={['/movies']}>
            <AppRoutes />
        </MemoryRouter>
    );

    // Assuming Movies component renders some unique text
    expect(screen.getByText('Text unique to the Movies component')).toBeInTheDocument();
});

test('renders NotFound component when the path is unknown', () => {
    render(
        <MemoryRouter initialEntries={['/unknown']}>
            <AppRoutes />
        </MemoryRouter>
    );

    // Assuming NotFound component renders some unique text
    expect(screen.getByText('Text unique to the NotFound component')).toBeInTheDocument();
});
