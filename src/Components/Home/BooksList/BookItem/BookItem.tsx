import { useNavigate } from "react-router"
import { IBook } from "../../../../Utils/types"
import classes from "./BookItem.module.css"

interface IProps {
    book: IBook
}

const BookItem = (props: IProps) => {
    const { book } = props

    const navigate = useNavigate()

    const onClick = () => {
        navigate(`/book/${book.id}`)
    }
    
    return (
        <div className={classes.main} onClick={onClick}>
            <img src={book.img} alt="book"/>
            <div className={classes.info}>
                <h4>{book.title}</h4>
            </div>
        </div>
    )
}

export default BookItem