import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

import { tempDataPerson } from "./dummyData";
import getApiData from "../apis/individualPersonApiCalls";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function UnautorisedPerson() {
    const navigate = useNavigate();

    const navToLogin = (() => {
        let path = `/Login`;
        navigate(path);
    });

    useEffect(() => {
        document.title = "Oops, Please login";
    }, []);

    return (
        <div className="pageWrapper">
            <div className="personWrapperLogout">
                {/* <div className="textWrapper"> */}
                    <h1>Oops, looks like you've been logged out</h1>
                    <h2>Please login and try again</h2>
                {/* </div> */}
                <button id="login" onClick={event => navToLogin()}>Login</button>
            </div>
        </div>
    );
}

export default UnautorisedPerson;
