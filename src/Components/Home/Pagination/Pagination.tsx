import classes from "./Pagination.module.css"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { useState } from "react"

interface IProps {
    handlePageChange: (currentPage: number) => void
    currentPage: number
    totalPages: number
}

const Pagination = (props: IProps) => {
    const { handlePageChange, currentPage, totalPages } = props

    const displayRange = 1;

    const [minPage, setMinPage] = useState(1);

    const maxPage = Math.min(totalPages, minPage + displayRange * 2);
    const pageNumbers = Array.from({ length: maxPage - minPage + 1 }, (_, index) => minPage + index);

    const changePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            handlePageChange(newPage);
            const newMinPage = Math.max(1, newPage - displayRange);
            setMinPage(newMinPage);
        }
    };

    return (
        <div className={classes.main}>
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <IoIosArrowBack />
            </button>
            <div className={classes.pages}>
                {minPage > 1 && (
                    <button onClick={() => changePage(1)}>1</button>
                )}
                {minPage > 2 && <span>...</span>}
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => changePage(pageNumber)}
                        className={currentPage === pageNumber ? classes.active : ""}
                    >
                        {pageNumber}
                    </button>
                ))}
                {maxPage < totalPages - 1 && <span>...</span>}
                {maxPage < totalPages && (
                    <button onClick={() => changePage(totalPages)}>
                        {totalPages}
                    </button>
                )}
            </div>
            {/* <span>
                Page {currentPage + 1} of {totalPages}
            </span> */}
            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <IoIosArrowForward />
            </button>
        </div>
    )
}

export default Pagination
