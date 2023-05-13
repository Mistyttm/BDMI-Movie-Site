import React from "react";

import Navbar from "../components/GeneralPurpose/Navbar";
import Movie from "../components/MoviesPage/Movie";
import Footer from "../components/GeneralPurpose/Footer";
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
