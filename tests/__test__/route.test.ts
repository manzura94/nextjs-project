import { GET } from '../../app/api/books/route';
import { describe, it, expect, vi } from 'vitest';

global.fetch = vi.fn();

describe('Books API Route', () => {
    it('should return books data when fetch is successful', async () => {
        const mockBooks = {
            books: [
                { uid: '1', title: 'Book One', publishedMonth: 1, publishedYear: 2021, numberOfPages: 300 },
                { uid: '2', title: 'Book Two', publishedMonth: 2, publishedYear: 2022, numberOfPages: 250 },
            ],
        };

        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockBooks,
            status: 200,
            statusText: 'OK',
            headers: new Headers(),
            redirected: false,
            url: '',
            type: 'default',
        } as Response);

        const request = new Request('https://example.com/api/books?page=1');
        const response = await GET(request);

        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json.books).toEqual(mockBooks.books);
    });

    it('should return an error message when fetch fails', async () => {
        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
            headers: new Headers(),
            json: async () => ({ error: 'Failed to fetch data' }),
            redirected: false,
            url: '',
            type: 'default',
        } as Response);

        const request = new Request('https://example.com/api/books?page=1');
        const response = await GET(request);

        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json.error).toBe('Failed to fetch data');
    });
});
