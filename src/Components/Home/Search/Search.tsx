import { useEffect } from "react"
import { useState } from "react"
import { connect } from "react-redux"
import useDebounce from "../../../Hooks/useDebounce"
import { getBooks } from "../../../Redux/commonReducer"
import { getDataFromLC } from "../../../Utils/saveSearchToLC"
import classes from "./Search.module.css"

interface IProps {
    getBooks: (searchValue: string) => void
}

const Search = (props: IProps) => {
    const { getBooks } = props

    const [value, setValue] = useState("")

    const debouncedSearchTerm = useDebounce(value, 500);

    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
           getBooks(value)
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        if (value.length === 0 && debouncedSearchTerm) {
           getBooks("") 
        }
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

export default connect(null, {
    getBooks
})(Search)