import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider, useThemeContext } from '../app/contexts/ThemeContext'; 


const TestComponent: React.FC = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <div>
            <p>Current Theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};


const NoProviderComponent: React.FC = () => {
    try {
        useThemeContext();
        return <p>No error thrown</p>;
    } catch (error) {
        return <p>{(error as Error).message}</p>;
    }
};

describe('ThemeContext', () => {
    it('should initialize with light theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByText('Current Theme: light')).toBeInTheDocument();
    });

    it('should toggle theme between light and dark', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );


        expect(screen.getByText('Current Theme: light')).toBeInTheDocument();


        fireEvent.click(screen.getByText('Toggle Theme'));
        expect(screen.getByText('Current Theme: dark')).toBeInTheDocument();


        fireEvent.click(screen.getByText('Toggle Theme'));
        expect(screen.getByText('Current Theme: light')).toBeInTheDocument();
    });

    it('should throw an error if useThemeContext is used outside of ThemeProvider', () => {
        render(<NoProviderComponent />);


        expect(screen.getByText('useContext must be used within a ThemeProvider')).toBeInTheDocument();
    });
});
