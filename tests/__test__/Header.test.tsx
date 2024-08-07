import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Header } from '../../app/components/Header';
import { useThemeContext } from '../../app/contexts/ThemeContext';

vi.mock('../../app/contexts/ThemeContext', () => ({
    useThemeContext: vi.fn(),
}));

describe('Header Component', () => {
    it('toggles theme when the checkbox is clicked', () => {
        const mockToggleTheme = vi.fn();
        (useThemeContext as jest.Mock).mockReturnValue({ theme: 'light', toggleTheme: mockToggleTheme });

        render(<Header />);

        const checkbox = screen.getByTestId('theme-toggle-checkbox');
        fireEvent.click(checkbox);

        expect(mockToggleTheme).toHaveBeenCalled();
    });
});
