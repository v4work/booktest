import axios from 'axios';

export const booksApi = {
    getBooks(searchValue: string, page: number, pageSize: number) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&startIndex=${page}&maxResults=${pageSize}`)
        .then(response => response.data)
    },
    getBookById(bookId: string) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(response => response.data)
    }
}