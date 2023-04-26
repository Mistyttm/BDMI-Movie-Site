import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Critic from "../components/criticList";
import getApiData from "../apis/individualMovieApiCalls";
import { tempData } from "../components/dummyData";
import "../Styles/Movies/IndividualMovie.css";

function Movie() {
    const [queryParameters] = useSearchParams();
    const apiURL =
        "http://sefdb02.qut.edu.au:3000/movies/data/" +
        queryParameters.get("m");

    const [movieData, setMovieData] = useState(tempData);

    useEffect(() => {
        getApiData(apiURL, setMovieData);
    }, []);

    const navigate = useNavigate();
    useEffect(() => {
        document.title = movieData.title;
    }, [movieData]);

    const moviePoster = "Poster for" + movieData.title;

    return (
        <div className="App">
            <Navbar />
            <div className="movieWrapper">
                <h1 className="movieTitle">{movieData.title}</h1>
                <div className="movieContainer">
                    <div className="textContainer">
                        <div className="plot">
                            <p><b className="titler">Plot</b>: {movieData.plot}</p>
                        </div>
                        <div className="mainText">
                            <p><b className="titler">Release Date</b>: {movieData.year}</p>
                            <p><b className="titler">Runtime</b>: {movieData.runtime} minutes</p>
                            <p><b className="titler">Release Countries</b>: {movieData.country}</p>
                        </div>
                        <div className="criticVariable">
                            {movieData.ratings.map((criticData) => (
                                <Critic key={queryParameters.get("m") + criticData.source} source={criticData.source} value={criticData.value} />
                            ))}
                        </div>
                    </div>
                    <div className="imgContainer">
                        <img
                            src={movieData.poster}
                            alt={moviePoster}
                            className="poster"
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
