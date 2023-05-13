import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import NotFound from "./pages/notFound";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MoviePage from "./pages/MoviePage";
import PersonPage from "./pages/PersonPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./Styles/App.css";

function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home title="Home" />} />
                <Route
                    path="/Movies"
                    element={<Movies title="Search Movies" />}
                />
                <Route path="/MoviePage" element={<MoviePage />} />
                <Route path="/Person" element={<PersonPage />} />
                <Route path="/Login" element={<Login title="Login" />} />
                <Route
                    path="/Register"
                    element={<Register title="Register" />}
                />
                <Route path="*" element={<NotFound title="Error: 404" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
