import { GetServerSidePropsContext } from 'next';
import React, { useState } from 'react';
import { BookList } from '../components/BookList';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import Flyout from '../components/Flyout';
import { useThemeContext } from '../contexts/ThemeContext';

export interface Book {
    uid: string;
    title: string;
    numberOfPages: number;
    publishedMonth: number;
    publishedYear: number;
}

interface StateProps {
    books: Book[] | [];
    currentPage: number;
}

export default function Home({ books, currentPage }: StateProps) {
    const { theme } = useThemeContext();
    const [menu, setMenu] = useState<Book[] | []>([]);
    const [selectedItem, setSelectedItem] = useState<Book[] | []>([]);

    return (
        <div className={`wrapper ${theme}`}>
            <Header />
            <BookList books={books} menu={menu} setMenu={setMenu} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <Pagination currentPage={currentPage} />
            {selectedItem.length ? <Flyout selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <span></span>}
        </div>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const page = parseInt(context.query.page as string, 10) || 1;

    try {
        const response = await fetch(`https://stapi.co/api/v2/rest/book/search?pageNumber=${page}&pageSize=10`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const { books } = await response.json();
        return { props: { books, currentPage: page } };
    } catch (error) {
        console.error('Error fetching books:', error);
        return { props: { books: [], currentPage: 1 } };
    }
};
