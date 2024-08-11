import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from '../app/components/Flyout';
import { ThemeProvider } from '../app/contexts/ThemeContext';
import { Props } from '../app/types/types';
import React from 'react';

beforeAll(() => {
    vi.stubGlobal('URL', {
        createObjectURL: vi.fn(() => 'mock-url'),
        revokeObjectURL: vi.fn(),
    });
});

afterEach(() => {
    vi.restoreAllMocks();
});

const renderWithProviders = (ui: React.ReactElement, props: Props) => {
    return render(<ThemeProvider>{React.cloneElement(ui, props)}</ThemeProvider>);
};

describe('Flyout Component', () => {
    it('renders correctly and shows the correct number of selected items', () => {
        const selectedItem = [{ uid: '1', title: 'Book 1', numberOfPages: 100, publishedMonth: 1, publishedYear: 2021 }];

        renderWithProviders(<Flyout selectedItem={selectedItem} setSelectedItem={vi.fn()} />, {
            selectedItem,
            setSelectedItem: vi.fn(),
        });

        expect(screen.getByText('selected 1 item')).toBeInTheDocument();
    });

    it('calls setSelectedItem when Unselect All button is clicked', () => {
        const setSelectedItem = vi.fn();
        const selectedItem = [{ uid: '1', title: 'Book 1', numberOfPages: 100, publishedMonth: 1, publishedYear: 2021 }];

        renderWithProviders(<Flyout selectedItem={selectedItem} setSelectedItem={setSelectedItem} />, {
            selectedItem,
            setSelectedItem,
        });

        fireEvent.click(screen.getByText('Unselect All'));
        expect(setSelectedItem).toHaveBeenCalledWith([]);
    });

    it('generates a download link and triggers download', () => {
        const selectedItem = [
            { uid: '1', title: 'Book 1', numberOfPages: 100, publishedMonth: 1, publishedYear: 2021 },
            { uid: '2', title: 'Book 2', numberOfPages: 200, publishedMonth: 2, publishedYear: 2022 },
        ];

        renderWithProviders(<Flyout selectedItem={selectedItem} setSelectedItem={vi.fn()} />, {
            selectedItem,
            setSelectedItem: vi.fn(),
        });

        const downloadButton = screen.getByTestId('download-button');
        expect(downloadButton).toBeInTheDocument();
        expect(downloadButton).toHaveAttribute('href', 'mock-url');
        expect(downloadButton).toHaveAttribute('download', '2__items.csv');
    });
});
