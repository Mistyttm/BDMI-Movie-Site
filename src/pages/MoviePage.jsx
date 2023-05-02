import React from "react";

import Navbar from "../components/navbar";
import Movie from "../components/movie";
import Footer from "../components/footer";
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
