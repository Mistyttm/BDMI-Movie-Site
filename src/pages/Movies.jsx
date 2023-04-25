/* eslint-disable jsx-a11y/alt-text */
import { React, useCallback, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import paginationTotal from "../components/paginationTotal";
import CountStatusBarComponent from "../components/countStatusBarComponent"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";



function Movies(props) {
    useEffect(() => {document.title = props.title}, []);
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    let pageCount = 0;

    const containerStyle = useMemo(
        () => ({ width: "100%", height: "100%" }),
        []
    );
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

    const [columnDefs, setColumnDefs] = useState([
        // this row shows the row index, doesn't use any data from the row
        {
            headerName: "ID",
            maxWidth: 100,
            // it is important to have node.id here, so that when the id changes (which happens
            // when the row is loaded) then the cell is refreshed.
            valueGetter: "node.id",
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
        { headerName: "Title", field: "title", minWidth: 150, maxWidth: 400, resizable: true },
        { headerName: "Year", field: "year", maxWidth: 100, resizable: false },
        { headerName: "IMDB Rating", field: "imdbRating", maxWidth: 130, resizable: false },
        { headerName: "Rotten Tomatoes Rating", field: "rottenTomatoesRating", maxWidth: 200, resizable: false },
        { headerName: "MetaCritic Rating", field: "metacriticRating", maxWidth: 150, resizable: false },
        { headerName: "Classification", field: "classification", maxWidth: 130, resizable: false },
        { headerName: "IMDB ID", field: "imdbID", hide: true},
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            resizable: true,
            minWidth: 100,
        };
    }, []);

    const onRowSelected = useCallback((event) => {
        navigate("/MoviePage?m=" + event.data.imdbID)
    }, []);

    const onGridReady = useCallback((params) => {
        const dataSource = {
            rowCount: undefined,
            getRows: async (params) => {
                const pageTotal = await paginationTotal();
                pageCount += 1;

                let movieValue = "";

                if (queryParameters.get("globalSearch")) {
                    movieValue = "?title=" + queryParameters.get("globalSearch");
                } else {
                    movieValue = "?page=" + pageCount;
                }
                fetch("http://sefdb02.qut.edu.au:3000/movies/search" + movieValue)
                    .then((res) => res.json())
                    .then((data) => params.successCallback(data.data, -1));
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
            <Footer />
        </div>
    );
}

export default Movies;
