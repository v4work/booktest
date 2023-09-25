import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeContainer from "./Pages/Home/HomeContainer"
import BooksContainer from "./Pages/Book/BookContainer"
import NotFound from "./Pages/NotFound/NotFound"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeContainer/>} />
                <Route path="/book/:id" element={<BooksContainer/>} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}

export default App
