import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import Critic from "../components/criticList";
import Genre from "../components/genreList";
import getApiData from "../apis/individualMovieApiCalls";
import { tempDataMovie } from "../components/dummyData";
import "../Styles/Movies/IndividualMovie.css";

function Movie() {
    // Get the query parameters from the URL
    const [queryParameters] = useSearchParams();

    // Store the API URL with the movie ID from the query parameters
    const apiURL =
        "http://sefdb02.qut.edu.au:3000/movies/data/" +
        queryParameters.get("m");

    // Store the data returned by the API in movieData state
    const [movieData, setMovieData] = useState(tempDataMovie);
    const [apiError, setApiError] = useState();

    // Call the API and update movieData state on component mount
    useEffect(() => {
        getApiData(apiURL, setMovieData, setApiError);
    }, [apiURL, setMovieData]);

    // Update the document title with the movie title
    useEffect(() => {
        document.title = movieData?.title;
    }, [movieData]);

    // Define the columns for the AgGridReact table
    const columns = [
        { headerName: "Name", field: "name", resizable: false, minWidth: 300 },
        {
            headerName: "Category",
            field: "category",
            resizable: false,
            maxWidth: 130,
        },
        {
            headerName: "Characters",
            field: "characters",
            resizable: true,
            minWidth: 480,
        },
        { headerName: "ID", field: "id", hide: true },
    ];

    // Store the data for the AgGridReact table in rowData state
    const [rowData, setRowData] = useState([]);

    // Fetch data from the API and update rowData state on AgGridReact table ready
    const onGridReady = useCallback(
        (params) => {
            fetch(apiURL)
                .then((res) => res?.json())
                .then((data) => data?.principals)
                .then((principal) =>
                    principal.map((person) => {
                        return {
                            id: person.id,
                            category: person.category,
                            name: person.name,
                            characters: person.characters,
                        };
                    })
                )
                .then((books) => setRowData(books));
        },
        [apiURL]
    );

    // Navigate to the Person page when a row is selected in the AgGridReact table
    const navigate = useNavigate();
    const rowSelected = useCallback(
        (event) => {
            navigate("/Person?p=" + event.data.id);
        },
        [navigate]
    );

    const moviePoster = "Poster for " + movieData?.title;

    const formatUSD = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return(
        <div className="movieWrapper">
            <h1 className="movieTitle">{movieData?.title}</h1>
            <div className="movieContainer">
                <div className="textContainer">
                    <div className="plot">
                        <p>
                            <b className="titler">Plot</b>: {movieData?.plot}
                        </p>
                    </div>
                    <div className="mainText">
                        <p>
                            <b className="titler">Release Date</b>:{" "}
                            {movieData?.year}
                        </p>
                        <p>
                            <b className="titler">Runtime</b>:{" "}
                            {movieData?.runtime} minutes
                        </p>
                        <p>
                            <b className="titler">Boxoffice</b>:{" "}
                            {formatUSD.format(movieData?.boxoffice)}
                        </p>
                        <p>
                            <b className="titler">Release Countries</b>:{" "}
                            {movieData?.country}
                        </p>
                        <p>
                            <b className="titler genre">Genres</b>:
                        </p>
                        <Genre strings={movieData?.genres} />
                    </div>
                    <div className="criticVariable">
                        {movieData?.ratings?.map((criticData) => (
                            <Critic
                                key={
                                    queryParameters.get("m") +
                                    criticData.source
                                }
                                source={criticData.source}
                                value={criticData.value}
                            />
                        ))}
                    </div>
                </div>
                <div className="imgContainer">
                    <img
                        src={movieData?.poster}
                        alt={moviePoster}
                        className="poster"
                        width="400"
                    />
                </div>
            </div>
            <div
                className="movieInfoTable ag-theme-alpine"
                style={{ height: "300px", width: "930px" }}>
                <AgGridReact
                    rowSelection={"single"}
                    onRowSelected={rowSelected}
                    columnDefs={columns}
                    rowData={rowData}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    );
}

export default Movie;