import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { tempDataPerson } from "../GeneralPurpose/DummyData";
import getApiData from "../../apis/individualPersonApiCalls";
import UnautorisedPerson from "./LoggedOutPerson";
import { refresh } from "../../apis/tokenRefresh";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import Aos from "aos";
import "aos/dist/aos.css";

import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    Label,
} from "recharts";

Aos.init();

function Person() {
    // Extracting the URL query parameter using useSearchParams
    const [queryParameters] = useSearchParams();

    refresh(JSON.parse(localStorage.getItem("refreshToken")).token);

    // Generating the API URL for fetching the person data based on the query parameter
    const apiURL =
        "http://sefdb02.qut.edu.au:3000/people/" + queryParameters.get("p");

    // Initializing personData state with tempDataPerson
    const [personData, setPersonData] = useState(tempDataPerson);

    // Using useNavigate hook from react-router-dom for navigation
    const navigate = useNavigate();

    // Retrieving the bearer token from localStorage
    const token = JSON.parse(localStorage.getItem("bearerToken"));

    // Fetching the person data from the API using getApiData function and setting the personData state
    // Also, updating the document title with the name of the person
    useEffect(() => {
        getApiData(apiURL, setPersonData, token?.token);
        document.title = personData.name;
    }, [apiURL]);

    // Defining columns for the ag-grid table
    const columns = [
        {
            headerName: "Movie Name",
            field: "movieName",
            resizable: false,
        },
        {
            headerName: "Category",
            field: "category",
            resizable: false,
        },
        {
            headerName: "Characters",
            field: "characters",
            resizable: true,
        },
        { headerName: "IMDB Rating", field: "imdbRating" },
        { headerName: "ID", field: "movieId", hide: true },
    ];

    // Initializing rowData state with an empty array
    const [rowData, setRowData] = useState([]);

    // Fetching the person's movie roles data from the API and setting the rowData state
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
                .then((person) => setRowData(person))
                .catch((err) => {
                    setPersonData(tempDataPerson);
                    console.log(err.message);
                    return <UnautorisedPerson />;
                });
        },
        [apiURL, token?.token]
    );

    // Updating the document title with the name of the person
    useEffect(() => {
        document.title = personData.name;
    }, [personData]);

    // Defining a callback function for handling row selection event
    const rowSelected = useCallback(
        (event) => {
            navigate("/MoviePage?m=" + event.data.movieId);
        },
        [navigate]
    );

    // Memoizing the IMDB ratings data from the person's movie roles data
    const IMDBData = useMemo(
        () => personData?.roles?.map((role) => role.imdbRating),
        [personData]
    );

    // Memoizing the data for the IMDB rating histogram chart
    const data = useMemo(
        () =>
            Array.from({ length: 10 }, (_, i) => ({
                amount: `${i}-${i + 1}`,
                ratings: IMDBData?.filter(
                    (rating) => rating >= i && rating < i + 1
                ).length,
            })),
        [IMDBData]
    );

    return (
        <div className="pageWrapper box1">
            <div data-aos="zoom-in-right">
                <div className="personWrapper">
                    <h1>{personData.name}</h1>
                    <h2>
                        {personData.birthYear} - {personData.deathYear}
                    </h2>
                    <div className="personCharacters">
                        <div
                            className="movieInfoTable ag-theme-alpine"
                            style={{ height: "300px", width: "720px" }}>
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
            </div>
            <div data-aos="zoom-in-left">
                <div className="graphWrapper">
                    <div className="barChart">
                        <h2>Ratings at a Glance</h2>
                        <BarChart
                            width={730}
                            height={250}
                            data={data}
                            className="Graph">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="amount" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="ratings" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Person;
