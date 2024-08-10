export async function getBooks(page: number) {
    const response = await fetch(`https://stapi.co/api/v2/rest/book/search?pageNumber=${page}&pageSize=10`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.books;
}
