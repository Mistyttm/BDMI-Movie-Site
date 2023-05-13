import React from "react";
import { useEffect } from "react";
import RegisterBox from "../components/RegisterBox";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../Styles/Register/Register.css";
import "../Styles/Register/RegisterMedia.css";
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init();

function Register(props) {
    useEffect(() => {
        document.title = props.title;
    }, []);
    return (
        <div className="App">
            <Navbar />
            <div data-aos="flip-right">
                <RegisterBox />
            </div>
            <Footer />
        </div>
    );
}

export default Register;
