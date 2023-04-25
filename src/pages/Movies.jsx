import { React, useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const sampleFetch = async () => {
    const response = await fetch(
        "http://sefdb02.qut.edu.au:3000/movies/search"
    ); // hits the url provided and gets the response with its status code, body, headers, etc.
    const jsonData = await response.json(); // parses the response body to JSON

    return jsonData.pagination.total;
};

const GridExample = () => {};

function Movies() {
    const [queryParameters] = useSearchParams();
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
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            resizable: true,
            minWidth: 100,
        };
    }, []);

    const onRowSelected = useCallback((event) => {
        console.log('rowData:')
        console.log(event.data.title)
    }, []);

    const onGridReady = useCallback((params) => {
        const dataSource = {
            rowCount: undefined,
            getRows: async (params) => {
                const pageTotal = await sampleFetch();
                pageCount += 1;

                let movieValue = "";

                if (queryParameters.get("globalSearch")) {
                    movieValue = "?title=" + queryParameters.get("globalSearch");
                } else {
                    movieValue = "?page=" + pageCount;
                }
                console.log(pageCount);
                fetch("http://sefdb02.qut.edu.au:3000/movies/search" + movieValue)
                    .then((res) => res.json())
                    .then((data) => params.successCallback(data.data, -1));
            },
        };
        params.api.setDatasource(dataSource);
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
                />
            </div>
            <Footer />
        </div>
    );
}

export default Movies;
