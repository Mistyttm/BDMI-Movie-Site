import React, { useEffect } from "react";
import Navbar from '../components/navbar';
import Footer from "../components/footer";

function Person() {
    useEffect(() => {document.title = "TestTitle"}, []);

    return (
        <div class="App">
            <Navbar />
            <p>Person Test</p>
            <Footer />
        </div>
    );
}

export default Person;