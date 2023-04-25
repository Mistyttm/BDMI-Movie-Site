import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '../components/navbar';
import Footer from "../components/footer";

function Movie() {
    const [queryParameters] = useSearchParams();

    const navigate = useNavigate();
    console.log();
    useEffect(() => {document.title = queryParameters.get("m")}, []);

    return (
        <div className="App">
            <Navbar />
            <p>Movie Test</p>
            <Footer />
        </div>
    );
}

export default Movie;