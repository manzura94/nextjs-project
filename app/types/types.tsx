export interface Book {
    uid: string;
    title: string;
    numberOfPages: number;
    publishedMonth: number;
    publishedYear: number;
}

export interface Books {
    books: Book[];
    menu: Book[];
    setMenu: React.Dispatch<React.SetStateAction<Book[]>>;
    selectedItem: Book[];
    setSelectedItem: React.Dispatch<React.SetStateAction<Book[] | []>>;
}

export interface PageProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export interface Props  {
    selectedItem: Book[];
    setSelectedItem: React.Dispatch<React.SetStateAction<Book[] | []>>;
};
