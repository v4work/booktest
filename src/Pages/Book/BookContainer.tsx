import { useState } from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import Preloader from "../../Components/UI/Preloader/Preloader"
import { getBookById } from "../../Redux/commonReducer"
import { RootState } from "../../Redux/reduxStore"
import { IBook } from "../../Utils/types"
import Book from "./Book"

interface IProps {
    currentBook: IBook | null
    isFetching: boolean
    getBookById: (bookId: string) => void
}

const BooksContainer = (props: IProps) => {
    const { currentBook, isFetching, getBookById } = props
    
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getBookById(id)
        }
    }, [id])

    return (
        <>
            {isFetching && <Preloader/>}
            <Book book={currentBook}/>
        </>
    )
}

let mapStateToProps = (state: RootState) => ({
    currentBook: state.common.currentBook,
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {
    getBookById
})(BooksContainer)