import React, { useEffect } from 'react';
import { Book } from '../pages';
import { useThemeContext } from '../contexts/ThemeContext';
import styles from './BookList.module.css';

interface Books {
    books: Book[];
    menu: Book[];
    setMenu: React.Dispatch<React.SetStateAction<Book[]>>;
    selectedItem: Book[];
    setSelectedItem: React.Dispatch<React.SetStateAction<Book[] | []>>;
}

export const BookList: React.FC<Books> = ({ books, menu, setMenu, selectedItem, setSelectedItem }) => {
    const { theme } = useThemeContext();

    const handleClickItem = (book: Book) => {
        if (selectedItem.includes(book)) {
            let newArr = selectedItem.filter((id) => id !== book);
            setSelectedItem(newArr);
        } else {
            setSelectedItem([...selectedItem, book]);
        }
    };



    useEffect(() => {
        setMenu(books);
    }, [books,setMenu]);

    if (!menu.length) return <h1 className={styles[theme]}>Loading...</h1>;

    return (
        <div className={styles.books_container} data-testid='book-list-container'>
            {menu &&
                menu.slice(0, 9).map((item) => (
                    <div className={`${styles.books_wrapper} ${styles[theme]}`} key={item.uid} onClick={() => handleClickItem(item)}>
                        <input type='checkbox' checked={selectedItem.includes(item)} readOnly />
                        <h3 className={styles.books_title}>{item?.title}</h3>
                        <div className={styles.books_date}>
                            Published date:
                            <span>{item.publishedMonth < 10 ? `0${item.publishedMonth}` : item.publishedMonth}</span>/<span>{item.publishedYear}</span>
                        </div>
                        <span className={styles.books_page}>Number of pages:{item.numberOfPages}</span>
                    </div>
                ))}
        </div>
    );
};
