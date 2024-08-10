import Home from '../../app/page';
import { ThemeProvider } from '../../app/contexts/ThemeContext';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

global.fetch = vi.fn();

vi.mock('./contexts/ThemeContext', () => ({
    useThemeContext: () => ({ theme: 'light' }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('./components/BookList', () => ({
    BookList: (props: any) => <div data-testid='book-list-container' {...props} />,
}));

vi.mock('./components/Header', () => ({
    Header: () => <header data-testid='header'>Header</header>,
}));

vi.mock('./components/Pagination', () => ({
    Pagination: (props: any) => <div data-testid='pagination' {...props} />,
}));

vi.mock('./components/Flyout', () => ({
    Flyout: (props: any) => <div data-testid='flyout' {...props} />,
}));

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        back: vi.fn(),
        prefetch: vi.fn(),
        events: {
            on: vi.fn(),
            off: vi.fn(),
            emit: vi.fn(),
        },
    }),
}));

describe('Home Component', () => {
    it('renders the component and fetches books', async () => {
        const mockBooks = {
            books: [
                { uid: '1', title: 'Book One', publishedMonth: 1, publishedYear: 2021, numberOfPages: 300 },
                { uid: '2', title: 'Book Two', publishedMonth: 2, publishedYear: 2022, numberOfPages: 250 },
            ],
        };

        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockBooks,
            status: 200,
            statusText: 'OK',
            headers: new Headers(),
            redirected: false,
            url: '',
            type: 'default',
        } as Response);

        render(
            <ThemeProvider>
                <Home />
            </ThemeProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('book-list-container')).toBeInTheDocument();
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('pagination')).toBeInTheDocument();
        });

        expect(screen.getByText('Book One')).toBeInTheDocument();
        expect(screen.getByText('Book Two')).toBeInTheDocument();
    });

    it('handles fetch failure', async () => {
        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
            headers: new Headers(),
            json: async () => ({ error: 'Failed to fetch data' }),
            redirected: false,
            url: '',
            type: 'default',
        } as Response);

        render(
            <ThemeProvider>
                <Home />
            </ThemeProvider>
        );

        await waitFor(() => {
            expect(screen.queryByText('Error fetching books:')).not.toBeInTheDocument();
        });
    });
});
