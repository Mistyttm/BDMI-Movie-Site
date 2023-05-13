import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../Styles/notFound/404.css';

function NotFound(props) {
    useEffect(() => {document.title = props.title}, []);

    return (
        <div className="App">
            <Navbar />
            <div className="errorMessage">
                <h1>404</h1>
                <h2>Oops, something went wrong</h2>
            </div>
            <Footer />
        </div>
    );
}

export default NotFound;