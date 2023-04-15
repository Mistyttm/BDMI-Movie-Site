import React from "react";
import Navbar from '../components/navbar';
import Footer from "../components/footer";
// import { useNavigate } from "react-router-dom";

function Person() {
    // const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <p>Person Test</p>
            <Footer />
        </div>
    );
}

export default Person;