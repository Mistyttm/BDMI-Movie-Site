/* eslint-disable jsx-a11y/alt-text */
import { React, useCallback, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/GeneralPurpose/Navbar";
import Footer from "../components/GeneralPurpose/Footer";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Movies/Movies.css";
import paginationTotal from "../components/GeneralPurpose/PaginationTotal";
import MovieSearch from "../components/Movies/MovieSearch";

function Movies(props) {
    const URL = "http://sefdb02.qut.edu.au:3000/movies/search";
    // Sets the document title using props.title when the component mounts
    useEffect(() => {
        document.title = props.title;
    });

    // Gets the search parameters from the URL using the useSearchParams hook
    const [queryParameters] = useSearchParams();

    // Initializes state for any request errors, search term, and selected year
    const [requestError, setRequestError] = useState(null);
    const [pagData, setPagData] = useState();
    const [results, setResults] = useState(0);

    // Initializes the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Initializes a page count variable to keep track of the current page number

    // Defines the column definitions for the ag-grid table
    const columnDefs = [
        {
            headerName: "Title",
            field: "title",
            minWidth: 150,
            maxWidth: 500,
            resizable: true,
            cellRenderer: (props) => {
                // If the title value is undefined, shows a loading gif, otherwise shows the title
                if (props.value !== undefined) {
                    return props.value;
                } else {
                    return (
                        <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                    );
                }
            },
        },
        { headerName: "Year", field: "year", maxWidth: 100, resizable: false },
        {
            headerName: "IMDB Rating",
            field: "imdbRating",
            maxWidth: 130,
            resizable: false,
        },
        {
            headerName: "Rotten Tomatoes Rating",
            field: "rottenTomatoesRating",
            maxWidth: 200,
            resizable: false,
        },
        {
            headerName: "MetaCritic Rating",
            field: "metacriticRating",
            maxWidth: 150,
            resizable: false,
        },
        {
            headerName: "Classification",
            field: "classification",
            maxWidth: 130,
            resizable: false,
        },
        { headerName: "IMDB ID", field: "imdbID", hide: true },
    ];

    // Initializes the default column definitions for the ag-grid table
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            resizable: true,
            minWidth: 100,
        };
    }, []);

    // Navigates to the movie page for the selected row
    const onRowSelected = useCallback(
        (event) => {
            navigate("/MoviePage?m=" + event.data.imdbID);
        },
        [navigate]
    );

    let pageCount = 0;

    let tempNum = 0;

    // Sets up the ag-grid table data source based on the search parameters and current page count
    const onGridReady = useCallback(
        (params) => {
            const dataSource = {
                rowCount: undefined,
                getRows: async (params) => {
                    pageCount += 1;

                    let movieValue = "";

                    // Builds the movieValue query string based on the search
                    // parameters and current page count
                    if (queryParameters.get("q") && queryParameters.get("y")) {
                        movieValue =
                            "?title=" +
                            queryParameters.get("q") +
                            "&year=" +
                            queryParameters.get("y");
                        paginationTotal(URL + movieValue).then((data) =>
                            setPagData(data)
                        );
                        movieValue = movieValue + "&page=" + pageCount;
                    } else if (queryParameters.get("q")) {
                        movieValue = "?title=" + queryParameters.get("q");
                        paginationTotal(URL + movieValue).then((data) =>
                            setPagData(data)
                        );
                        movieValue = movieValue + "&page=" + pageCount;
                    } else if (queryParameters.get("y")) {
                        movieValue = "?year=" + queryParameters.get("y");
                        paginationTotal(URL + movieValue).then((data) =>
                            setPagData(data)
                        );
                        movieValue = movieValue + "&page=" + pageCount;
                    } else {
                        paginationTotal(URL).then((data) => setPagData(data));
                        movieValue = "?page=" + pageCount;
                    }
                    // Fetches movie data from server and sets data source
                    fetch(URL + movieValue)
                        .then((res) => res.json())
                        .then((data) => {
                            tempNum = tempNum + data.data.length;
                            params.successCallback(
                                data.data,
                                data.pagination.total
                            );
                            setResults(tempNum);
                        })
                        .catch((err) =>
                            setRequestError(
                                "404: Movies could not be found at this time. Please try again later."
                            )
                        );
                },
            };
            params.api.setDatasource(dataSource);
        },
        [queryParameters]
    );

    

    return (
        <div className="App">
            <Navbar />
            <div className="moviegridContainer">
                <h1>Movie Search</h1>
                {requestError != null ? (
                    <p className="requestError">
                        <FontAwesomeIcon icon={faCircleExclamation} /> Error{" "}
                        {requestError}
                    </p>
                ) : null}
                <MovieSearch />
                <h4>
                    Showing <b>{results}</b> of <b>{pagData}</b> results
                </h4>
                <div
                    className="ag-theme-alpine"
                    style={{ height: "600px", width: "1200px" }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowBuffer={0}
                        rowSelection={"multiple"}
                        rowModelType={"infinite"}
                        cacheBlockSize={100}
                        cacheOverflowSize={2}
                        maxConcurrentDatasourceRequests={1}
                        infiniteInitialRowCount={1000}
                        maxBlocksInCache={10}
                        onGridReady={onGridReady}
                        onRowSelected={onRowSelected}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Movies;
