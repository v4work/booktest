import BooksList from "../../Components/Home/BooksList/BooksList"
import Search from "../../Components/Home/Search/Search"
import Container from "../../Components/UI/Container/Container"
import { IBook } from "../../Utils/types"
import classes from "./Home.module.css"

interface IProps {
    books: IBook[]
    handlePageChange: (currentPage: number) => void
    currentPage: number
    totalPages: number
}

const Home = (props: IProps) => {
    const { books, handlePageChange, currentPage, totalPages } = props

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <h1>Welcome, start search book there</h1>
                <Search/>
                <BooksList
                    books={books}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </Container>
        </div>
    )
}

export default Home