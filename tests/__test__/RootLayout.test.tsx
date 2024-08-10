import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RootLayout from '../../app/layout';
import React from 'react';

describe('RootLayout Component', () => {
    it('renders children correctly', () => {
        render(
            <RootLayout>
                <div data-testid='child'>Test Child</div>
            </RootLayout>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });



    it('renders ThemeProvider correctly', () => {
        render(
            <RootLayout>
                <div data-testid='child'>Test Child</div>
            </RootLayout>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();  
    });
});
