import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';

    const response = await fetch(`https://stapi.co/api/v2/rest/book/search?pageNumber=${page}&pageSize=10`);

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }

    const { books } = await response.json();
    return NextResponse.json({ books });
}
