import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Pagination } from '../app/components/Pagination';
import { ThemeProvider } from '../app/contexts/ThemeContext';
import { PageProps } from '../app/types/types';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

const renderWithProviders = (ui: React.ReactElement, { theme = 'light', currentPage = 1, setCurrentPage = vi.fn(), PageProps = {} as PageProps } = {}) => {
    return render(
        <MemoryRouter>
            <ThemeProvider>{React.cloneElement(ui, PageProps)}</ThemeProvider>
        </MemoryRouter>
    );
};

describe('Pagination Component', () => {
    const mockedNavigate = vi.fn();

    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(mockedNavigate);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly', () => {
        renderWithProviders(<Pagination currentPage={1} setCurrentPage={vi.fn()} />);
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('prev button is disabled on the first page', () => {
        renderWithProviders(<Pagination currentPage={1} setCurrentPage={vi.fn()} />);
        expect(screen.getByTestId('prev-button')).toBeDisabled();
    });

    it('next button is disabled on the last page', () => {
        renderWithProviders(<Pagination currentPage={10} setCurrentPage={vi.fn()} />);
        expect(screen.getByTestId('next-button')).toBeDisabled();
    });

    it('navigates to the next page on next button click', () => {
        const setCurrentPageMock = vi.fn();
        renderWithProviders(<Pagination currentPage={1} setCurrentPage={setCurrentPageMock} />);

        const nextButton = screen.getByTestId('next-button');
        fireEvent.click(nextButton);

        expect(setCurrentPageMock).toHaveBeenCalledWith(2);
        expect(mockedNavigate).toHaveBeenCalledWith('/?page=2');
    });

    it('navigates to the previous page on prev button click', () => {
        const setCurrentPageMock = vi.fn();
        renderWithProviders(<Pagination currentPage={2} setCurrentPage={setCurrentPageMock} />);

        const prevButton = screen.getByTestId('prev-button');
        fireEvent.click(prevButton);

        expect(setCurrentPageMock).toHaveBeenCalledWith(1);
        expect(mockedNavigate).toHaveBeenCalledWith('/?page=1');
    });

    it('applies the correct theme class', () => {
        renderWithProviders(<Pagination currentPage={1} setCurrentPage={vi.fn()} />, { theme: 'dark' });

        const paginationContainer = screen.getByTestId('pagination');
        expect(paginationContainer).toHaveClass('_light_049736');
    });
});
