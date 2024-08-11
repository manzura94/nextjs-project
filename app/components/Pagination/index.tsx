import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useThemeContext } from '../../contexts/ThemeContext';
import styles from './styles.module.css';
import { PageProps } from '../../types/types';

export const Pagination = ({ currentPage, setCurrentPage }: PageProps) => {
    const { theme } = useThemeContext();
    const navigate = useNavigate();

    const handlePrev = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            navigate(`/?page=${newPage}`);
        }
    };

    const handleNext = () => {
        if (currentPage < 10) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            navigate(`/?page=${newPage}`);
        }
    };

    return (
        <div className={`${styles.button_wrapper} ${styles[theme]}`} data-testid='pagination'>
            <button data-testid='prev-button' className={`${styles.button} ${styles.button_prev} ${styles[theme]}`} disabled={currentPage === 1} onClick={handlePrev}>
                prev
            </button>
            <span className={`${styles.button_page} ${styles[theme]}`}>{currentPage}</span>
            <button data-testid='next-button' className={`${styles.button} ${styles.button_prev} ${styles[theme]} `} disabled={currentPage === 10} onClick={handleNext}>
                next
            </button>
        </div>
    );
};
