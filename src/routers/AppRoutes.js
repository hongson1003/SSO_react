import { Routes, Route } from "react-router-dom"
import Home from "../container/home/HomePage";
import About from "../container/about/About";
import Code from "../container/code/Code";

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/codeToken" element={<Code />} />
        </Routes>
    )
}

export default AppRoutes;