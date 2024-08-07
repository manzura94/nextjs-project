import { useRouter } from 'next/router';
import React from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import styles from './Pagination.module.css';

interface PageProps {
    currentPage: number;
}
export const Pagination = ({ currentPage }: PageProps) => {
    const { theme } = useThemeContext();
    const router = useRouter();

    const handlePrev = () => {
        if (currentPage > 1) {
            router.push(`/?page=${currentPage - 1}`);
        }
    };

    const handleNext = () => {
        if (currentPage < 10) {
            router.push(`/?page=${currentPage + 1}`);
        }
    };

    return (
        <div className={`${styles.button_wrapper} ${styles[theme]}`}>
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
