import React from "react";
import { useEffect } from "react";
import Navbar from '../components/navbar';
import Footer from "../components/footer";
// import { useNavigate } from "react-router-dom";

function Person() {
    useEffect(() => {document.title = "TestTitle"}, []);
    // const navigate = useNavigate();

    return (
        <div class="App">
            <Navbar />
            <p>Person Test</p>
            <Footer />
        </div>
    );
}

export default Person;