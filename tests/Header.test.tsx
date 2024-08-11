import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Header } from '../app/components/Header';
import { ThemeContext } from '../app/contexts/ThemeContext';


const renderWithTheme = (ui: React.ReactElement, theme: 'light' | 'dark' = 'light', toggleTheme = vi.fn()) => {
    return render(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {ui}
        </ThemeContext.Provider>
    );
};

describe('Header Component', () => {
    it('renders correctly', () => {
        renderWithTheme(<Header />);
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByText('Book store')).toBeInTheDocument();
    });

    it('applies the correct theme based on the context', () => {
        renderWithTheme(<Header />, 'dark');
        const headerTitle = screen.getByText('Book store');
        expect(headerTitle).toHaveClass('_dark_8990ca');
    });

    it('toggles theme when the checkbox is clicked', () => {
        const toggleThemeMock = vi.fn();
        renderWithTheme(<Header />, 'light', toggleThemeMock);

        const checkbox = screen.getByTestId('theme-toggle-checkbox');
        fireEvent.click(checkbox);

        expect(toggleThemeMock).toHaveBeenCalledTimes(1);
    });

    it('checkbox is checked when theme is dark', () => {
        renderWithTheme(<Header />, 'dark');
        const checkbox = screen.getByTestId('theme-toggle-checkbox');
        expect(checkbox).toBeChecked();
    });

    it('checkbox is unchecked when theme is light', () => {
        renderWithTheme(<Header />, 'light');
        const checkbox = screen.getByTestId('theme-toggle-checkbox');
        expect(checkbox).not.toBeChecked();
    });
});
