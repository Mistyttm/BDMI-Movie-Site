import Navbar from "../components/Navbar";
import HeroImg from "../components/Hero";
import Footer from "../components/Footer";
import "../Styles/App.css";
import "../Styles/Navbar/navMedia.css";
import { useEffect } from "react";

function Home(props) {
    useEffect(() => {
        document.title = props.title;
    }, []);
    return (
        <div className="App">
            <Navbar />
            <div className="main-content">
                <HeroImg />
                <div className="extra-text">
                    <h1>Welcome to BDMI</h1>
                    <h2>We hope you find what you're looking for</h2>
                    <p>We're not IMDB</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;