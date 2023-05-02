import React from "react";
import { useEffect } from "react";
import LoginBox from "../components/loginBox";
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import '../Styles/Login/Login.css'
import '../Styles/Login/LoginMedia.css'

function Login(props) {
    useEffect(() => {document.title = props.title}, []);
    return (
        <div className="App">
            <Navbar />
            <LoginBox />
            <Footer />
        </div>
    );
}

export default Login;