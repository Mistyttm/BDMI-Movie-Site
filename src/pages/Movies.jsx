/* eslint-disable jsx-a11y/alt-text */
import { React, useCallback, useMemo, useState, useEffect } from "react";
import Navbar from "../components/GeneralPurpose/Navbar";
import Footer from "../components/GeneralPurpose/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Movies/Movies.css";

import MovieSearch from "../components/Movies/MovieSearch";
import MovieGrid from "../components/Movies/MovieGrid";

function Movies(props) {
    const [requestError, setRequestError] = useState(null);

    // Sets the document title using props.title when the component mounts
    useEffect(() => {
        document.title = props.title;
    });

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
                <MovieGrid setRequestError={setRequestError}/>
            </div>
            <Footer />
        </div>
    );
}

export default Movies;
