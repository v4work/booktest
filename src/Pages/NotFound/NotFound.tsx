import { NavLink } from 'react-router-dom'
import classes from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={classes.main}>
            <h3>Ooops... The page which you are searching is not found.</h3>
            <NavLink to="/">Back to Main page</NavLink>
        </div>
    )
}


export default NotFound