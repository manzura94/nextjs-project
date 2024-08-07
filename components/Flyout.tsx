import React, { useState } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import { Book } from '../pages';
import styles from './Flyout.module.css';

type Props = {
    selectedItem: Book[];
    setSelectedItem: React.Dispatch<React.SetStateAction<Book[] | []>>;
};

const Flyout = ({ selectedItem, setSelectedItem }: Props) => {
    const { theme } = useThemeContext();

    const handleRemoveItem = () => {
        setSelectedItem([]);
    };

    const [url, setUrl] = useState<string>();
    const handleDownload = () => {
        if (selectedItem.length === 0) return;

        const titleKeys = Object.keys(selectedItem[0]);
        const refinedData = [titleKeys];
        selectedItem.forEach((item) => {
            refinedData.push(Object.values(item).map((value) => String(value)));
        });

        let csvContent = '';
        refinedData.forEach((row) => {
            csvContent += row.join(';') + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        setUrl(url);
    };

    return (
        <div className={`${styles.flyout_container} ${styles[theme]}`}>
            <div className={styles.flyout_items}>{`selected ${selectedItem.length} ${selectedItem.length > 1 ? 'items' : 'item'}`}</div>
            <div className={styles.flyout_buttons}>
                <button className={`${styles.button} ${styles[theme]}`} onClick={handleRemoveItem}>
                    Unselect All
                </button>
                <a data-testid='download-button' className={`${styles[theme]} `} href={url} download={`${selectedItem.length}__items.csv`} onClick={handleDownload}>
                    Download
                </a>
            </div>
        </div>
    );
};

export default Flyout;
