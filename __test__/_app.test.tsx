import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MyApp from '../pages/_app';
import { NextRouter } from 'next/router';

const mockRouter: NextRouter = {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    beforePopState: vi.fn(),
    events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
    },
    isFallback: false,
    isReady: true,
    isPreview: false,
    defaultLocale: 'en',
    domainLocales: [],
    locale: 'en',
    isLocaleDomain: false,
};

vi.mock('../contexts/ThemeContext', () => ({
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('MyApp Component', () => {
    it('renders ThemeProvider and Component with pageProps', () => {
        const TestComponent = () => <div data-testid='test-component'>Test Component</div>;
        const pageProps = { testProp: 'testValue' };

        const { getByTestId } = render(<MyApp Component={TestComponent} pageProps={pageProps} router={mockRouter} />);

        expect(getByTestId('test-component')).toBeInTheDocument();
    });

    it('calls getInitialProps and returns the correct props', async () => {
        const ctx = { query: {} };
        const Component = {
            getInitialProps: vi.fn().mockResolvedValue({ initial: 'props' }),
        };

        const appContext = { Component, ctx, router: mockRouter } as any;

        const initialProps = await MyApp.getInitialProps(appContext);

        expect(Component.getInitialProps).toHaveBeenCalledWith(ctx);
        expect(initialProps.pageProps).toEqual({ initial: 'props' });
    });

    it('returns empty props if Component does not have getInitialProps', async () => {
        const ctx = { query: {} };
        const Component = {};

        const appContext = { Component, ctx, router: mockRouter } as any;

        const initialProps = await MyApp.getInitialProps(appContext);

        expect(initialProps.pageProps).toEqual({});
    });
});
