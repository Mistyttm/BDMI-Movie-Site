import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Movie() {
    const [queryParameters] = useSearchParams();
    const apiURL =
        "http://sefdb02.qut.edu.au:3000/movies/data/" +
        queryParameters.get("m");

    const [movieData, setMovieData] = useState({});

    const getApiData = async () => {
        const response = await fetch(apiURL)
            .then((response) => response.json())
            .then((response) => setMovieData(response));
    };

    useEffect(() => {
        getApiData();
    }, []);

    const navigate = useNavigate();
    useEffect(() => {
        document.title = movieData.title;
    }, [movieData]);

    return (
        <div className="App">
            <Navbar />
            <p>{movieData.title}</p>
            <p>{movieData.year}</p>
            <p>{movieData.runtime}</p>
            <p>{movieData.country} minutes</p>
            <Footer />
        </div>
    );
}

export default Movie;
