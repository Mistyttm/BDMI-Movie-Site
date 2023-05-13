import React, { useEffect, useState } from "react";
import Navbar from "../components/GeneralPurpose/Navbar";
import Person from "../components/Person/Person";
import Footer from "../components/GeneralPurpose/Footer";
import checkToken from "../apis/tokenRefresh";
import UnautorisedPerson from "../components/Person/LoggedOutPerson";
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
