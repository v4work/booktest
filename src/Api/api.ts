import axios from 'axios';

export const booksApi = {
    getBooks() {
        return axios.get('/books.json')
        .then(response => response.data)
    }
}