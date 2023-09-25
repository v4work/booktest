import { useState } from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import Preloader from "../../Components/UI/Preloader/Preloader"
import { RootState } from "../../Redux/reduxStore"
import { IBook } from "../../Utils/types"
import Book from "./Book"

interface IProps {
    books: IBook[]
    isFetching: boolean
}

const BooksContainer = (props: IProps) => {
    const { books, isFetching } = props
    
    const { bookTitle } = useParams()

    const [book, setBook] = useState<IBook | null>(null)

    const getBookByTitle = (): IBook | null => {
        if (bookTitle) {
            const foundBook = books.find(el => el.title === bookTitle)
            return foundBook || null;
        }
        return null
    }

    useEffect(() => {
        if (books.length > 0 && bookTitle) {
            setBook(getBookByTitle())
        }
    }, [books, bookTitle])

    return (
        <>
            {isFetching && <Preloader/>}
            <Book book={book}/>
        </>
    )
}

let mapStateToProps = (state: RootState) => ({
    books: state.common.books,
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {

})(BooksContainer)