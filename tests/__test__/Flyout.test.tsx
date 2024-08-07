import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Flyout from '../../app/components/Flyout';
import { useThemeContext } from '../../app/contexts/ThemeContext';
import { Book } from '../../app/page';

const mockBooks: Book[] = [
    { uid: '1', title: 'Book One', numberOfPages: 123, publishedMonth: 1, publishedYear: 2020 },
    { uid: '2', title: 'Book Two', numberOfPages: 456, publishedMonth: 2, publishedYear: 2021 },
];

vi.mock('../../app/contexts/ThemeContext', () => ({
    useThemeContext: vi.fn(),
}));

describe('Flyout Component', () => {
    beforeEach(() => {
        vi.mocked(useThemeContext).mockReturnValue({ theme: 'light', toggleTheme: () => {} });
        global.URL.createObjectURL = vi.fn(() => 'mocked-url');
    });

    it('renders correctly with initial props', () => {
        const setSelectedItem = vi.fn();
        render(<Flyout selectedItem={mockBooks} setSelectedItem={setSelectedItem} />);

        expect(screen.getByText('selected 2 items')).toBeInTheDocument();
    });

    it('calls setSelectedItem with an empty array when Unselect All is clicked', () => {
        const setSelectedItem = vi.fn();
        render(<Flyout selectedItem={mockBooks} setSelectedItem={setSelectedItem} />);

        fireEvent.click(screen.getByText('Unselect All'));

        expect(setSelectedItem).toHaveBeenCalledWith([]);
    });

    it('creates a download link when Download is clicked', () => {
        const setSelectedItem = vi.fn();
        render(<Flyout selectedItem={mockBooks} setSelectedItem={setSelectedItem} />);

        const downloadButton = screen.getByTestId('download-button');
        fireEvent.click(downloadButton);

        expect(downloadButton).toHaveAttribute('href', 'mocked-url');
        expect(downloadButton).toHaveAttribute('download', '2__items.csv');
    });

    it('does not create a download link when there are no selected items', () => {
        const setSelectedItem = vi.fn();
        render(<Flyout selectedItem={[]} setSelectedItem={setSelectedItem} />);

        const downloadButton = screen.getByTestId('download-button');
        fireEvent.click(downloadButton);

        expect(downloadButton).not.toHaveAttribute('href');
    });
});
