import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, useThemeContext } from '../../app/contexts/ThemeContext';

const TestComponent = () => {
    const { theme, toggleTheme } = useThemeContext();
    return (
        <div>
            <span>{theme}</span>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

describe('ThemeContext', () => {
    it('renders children without crashing', () => {
        render(
            <ThemeProvider>
                <div data-testid='child'>Hello</div>
            </ThemeProvider>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('provides the default theme as "light"', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByText('light')).toBeInTheDocument();
    });

    it('toggles theme between "light" and "dark"', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByText('light')).toBeInTheDocument();

        act(() => {
            screen.getByText('Toggle Theme').click();
        });
        expect(screen.getByText('dark')).toBeInTheDocument();
        act(() => {
            screen.getByText('Toggle Theme').click();
        });
        expect(screen.getByText('light')).toBeInTheDocument();
    });

    it('throws an error when useThemeContext is used outside of ThemeProvider', () => {
        const TestComponent = () => {
            try {
                useThemeContext();
                return <div>No Error</div>;
            } catch (e) {
                return <div>Error</div>;
            }
        };

        render(<TestComponent />);
        expect(screen.getByText('Error')).toBeInTheDocument();
    });
});
