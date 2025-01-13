
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Usuarios";
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/usuarios" element={<Home />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;