import React from 'react';
import { Book, Books } from '../../types/types';
import { useThemeContext } from '../../contexts/ThemeContext';
import styles from './styles.module.css';

export const BookList: React.FC<Books> = ({  menu, selectedItem, setSelectedItem }) => {
    const { theme } = useThemeContext();

    const handleClickItem = (book: Book) => {
        if (selectedItem.includes(book)) {
            let newArr = selectedItem.filter((id) => id !== book);
            setSelectedItem(newArr);
        } else {
            setSelectedItem([...selectedItem, book]);
        }
    };

    if (!menu.length) return <h1 className={styles[theme]}>Loading...</h1>;

    return (
        <div className={styles.books_container} data-testid='book-list-container'>
            {menu &&
                menu.slice(0, 9).map((item) => (
                    <div data-testid="book-item" className={`${styles.books_wrapper} ${styles[theme]}`} key={item.uid} onClick={() => handleClickItem(item)}>
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
