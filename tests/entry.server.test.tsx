import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderToPipeableStream } from 'react-dom/server';
import handleRequest from '../app/entry.server';
import { isbot } from 'isbot';

vi.mock('react-dom/server', () => ({
    renderToPipeableStream: vi.fn(),
}));

vi.mock('@remix-run/node', () => ({
    createReadableStreamFromReadable: vi.fn(),
}));

vi.mock('isbot', () => ({
    isbot: vi.fn(),
}));

const mockContext = {
    manifest: {},
    routeModules: {},
    staticHandlerContext: {},
    future: {},
};

describe('handleRequest', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should handle errors in bot requests', async () => {
        vi.mocked(isbot).mockReturnValue(true);

        const request = new Request('https://example.com');
        const responseStatusCode = 200;
        const responseHeaders = new Headers();

        vi.mocked(renderToPipeableStream).mockImplementation(() => {
            throw new Error('Test Error');
        });

        await expect(handleRequest(request, responseStatusCode, responseHeaders, mockContext, {})).rejects.toThrow('Test Error');
    }, 15000);

    it('should handle errors in browser requests', async () => {
        vi.mocked(isbot).mockReturnValue(false);

        const request = new Request('https://example.com');
        const responseStatusCode = 200;
        const responseHeaders = new Headers();

        vi.mocked(renderToPipeableStream).mockImplementation(() => {
            throw new Error('Test Error');
        });

        await expect(handleRequest(request, responseStatusCode, responseHeaders, mockContext, {})).rejects.toThrow('Test Error');
    }, 15000);
});
