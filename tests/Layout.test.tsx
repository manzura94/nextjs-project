import { render } from '@testing-library/react';
import React from 'react';
import App, { Layout } from '../app/root';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('@remix-run/react', () => ({
    Meta: () => <meta />,
    Links: () => <link />,
    ScrollRestoration: () => <div />,
    Scripts: () => <script />,

    Outlet: () => <div>Outlet Content</div>,
}));

vi.mock('./contexts/ThemeContext', () => ({
    ThemeProvider: ({ children }) => <div>{children}</div>,
}));

describe('Layout Component', () => {
    it('should render Meta, Links, and children correctly', () => {
        const { getByText, container } = render(
            <Layout>
                <div>Test Content</div>
            </Layout>
        );

        expect(getByText('Test Content')).toBeInTheDocument();
        expect(container.querySelector('meta')).toBeInTheDocument();
        expect(container.querySelector('link')).toBeInTheDocument();
        expect(container.querySelector('script')).toBeInTheDocument();
    });
});

describe('App Component', () => {
    it('should render Outlet inside ThemeProvider', () => {
        const { getByText, container } = render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        expect(getByText('Outlet Content')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
