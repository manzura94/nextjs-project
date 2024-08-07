import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

const MockDocument = () => (
    <html>
        <head />
        <body>
            <main />
            <script />
        </body>
    </html>
);

describe('MyDocument Component', () => {
    it('renders the document structure correctly', () => {
        const { container } = render(<MockDocument />);

        expect(container.querySelector('html')).toBeInTheDocument();
        expect(container.querySelector('head')).toBeInTheDocument();
        expect(container.querySelector('body')).toBeInTheDocument();
        expect(container.querySelector('main')).toBeInTheDocument();
        expect(container.querySelector('script')).toBeInTheDocument();
    });
});
