import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/Header';
import { useThemeContext } from '../contexts/ThemeContext';

vi.mock('../contexts/ThemeContext', () => ({
    useThemeContext: vi.fn(),
}));

describe('Header Component', () => {
    it('toggles theme when the checkbox is clicked', () => {
        const mockToggleTheme = vi.fn();
        vi.mocked(useThemeContext).mockReturnValue({ theme: 'light', toggleTheme: mockToggleTheme });

        render(<Header />);

        const toggle = screen.getByTestId('theme-toggle-checkbox') as HTMLInputElement;
        expect(toggle).not.toBeNull();
        expect(toggle.checked).toBe(false);

        fireEvent.click(toggle);

        expect(mockToggleTheme).toHaveBeenCalledOnce();
    });
});
