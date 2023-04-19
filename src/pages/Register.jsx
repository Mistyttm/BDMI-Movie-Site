import React from "react";
import RegisterBox from '../components/registerBox';
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import '../Styles/Register/Register.css';
import '../Styles/Register/RegisterMedia.css'

function Register() {

    return (
        <div className="App">
            <Navbar />
            <RegisterBox />
            <Footer />
        </div>
    );
}

export default Register;