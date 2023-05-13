import React from "react";

import Navbar from "../components/Navbar";
import Movie from "../components/Movie";
import Footer from "../components/Footer";
import "../Styles/Movies/IndividualMovie.css";

function MoviePage() {
    return (
        <div className="App">
            <Navbar />
            <Movie />
            <Footer />
        </div>
    );
}

export default MoviePage;
