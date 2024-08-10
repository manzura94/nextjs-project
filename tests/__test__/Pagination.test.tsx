import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useThemeContext } from '../../app/contexts/ThemeContext';
import { Pagination } from '../../app/components/Pagination';
import mockRouter from 'next-router-mock';

vi.mock('../../app/contexts/ThemeContext', () => ({
    useThemeContext: vi.fn(),
}));

vi.mock('next/navigation', () => ({
    useRouter: () => mockRouter,
}));

describe('Pagination Component', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl('/?page=1');
        vi.mocked(useThemeContext).mockReturnValue({ theme: 'light', toggleTheme() {} });
    });

    it('renders correctly with initial props', () => {
        render(<Pagination currentPage={1} setCurrentPage={vi.fn()} />);

        expect(screen.getByTestId('prev-button')).toBeInTheDocument();
        expect(screen.getByTestId('next-button')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByTestId('prev-button')).toBeDisabled();
    });

    it('navigates to the next page when next button is clicked', () => {
        render(<Pagination currentPage={1} setCurrentPage={vi.fn()} />);

        fireEvent.click(screen.getByTestId('next-button'));
        expect(mockRouter).toMatchObject({ asPath: '/?page=2' });
    });

    it('navigates to the previous page when prev button is clicked', () => {
        mockRouter.setCurrentUrl('/?page=2');
        render(<Pagination currentPage={2} setCurrentPage={vi.fn()} />);
        fireEvent.click(screen.getByTestId('prev-button'));
        expect(mockRouter).toMatchObject({ asPath: '/?page=1' });
    });

    it('disables next button on the last page', () => {
        render(<Pagination currentPage={10} setCurrentPage={vi.fn()} />);

        expect(screen.getByTestId('next-button')).toBeDisabled();
    });

    it('enables previous button when not on the first page', () => {
        render(<Pagination currentPage={2} setCurrentPage={vi.fn()} />);

        expect(screen.getByTestId('prev-button')).not.toBeDisabled();
    });
});
