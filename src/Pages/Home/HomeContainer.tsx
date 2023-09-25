import { useEffect } from "react"
import { connect } from "react-redux"
import Preloader from "../../Components/UI/Preloader/Preloader"
import { setBooksData, setCurrentPage } from "../../Redux/commonReducer"
import { RootState } from "../../Redux/reduxStore"
import { getDataFromLC } from "../../Utils/saveSearchToLC"
import { IBook } from "../../Utils/types"
import Home from "./Home"

interface IProps {
    books: IBook[]
    isFetching: boolean
    currentPage: number
    pageSize: number
    total: number
    setBooksData: (books: IBook[]) => void
    setCurrentPage: (page: number) => void
}

const HomeContainer = (props: IProps) => {
    const {
        books,
        isFetching,
        currentPage,
        pageSize,
        total,
        setBooksData,
        setCurrentPage
    } = props

    const totalPages = Math.ceil(total / pageSize)

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    useEffect(() => {
        const dataFromLC = getDataFromLC()
        if (dataFromLC) {
            setBooksData(dataFromLC.books)
        }

        return () => {
            setBooksData([])
        }
    }, [])

    return (
        <>
            {isFetching && <Preloader />}
            <Home
                books={books}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    )
}

let mapStateToProps = (state: RootState) => ({
    books: state.common.books,
    isFetching: state.common.isFetching,
    currentPage: state.common.currentPage,
    pageSize: state.common.pageSize,
    total: state.common.total
})

export default connect(mapStateToProps, {
    setBooksData,
    setCurrentPage
})(HomeContainer)
