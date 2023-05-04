import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Person from "../components/person";
import Footer from "../components/footer";
import checkToken from "../apis/tokenRefresh";
import UnautorisedPerson from "../components/loggedOutPerson";
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
