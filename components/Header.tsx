import React from 'react';
import styles from './Header.module.css';
import { useThemeContext } from '../contexts/ThemeContext';

export const Header = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <header className={styles.header}>
            <h1 className={`${styles.header_title} ${styles[theme]}`}>Book store</h1>
            <div>
                <label className={styles.theme_toggle_button}>
                    <input type='checkbox' data-testid='theme-toggle-checkbox' defaultChecked={theme === 'dark'} onChange={toggleTheme} />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </header>
    );
};
