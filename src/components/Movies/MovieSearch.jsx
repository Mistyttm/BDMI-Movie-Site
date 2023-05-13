import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function MovieSearch() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // Handles form submission by building a URL query string based on the search term and selected year
    // and navigating to the search page with the updated query string
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const query = new URLSearchParams();
        if (searchTerm !== "") {
            query.set("q", searchTerm);
        }
        if (selectedYear !== "") {
            query.set("y", selectedYear);
        }
        navigate(`?${query.toString()}`);
        window.location.reload(); // Reloads the window to trigger a new search
    };

    // Populates an array of available years
    let availableYears = [];
    for (let i = 1990; i <= 2023; i++) {
        availableYears.push(i);
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit} className="searchForm">
                <label>
                    <h3>Search:</h3>
                </label>
                <div className="inputs">
                    <input
                        type="text"
                        name="q"
                        id="search"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={selectedYear}
                        className="optionsMenu"
                        onChange={(e) => setSelectedYear(e.target.value)}>
                        <option name="selectAYear" value="">
                            Select a Year
                        </option>
                        {availableYears.map((year) => {
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <button type="submit" className="submitButton">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
    );
}

export default MovieSearch;
