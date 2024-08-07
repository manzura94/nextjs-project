import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home, { Book } from '../pages/index';
import mockRouter from 'next-router-mock';

vi.mock('../contexts/ThemeContext', () => ({
    useThemeContext: vi.fn().mockReturnValue({ theme: 'light' }),
}));

vi.mock('next/router', () => require('next-router-mock'));

const mockBooks: Book[] = [
    { uid: '1', title: 'Book One', numberOfPages: 123, publishedMonth: 1, publishedYear: 2020 },
    { uid: '2', title: 'Book Two', numberOfPages: 456, publishedMonth: 2, publishedYear: 2021 },
];

describe('Home Component', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl('/?page=1');
    });

    it('renders correctly with provided books', () => {
        render(<Home books={mockBooks} currentPage={1} />);

        expect(screen.getByText('Book One')).to.exist;
        expect(screen.getByText('Book Two')).to.exist;
        expect(screen.getByTestId('prev-button')).to.exist;
        expect(screen.getByTestId('next-button')).to.exist;
    });
});
