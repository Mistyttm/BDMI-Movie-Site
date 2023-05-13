import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Person from "../components/Person";
import Footer from "../components/Footer";
import checkToken from "../apis/tokenRefresh";
import UnautorisedPerson from "../components/LoggedOutPerson";
import "../Styles/Person/person.css";

function PersonPage() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        checkToken(setLoggedIn);
    }, []);

    return (
        <div className="App">
            <Navbar />
            {loggedIn ? <Person /> : <UnautorisedPerson />}
            <Footer />
        </div>
    );
}

export default PersonPage;
