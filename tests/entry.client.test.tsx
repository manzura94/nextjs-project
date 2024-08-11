import { it, expect, vi, beforeAll, beforeEach, afterAll } from 'vitest';
import { hydrateRoot } from 'react-dom/client';
import React from 'react';
import { RemixBrowser } from '@remix-run/react';

vi.mock('react-dom/client', () => ({
    hydrateRoot: vi.fn(),
}));

const mockDocument = {
    createElement: vi.fn(),
    getElementById: vi.fn(() => ({})),
    body: {
        appendChild: vi.fn(),
    },
};

const mockWindow = {
    ...globalThis,
    document: mockDocument,
};

beforeAll(() => {
    global.document = mockDocument as unknown as Document;
    global.window = mockWindow as unknown as Window & typeof globalThis;
});

afterAll(() => {
    global.document = undefined as unknown as Document;
    global.window = undefined as unknown as Window & typeof globalThis;
});

beforeEach(() => {
    vi.clearAllMocks();
});

it('hydrates the React application', async () => {
    // Ensure the entry.client.tsx runs in the test environment
    await import('../app/entry.client');

    expect(hydrateRoot).toHaveBeenCalledWith(
        document,
        <React.StrictMode>
            <RemixBrowser />
        </React.StrictMode>
    );
});

