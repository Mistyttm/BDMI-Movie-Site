import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../Styles/Movies/IndividualMovie.css";

const tempData = {
    title: "Loading",
    year: 0,
    runtime: 0,
    genres: ["Loading"],
    country: "Loading",
    principals: [
        { id: "Loading", category: "Loading", name: "Loading", characters: [] },
    ],
    ratings: [{ source: "Loading", value: 0 }],
    boxoffice: null,
    poster: "www.emptyurl.com/image.jpg",
    plot: "Loading",
};

function Movie() {
    const [queryParameters] = useSearchParams();
    const apiURL =
        "http://sefdb02.qut.edu.au:3000/movies/data/" +
        queryParameters.get("m");

    const [movieData, setMovieData] = useState(tempData);

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

    const moviePoster = "Poster for" + movieData.title;
    console.log(movieData.ratings[0].source);

    return (
        <div className="App">
            <Navbar />
            <div className="movieWrapper">
                <h1 className="movieTitle">{movieData.title}</h1>
                <div className="movieContainer">
                    <div className="textContainer">
                        <p>{movieData.plot}</p>
                        <p>Release Date: {movieData.year}</p>
                        <p>Runtime: {movieData.runtime} minutes</p>
                        <p>Release Countries: {movieData.country}</p>
                    </div>
                    <div className="imgContainer">
                        <img
                            src={movieData.poster}
                            alt={moviePoster}
                            width="400"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Movie;
