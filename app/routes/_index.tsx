import type { MetaFunction } from '@remix-run/node';
import React, { useEffect, useState } from 'react';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { BookList } from '../components/BookList';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import Flyout from '../components/Flyout';
import { getBooks } from '../utils/api';
import { Book } from '../types/types';
import '../styles/global.css';
import { useThemeContext } from '../contexts/ThemeContext';

export const meta: MetaFunction = () => {
    return [{ title: 'Book store' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const books = await getBooks(Number(page));
    return json({ books });
};

export default function Index() {
    const { books } = useLoaderData<{ books: Book[]; page: number }>();
    const [menu, setMenu] = useState<Book[]>([]);
    const [selectedItem, setSelectedItem] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { theme } = useThemeContext();

    useEffect(() => {
        setMenu(books);
    }, [books]);

    return (
        <div className={`main_wrapper ${theme}`}>
            <Header />
            <BookList  menu={menu} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {selectedItem.length ? <Flyout selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : null}
        </div>
    );
}
