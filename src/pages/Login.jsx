import React from "react";
import { useEffect } from "react";
import LoginBox from "../components/LoginBox";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../Styles/Login/Login.css";
import "../Styles/Login/LoginMedia.css";
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init();

function Login(props) {
    useEffect(() => {
        document.title = props.title;
    }, []);
    return (
        <div className="App">
            <Navbar />
            <div data-aos="flip-right">
                <LoginBox />
            </div>
            <Footer />
        </div>
    );
}

export default Login;
