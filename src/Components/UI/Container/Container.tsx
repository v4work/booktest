import classes from "./Container.module.css"

interface IProps {
    children: React.ReactNode
    className?: string
}

const Container = (props: IProps) => {
    const { children, className } = props

    return (
        <div className={`${classes.main} ${className}`}>
            {children}
        </div>
    )
}

export default Container