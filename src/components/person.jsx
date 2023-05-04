import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { tempDataPerson } from "./dummyData";
import getApiData from "../apis/individualPersonApiCalls";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function Person() {
    const [queryParameters] = useSearchParams();

    const apiURL =
        "http://sefdb02.qut.edu.au:3000/people/" + queryParameters.get("p");

    const [personData, setPersonData] = useState(tempDataPerson);

    const token = JSON.parse(localStorage.getItem("bearerToken"));

    useEffect(() => {
        getApiData(apiURL, setPersonData, token?.token);
    }, []);

    useEffect(() => {
        document.title = personData.name;
    }, [personData]);

    const columns = [
        {
            headerName: "Movie Name",
            field: "movieName",
            resizable: false,
            minWidth: 300,
        },
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
        { headerName: "IMDB Rating", field: "imdbRating" },
        { headerName: "ID", field: "movieId", hide: true },
    ];

    const [rowData, setRowData] = useState([]);

    const onGridReady = useCallback(
        (params) => {
            fetch(apiURL, {
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer " + token?.token,
                },
            })
                .then((res) => res.json())
                .then((data) => data.roles)
                .then((roles) =>
                    roles.map((role) => {
                        return {
                            movieName: role.movieName,
                            category: role.category,
                            characters: role.characters,
                            imdbRating: role.imdbRating,
                            movieId: role.movieId,
                        };
                    })
                )
                .then((person) => setRowData(person));
        },
        [apiURL]
    );

    const navigate = useNavigate();
    const rowSelected = useCallback(
        (event) => {
            navigate("/MoviePage?m=" + event.data.movieId);
        },
        [navigate]
    );

    return (
        <div className="personWrapper">
            <h1>{personData.name}</h1>
            <h2>
                {personData.birthYear} - {personData.deathyear}
            </h2>
            <div className="personCharacters">
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
        </div>
    );
}

export default Person;
