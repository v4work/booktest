import { Dispatch } from "redux"
import { booksApi } from "../Api/api"
import { IBook } from "../Utils/types"

const SET_BOOKS_DATA = "SET_BOOKS_DATA"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_CURRENT_BOOK_DATA = "SET_CURRENT_BOOK_DATA"
const SET_TOTAL = "SET_TOTAL"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

interface CommonState {
    books: IBook[]
    currentBook: IBook | null
    isFetching: boolean
    total: number
    pageSize: number
    currentPage: number
}

const initialState: CommonState = {
    books: [],
    currentBook: null,
    isFetching: false,
    total: 0,
    pageSize: 25,
    currentPage: 0
}

interface SetBooksDataAction {
    type: typeof SET_BOOKS_DATA
    books: IBook[]
}

interface SetIsFetchingAction {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}

interface SetIsCurrentBookAction {
    type: typeof SET_CURRENT_BOOK_DATA,
    currentBook: IBook
}

interface SetTotalAction {
    type: typeof SET_TOTAL,
    total: number
}

interface SetPageSizeAction {
    type: typeof SET_PAGE_SIZE,
    pageSize: number
}

interface SetCurrentPageAction {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

type CommonActionTypes = SetBooksDataAction | SetIsFetchingAction | SetIsCurrentBookAction | SetTotalAction | SetCurrentPageAction | SetPageSizeAction;

const commonReducer = (
    state: CommonState = initialState,
    action: CommonActionTypes
): CommonState => {
    switch (action.type) {
        case SET_BOOKS_DATA: {
            return { ...state, books: action.books }
        }
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_CURRENT_BOOK_DATA: {
            return { ...state, currentBook: action.currentBook }
        }
        case SET_TOTAL: {
            return { ...state, total: action.total }
        }
        case SET_PAGE_SIZE: {
            return { ...state, pageSize: action.pageSize }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        default:
            return state
    }
}

export const setBooksData = (
    books: IBook[]
): SetBooksDataAction => ({
    type: SET_BOOKS_DATA,
    books
})

export const setIsFetching = (
    isFetching: boolean
): SetIsFetchingAction => ({
    type: SET_IS_FETCHING,
    isFetching
})

export const setCurrentBookData = (
    currentBook: IBook
): SetIsCurrentBookAction => ({
    type: SET_CURRENT_BOOK_DATA,
    currentBook
})

export const setTotal = (
    total: number
): SetTotalAction => ({
    type: SET_TOTAL,
    total
})

export const setPageSize = (
    pageSize: number
): SetPageSizeAction => ({
    type: SET_PAGE_SIZE,
    pageSize
})

export const setCurrentPage = (
    currentPage: number
): SetCurrentPageAction => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

export const getBooks = (searchValue: string, page: number, pageSize: number) => async (dispatch: Dispatch<CommonActionTypes>) => {
    dispatch(setIsFetching(true))
    try {   
        let response = await booksApi.getBooks(searchValue, page, pageSize)
        const books: IBook[] = response.items.map((el: any) => ({
            id: el.id,
            title: el.volumeInfo.title,
            img: el.volumeInfo.imageLinks ? el.volumeInfo.imageLinks.thumbnail : "https://pngimg.com/d/book_PNG2111.png",
        }))
        // saveSearchToLC(searchValue, books)
        dispatch(setBooksData(books))
        dispatch(setTotal(response.totalItems))
        dispatch(setIsFetching(false))
    } catch (err) {
        dispatch(setIsFetching(false))
    }
}

export const getBookById = (bookId: string) => async (dispatch: Dispatch<CommonActionTypes>) => {
    dispatch(setIsFetching(true))
    try {
        let response = await booksApi.getBookById(bookId)
        const book: IBook = {
            id: response.id,
            title: response.volumeInfo.title,
            author: response.volumeInfo.authors.join(" "),
            img: response.volumeInfo.imageLinks.thumbnail,
            date: response.volumeInfo.publishedDate,
            description: response.volumeInfo.description
        }
        dispatch(setCurrentBookData(book))
        dispatch(setIsFetching(false))
    } catch (err) {
        dispatch(setIsFetching(false))
    }
}


export default commonReducer
