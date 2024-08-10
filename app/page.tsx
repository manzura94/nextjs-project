'use client';
import React, { useState, useEffect } from 'react';
import { BookList } from './components/BookList';
import { Header } from './components/Header';
import { Pagination } from './components/Pagination';
import Flyout from './components/Flyout';
import { useThemeContext } from './contexts/ThemeContext';
import styles from './page.module.css';

export interface Book {
    uid: string;
    title: string;
    numberOfPages: number;
    publishedMonth: number;
    publishedYear: number;
}

export default function Home() {
    const { theme } = useThemeContext();
    const [books, setBooks] = useState<Book[]>([]);
    const [menu, setMenu] = useState<Book[]>([]);
    const [selectedItem, setSelectedItem] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    console.log(theme);

    useEffect(() => {
        const fetchBooks = async (page: number) => {
            try {
                const response = await fetch(`/api/books?page=${page}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBooks(data.books);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks(currentPage);
    }, [currentPage]);

    return (
        <div className={`${styles.wrapper} ${styles[theme]}`}>
            <Header />
            <BookList books={books} menu={menu} setMenu={setMenu} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {selectedItem.length ? <Flyout selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <span></span>}
        </div>
    );
}
