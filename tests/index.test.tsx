import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Index from '../app/routes/_index';
import { ThemeProvider } from '../app/contexts/ThemeContext';
import { Book } from '../app/types/types';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import React from 'react';

const mockBooks: Book[] = [
    { uid: '1', title: 'Book 1', numberOfPages: 100, publishedMonth: 1, publishedYear: 2021 },
    { uid: '2', title: 'Book 2', numberOfPages: 200, publishedMonth: 2, publishedYear: 2022 },
];

vi.mock('@remix-run/react', () => ({
    ...vi.importActual('@remix-run/react'),
    useLoaderData: () => ({ books: mockBooks, page: 1 }),
}));

vi.mock('../components/BookList', () => ({
    BookList: ({ menu }) => (
        <div>
            {menu.map((book: Book) => (
                <div key={book.uid} data-testid='book-item'>
                    {book.title}
                </div>
            ))}
        </div>
    ),
}));

vi.mock('../components/Header', () => ({
    Header: () => <div>Header</div>,
}));

vi.mock('../components/Pagination', () => ({
    Pagination: ({ currentPage, setCurrentPage }) => (
        <div>
            <button onClick={() => setCurrentPage(currentPage - 1)}>prev</button>
            <span>{currentPage}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
        </div>
    ),
}));

vi.mock('../components/Flyout', () => ({
    Flyout: ({ selectedItem, setSelectedItem }) => (
        <div>
            <div data-testid='flyout'>{selectedItem.map((item: Book) => item.title).join(', ')}</div>
            <button onClick={() => setSelectedItem([])}>Close</button>
        </div>
    ),
}));

describe('Index Component', () => {
    beforeAll(() => {
        global.URL.createObjectURL = vi.fn();
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });

    it('renders correctly', () => {
        render(
            <MemoryRouter>
                <ThemeProvider>
                    <Index />
                </ThemeProvider>
            </MemoryRouter>
        );

        expect(screen.getByText('Book store')).toBeInTheDocument();
        expect(screen.getAllByTestId('book-item').length).toBe(mockBooks.length);
    });

    it('handles pagination correctly', () => {
        render(
            <MemoryRouter>
                <ThemeProvider>
                    <Index />
                </ThemeProvider>
            </MemoryRouter>
        );

        const nextButton = screen.getByText('next');
        fireEvent.click(nextButton);
        expect(screen.getByText('2')).toBeInTheDocument();

        const prevButton = screen.getByText('prev');
        fireEvent.click(prevButton);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('opens and closes the flyout correctly', () => {
        render(
            <MemoryRouter>
                <ThemeProvider>
                    <Index />
                </ThemeProvider>
            </MemoryRouter>
        );

        const bookItems = screen.getAllByTestId('book-item');
        fireEvent.click(bookItems[0]);

        expect(screen.getByTestId('flyout')).toBeInTheDocument();

        const closeButton = screen.getByText('Unselect All');
        fireEvent.click(closeButton);

        expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
    });
});
