import { React, useCallback, useMemo, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { useSearchParams } from "react-router-dom";
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"



function Movies() {
    const [queryParameters] = useSearchParams();
    
    const GridExample = () => {
        const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

        const [columnDefs, setColumnDefs] = useState([
            // this row shows the row index, doesn't use any data from the row
            {
                headerName: 'ID',
                maxWidth: 100,
                // it is important to have node.id here, so that when the id changes (which happens
                // when the row is loaded) then the cell is refreshed.
                valueGetter: 'node.id',
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
            { field: 'athlete', minWidth: 150 },
            { field: 'age' },
            { field: 'country', minWidth: 150 },
            { field: 'year' },
            { field: 'date', minWidth: 150 },
            { field: 'sport', minWidth: 150 },
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
            ]);
            const defaultColDef = useMemo(() => {
            return {
                flex: 1,
                resizable: true,
                minWidth: 100,
            };
            }, []);
        
            const onGridReady = useCallback((params) => {
                const dataSource = {
                    rowCount: undefined,
                    getRows: (params) => {
                        console.log(
                            'asking for ' + params.startRow + ' to ' + params.endRow
                        );
                        // At this point in your code, you would call the server.
                        // To make the demo look real, wait for 500ms before returning
                        setTimeout(function () {
                            // take a slice of the total rows
                            const rowsThisPage = data.slice(params.startRow, params.endRow);
                            // if on or after the last page, work out the last row.
                            let lastRow = -1;
                            if (data.length <= params.endRow) {
                                lastRow = data.length;
                            }
                            // call the success callback
                            params.successCallback(rowsThisPage, lastRow);
                        }, 500);
                    },
                };
            },
        []);


    const columns= [
        {headerName: "Title", field: "title", sortable: true, filter: true},
        {headerName: "Year", field: "year", sortable: true, filter: 'agNumberColumnFilter'},
        {headerName: "IMDB Rating", field: "imdbRating", sortable: true, filter: 'agNumberColumnFilter'},
        {headerName: "Rotten Tomatoes Rating", field: "rottenTomatoesRating", sortable: true, filter: 'agNumberColumnFilter'},
        {headerName: "MetaCritic Rating", field: "metacriticRating", sortable: true, filter: 'agNumberColumnFilter'},
        {headerName: "Classification", field: "classification", sortable: true, filter: true},
    ];

    let movieValue = "";

    if (queryParameters.get("globalSearch")) {
        movieValue = "?title=" + queryParameters.get("globalSearch");
    }

    return (
        <div className="App">
            <Navbar />
            <div className="ag-theme-alpine" style={{ height: "600px", width: "1200px" }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowBuffer={0}
                    rowSelection={'multiple'}
                    rowModelType={'infinite'}
                    cacheBlockSize={100}
                    cacheOverflowSize={2}
                    maxConcurrentDatasourceRequests={1}
                    infiniteInitialRowCount={1000}
                    maxBlocksInCache={10}
                    onGridReady={onGridReady}
                />
            </div>
            <Footer />
        </div>
    );
}

export default Movies;