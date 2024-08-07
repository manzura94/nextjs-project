import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BookList } from '../../app/components/BookList';
import { useThemeContext } from '../../app/contexts/ThemeContext';
import '@testing-library/jest-dom';

vi.mock('../../app/contexts/ThemeContext', () => ({
    useThemeContext: vi.fn(),
}));

const mockBooks = [
    { uid: '1', title: 'Book One', publishedMonth: 1, publishedYear: 2021, numberOfPages: 300 },
    { uid: '2', title: 'Book Two', publishedMonth: 2, publishedYear: 2022, numberOfPages: 250 },
];

describe('BookList Component', () => {
    it('displays loading message when menu is empty', () => {
        vi.mocked(useThemeContext).mockReturnValue({ theme: 'light', toggleTheme: () => {} });
        render(<BookList books={[]} menu={[]} setMenu={vi.fn()} selectedItem={[]} setSelectedItem={vi.fn()} />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders books and handles item selection', () => {
        const mockSetMenu = vi.fn();
        const mockSetSelectedItem = vi.fn();
        vi.mocked(useThemeContext).mockReturnValue({ theme: 'light', toggleTheme: () => {} });

        render(<BookList books={mockBooks} menu={mockBooks} setMenu={mockSetMenu} selectedItem={[]} setSelectedItem={mockSetSelectedItem} />);

        const bookItems = screen.getAllByText(/Book /);
        expect(bookItems.length).toBe(mockBooks.length);

        fireEvent.click(bookItems[0]);
        expect(mockSetSelectedItem).toHaveBeenCalledWith([mockBooks[0]]);
    });

    it('toggles selection when a book is clicked', () => {
        const mockSetSelectedItem = vi.fn();
        vi.mocked(useThemeContext).mockReturnValue({ theme: 'light', toggleTheme: () => {} });

        render(<BookList books={mockBooks} menu={mockBooks} setMenu={vi.fn()} selectedItem={[mockBooks[0]]} setSelectedItem={mockSetSelectedItem} />);

        fireEvent.click(screen.getByText(mockBooks[0].title));
        expect(mockSetSelectedItem).toHaveBeenCalledWith([]);
    });

    it('applies the correct theme class', () => {
        vi.mocked(useThemeContext).mockReturnValue({ theme: 'dark', toggleTheme: () => {} });

        render(<BookList books={mockBooks} menu={mockBooks} setMenu={vi.fn()} selectedItem={[]} setSelectedItem={vi.fn()} />);

        const container = screen.getByTestId('book-list-container');
        expect(container).toHaveClass('_books_container_1c6f8c'); 
    });
});
