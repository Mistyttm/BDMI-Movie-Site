/* eslint-disable jsx-a11y/alt-text */
import { React, useCallback, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import paginationTotal from "../components/paginationTotal";
import CountStatusBarComponent from "../components/countStatusBarComponent";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Movies/Movies.css";

function Movies(props) {
    useEffect(() => {
        document.title = props.title;
    }, []);
    const [queryParameters] = useSearchParams();
    const [requestError, setRequestError] = useState(null);
    const navigate = useNavigate();
    let pageCount = 0;

    const containerStyle = useMemo(
        () => ({ width: "100%", height: "100%" }),
        []
    );
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "Title",
            field: "title",
            minWidth: 150,
            maxWidth: 500,
            resizable: true,
            cellRenderer: (props) => {
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
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            resizable: true,
            minWidth: 100,
        };
    }, []);

    const onRowSelected = useCallback((event) => {
        navigate("/MoviePage?m=" + event.data.imdbID);
    }, [navigate]);

    const onGridReady = useCallback((params) => {
        const dataSource = {
            rowCount: undefined,
            getRows: async (params) => {
                //const pageTotal = await paginationTotal();
                pageCount += 1;

                let movieValue = "";

                if (queryParameters.get("globalSearch")) {
                    movieValue =
                        "?title=" + queryParameters.get("globalSearch");
                } else {
                    movieValue = "?page=" + pageCount;
                }
                fetch(
                    "http://sefdb02.qut.edu.au:3000/movies/search" + movieValue
                )
                    .then((res) => res.json())
                    .then((data) => params.successCallback(data.data, -1))
                    .catch((err) =>
                        setRequestError(
                            "404: Movies could not be found at this time. Please try again later."
                        )
                    );
            },
        };
        params.api.setDatasource(dataSource);
    }, []);

    const statusBar = useMemo(() => {
        return {
            statusPanels: [
                {
                    statusPanel: CountStatusBarComponent,
                },
            ],
        };
    }, []);

    return (
        <div className="App">
            <Navbar />
            <div className="gridContainer">
                {requestError != null ? (
                    <p className="requestError">
                        <FontAwesomeIcon icon={faCircleExclamation} /> Error{" "}
                        {requestError}
                    </p>
                ) : null}
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
                        statusBar={statusBar}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Movies;
