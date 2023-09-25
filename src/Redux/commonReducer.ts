import { Dispatch } from "redux"
import { booksApi } from "../Api/api"
import { filterBooks } from "../Utils/filterBooks"
import { saveSearchToLC } from "../Utils/saveSearchToLC"
import { IBook } from "../Utils/types"

const SET_BOOKS_DATA = "SET_BOOKS_DATA"
const SET_IS_FETCHING = "SET_IS_FETCHING"

interface CommonState {
    books: IBook[]
    isFetching: boolean
}

const initialState: CommonState = {
    books: [],
    isFetching: false
}

interface SetBooksDataAction {
    type: typeof SET_BOOKS_DATA
    books: IBook[]
}

interface SetIsFetchingAction {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}

type CommonActionTypes = SetBooksDataAction | SetIsFetchingAction;

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

export const getBooks = (searchValue: string) => async (dispatch: Dispatch<CommonActionTypes>) => {
    dispatch(setIsFetching(true))
    try {   
        let response: IBook[] = await booksApi.getBooks()
        const filteredData = filterBooks(searchValue, response)
        saveSearchToLC(searchValue, filteredData)
        dispatch(setBooksData(filteredData))
        dispatch(setIsFetching(false))
    }catch(err){
        dispatch(setIsFetching(false))
    }
}


export default commonReducer
