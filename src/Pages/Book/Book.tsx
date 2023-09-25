import classes from "./Book.module.css"
import { IBook } from "../../Utils/types"
import { NavLink } from "react-router-dom"
import { BiLeftArrowAlt } from "react-icons/bi"

interface IProps {
    book: IBook | null
}

const Book = (props: IProps) => {
    const { book } = props

    return (
        <div className={classes.container}>
            <div className={classes.navigation}>
                <BiLeftArrowAlt/>
                <NavLink to="/">Back to Main page</NavLink>
            </div>
            <div className={classes.main}>
                <div className={classes.imgContainer}>
                    <img src={book?.img} alt={book?.title}/>
                </div>
                <div className={classes.info}>
                    <h3>{book?.title}</h3>
                    <p className={classes.author}>by {book?.author}</p>
                    <span>{book?.date}</span>
                    <p className={classes.description}>{book?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Book