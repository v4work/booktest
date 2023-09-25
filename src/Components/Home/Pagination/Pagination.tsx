import classes from "./Pagination.module.css"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

interface IProps {
    handlePageChange: (currentPage: number) => void
    currentPage: number
    totalPages: number
}

const Pagination = (props: IProps) => {
    const { handlePageChange, currentPage, totalPages } = props

    return (
        <div className={classes.main}>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <IoIosArrowBack/>
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <IoIosArrowForward/>
            </button>
        </div>
    )
}

export default Pagination
