import { React, useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { useSearchParams } from "react-router-dom";
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"



function Movies() {
    const [queryParameters] = useSearchParams();
    const [rowData, setRowData] = useState([]);

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

    useEffect(() => {
        fetch("http://sefdb02.qut.edu.au:3000/movies/search" + movieValue)
        .then(res => res.json())
        .then(data => data.data)
        .then(data =>
            data.map(movie => {
                return {
                    title: movie.title,
                    year: movie.year,
                    imdbRating: movie.imdbRating,
                    rottenTomatoesRating: movie.rottenTomatoesRating,
                    metacriticRating: movie.metacriticRating,
                    classification: movie.classification
                };
            })
        )
        .then(movies => setRowData(movies));
    }, []);

    return (
        <div className="App">
            <Navbar />
            <div className="ag-theme-alpine" style={{ height: "600px", width: "1200px" }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}
                    pagination
                />
            </div>
            <Footer />
        </div>
    );
}

export default Movies;