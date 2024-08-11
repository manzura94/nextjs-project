import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getBooks } from '../app/utils/api';

global.fetch = require('whatwg-fetch');

describe('getBooks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('fetches books successfully', async () => {
        const mockBooks = [
            { uid: '1', title: 'Book 1', numberOfPages: 100, publishedMonth: 1, publishedYear: 2021 },
            { uid: '2', title: 'Book 2', numberOfPages: 200, publishedMonth: 2, publishedYear: 2022 },
        ];

        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({ books: mockBooks }),
        } as Response);

        const books = await getBooks(1);
        expect(books).toEqual(mockBooks);
    });

    it('throws an error when the fetch fails', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
        } as Response);

        await expect(getBooks(1)).rejects.toThrow('Failed to fetch data');
    });

    it('throws an error when the response is not okay', async () => {
        vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

        await expect(getBooks(1)).rejects.toThrow('Network error');
    });
});
