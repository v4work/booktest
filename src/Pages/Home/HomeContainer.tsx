import { useState } from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import Preloader from "../../Components/UI/Preloader/Preloader"
import { setBooksData } from "../../Redux/commonReducer"
import { RootState } from "../../Redux/reduxStore"
import { getDataFromLC } from "../../Utils/saveSearchToLC"
import { IBook } from "../../Utils/types"
import Home from "./Home"

interface IProps {
    books: IBook[]
    isFetching: boolean
    setBooksData: (books: IBook[]) => void
}

const HomeContainer = (props: IProps) => {
    const { books, isFetching, setBooksData } = props

    const itemsPerPage = 5

    const [currentPage, setCurrentPage] = useState<number>(1)
    const totalPages = Math.ceil(books.length / itemsPerPage)

    const [paginatedBooks, setPaginatedBooks] = useState<IBook[]>([])

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
    };


    useEffect(() => {
        const dataFromLC = getDataFromLC()
        if (dataFromLC) {
            setBooksData(dataFromLC.books)
        }

        return () => {
            setBooksData([])
        }
    }, [])

    useEffect(() => {
        const paginatedBooks = books.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
        setPaginatedBooks(paginatedBooks)
    }, [books, currentPage])

    return (
        <>
            {isFetching && <Preloader/>}
            <Home
                books={paginatedBooks}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    )
}

let mapStateToProps = (state: RootState) => ({
    books: state.common.books,
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {
    setBooksData
})(HomeContainer)