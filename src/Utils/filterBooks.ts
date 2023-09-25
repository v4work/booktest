import { IBook } from "./types";

export const filterBooks = (searchValue: string, data: IBook[]): IBook[] => {
    if (searchValue === "") {
        return []
    } else {
        return data.filter(el => (
            el.title.includes(searchValue) ||
            el.author.includes(searchValue) ||
            el.description.includes(searchValue)
        ))
    }
}