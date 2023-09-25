import { useEffect } from "react"
import { useState } from "react"
import { connect } from "react-redux"
import useDebounce from "../../../Hooks/useDebounce"
import { getBooks, setCurrentPage } from "../../../Redux/commonReducer"
import { RootState } from "../../../Redux/reduxStore"
import { getDataFromLC } from "../../../Utils/saveSearchToLC"
import classes from "./Search.module.css"

interface IProps {
    getBooks: (searchValue: string, page: number, pageSize: number) => void
    setCurrentPage: (currentPage: number) => void
    currentPage: number,
    pageSize: number
}

const Search = (props: IProps) => {
    const { getBooks, setCurrentPage, currentPage, pageSize } = props

    const [value, setValue] = useState("")

    const debouncedSearchTerm = useDebounce(value, 500);

    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            getBooks(value, currentPage, pageSize)
        }
    }, [debouncedSearchTerm, currentPage])

    useEffect(() => {
        if (value.length === 0 && debouncedSearchTerm) {
           getBooks("", 1, pageSize) 
        }
    }, [value])

    useEffect(() => {
        setCurrentPage(0)
    }, [value])

    useEffect(() => {
        const dataFromLC = getDataFromLC()
        if (dataFromLC) {
            setValue(dataFromLC.searchValue)
        }
    }, [])

    return (
        <div className={classes.main}>
            <input value={value} onChange={handleValue} placeholder="Start search book here..."/>
        </div>
    )
}

let mapStateToProps = (state: RootState) => ({
    currentPage: state.common.currentPage,
    pageSize: state.common.pageSize
})

export default connect(mapStateToProps, {
    getBooks,
    setCurrentPage
})(Search)