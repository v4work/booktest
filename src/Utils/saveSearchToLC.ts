import { IBook } from "./types";

interface IData {
    searchValue: string
    books: IBook[]
}

export const saveSearchToLC = (searchValue: string, books: IBook[]) => {
    const data: IData = {
        searchValue,
        books
    }

    const json = JSON.stringify(data)
    localStorage.setItem("bookData", json);
}

export const getDataFromLC = (): IData | null => {
    const storedBookJSON = localStorage.getItem("bookData");
    if (storedBookJSON) {
        const storedData = JSON.parse(storedBookJSON);
        return storedData
    }
    return null
}