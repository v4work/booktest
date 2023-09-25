import { IBook } from "../../../Utils/types"
import BookItem from "./BookItem/BookItem"
import { BsDatabaseDash } from "react-icons/bs"
import classes from "./BooksList.module.css"
import Pagination from "../Pagination/Pagination"

interface IProps {
    books: IBook[]
    handlePageChange: (currentPage: number) => void
    currentPage: number
    totalPages: number
}

const BooksList = (props: IProps) => {
    const { books, handlePageChange, currentPage, totalPages } = props

    return (
        <div className={classes.main}>
            {books.length > 0 && (
                <div className={classes.items}>
                    {books.map(el => (
                        <BookItem book={el} key={el.title}/>
                    ))}
                </div>
            )}
            {books.length === 0 && (
                <div className={classes.notFound}>
                    <BsDatabaseDash/>
                    <p>No Data Found.</p>
                </div>
            )}
            {books.length > 0 && (
                <Pagination
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    )
}

export default BooksList