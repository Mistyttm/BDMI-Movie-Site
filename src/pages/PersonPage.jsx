import React, { useEffect, useState } from "react";
import Navbar from "../components/GeneralPurpose/Navbar";
import Person from "../components/Person/Person";
import Footer from "../components/GeneralPurpose/Footer";
import checkToken from "../apis/tokenRefresh";
import UnautorisedPerson from "../components/Person/LoggedOutPerson";
import "../Styles/Person/person.css";
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init();

function PersonPage() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        checkToken(setLoggedIn);
    }, []);

    return (
        <div className="App">
            <Navbar />
            {loggedIn ? <Person /> : <div data-aos="flip-right"><UnautorisedPerson /></div>}
            <Footer />
        </div>
    );
}

export default PersonPage;
