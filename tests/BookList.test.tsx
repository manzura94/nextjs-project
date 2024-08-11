import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BookList } from '../app/components/BookList';
import { Book } from '../app/types/types';
import { ThemeContext } from '../app/contexts/ThemeContext';

const books: Book[] = [
    { uid: '1', title: 'Book 1', numberOfPages: 100, publishedMonth: 1, publishedYear: 2021 },
    { uid: '2', title: 'Book 2', numberOfPages: 200, publishedMonth: 2, publishedYear: 2022 },
];

const setSelectedItem = vi.fn();

const renderWithTheme = (ui: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
    return render(<ThemeContext.Provider value={{ theme, toggleTheme: () => {} }}>{ui}</ThemeContext.Provider>);
};

describe('BookList Component', () => {
    it('renders "Loading..." when menu is empty', () => {
        renderWithTheme(<BookList menu={[]} selectedItem={[]} setSelectedItem={setSelectedItem} />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders a list of books correctly', () => {
        renderWithTheme(<BookList menu={books} selectedItem={[]} setSelectedItem={setSelectedItem} />);

        expect(screen.getByText('Book 1')).toBeInTheDocument();
        expect(screen.getByText('Book 2')).toBeInTheDocument();
        expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    });

    it('allows selecting and deselecting books', () => {
        const selectedBooks: Book[] = [];
        const setSelectedItemMock = vi.fn((newSelection) => selectedBooks.push(...newSelection));

        renderWithTheme(<BookList menu={books} selectedItem={selectedBooks} setSelectedItem={setSelectedItemMock} />);


        fireEvent.click(screen.getByText('Book 1'));
        expect(setSelectedItemMock).toHaveBeenCalledWith([books[0]]);


        fireEvent.click(screen.getByText('Book 1'));
        expect(setSelectedItemMock).toHaveBeenCalledWith([]);
    });

    it('applies the correct theme based on the context', () => {
        renderWithTheme(<BookList menu={books} selectedItem={[]} setSelectedItem={setSelectedItem} />, 'dark');

        const bookWrapper = screen.getByText('Book 1').closest('div');
        expect(bookWrapper).toHaveClass('_dark_a74c1c');
    });
});
