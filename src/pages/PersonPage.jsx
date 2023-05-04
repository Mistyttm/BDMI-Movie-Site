import React, { useEffect } from "react";
import Navbar from '../components/navbar';
import Person from "../components/person";
import Footer from "../components/footer";

function PersonPage() {
    
    return (
        <div className="App">
            <Navbar />
            <Person />
            <Footer />
        </div>
    );
}

export default PersonPage;