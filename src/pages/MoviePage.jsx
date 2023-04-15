import React from "react";
import Navbar from '../components/navbar';
import Footer from "../components/footer";
// import { useNavigate } from "react-router-dom";

function Movie() {
    // const navigate = useNavigate();

    return (
        <div class="App">
            <Navbar />
            <p>Movie Test</p>
            <Footer />
        </div>
    );
}

export default Movie;