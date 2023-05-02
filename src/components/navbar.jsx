import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import refresh from "../apis/tokenRefresh";
import "../Styles/Navbar/navMedia.css";

function Navbar() {
    const [desktopLinksVisible, setDesktopLinksVisible] = useState(false);
    const [mobileLinksVisible, setMobileLinksVisible] = useState(false);
    const [ableLogout, setAbleLogout] = useState(false);

    useEffect(() => {
        let date = new Date().getTime();
        let bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
        let refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
        let time = JSON.parse(localStorage.getItem("timeOfCreation"));

        if (bearerToken !== null || refreshToken !== null || time !== null) {
            console.log(time);
            console.log(date - time);
            if (date - time > bearerToken.expires_in) {
                try {
                    setAbleLogout(refresh(refreshToken.token));
                } catch (error) {
                    console.log("Caught");
                    setAbleLogout(false);
                }
            }
        }
    }, []);

    function toggleDesktopLinks() {
        setDesktopLinksVisible(!desktopLinksVisible);
    }

    function toggleMobileLinks() {
        setMobileLinksVisible(!mobileLinksVisible);
    }

    function logout() {
        localStorage.removeItem("bearerToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("timeOfCreation");
    }

    return (
        <div className="navbar-bg">
            <nav className="navlinks">
                <h1 className="logo">
                    <Link to="/" className="logoLink">
                        BDMI
                    </Link>
                </h1>
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleDesktopLinks();
                    }}
                    className="icon">
                    <FontAwesomeIcon icon={faBars} />
                </a>
                <form action="/Movies">
                    <input
                        className="searchBox"
                        type="text"
                        id="globalSearch"
                        name="globalSearch"
                        placeholder="Search"
                    />
                </form>
                <ul>
                    <li id="login">
                        <h2>
                            {!ableLogout && (
                                <Link to="/Login" className="loginreg">
                                    Login/Register
                                </Link>
                            )}
                            {ableLogout && (
                                <a
                                    className="loginreg"
                                    href="/"
                                    onClick={(e) => {
                                        // e.preventDefault();
                                        logout();
                                    }}>
                                    Logout
                                </a>
                            )}
                        </h2>
                    </li>
                </ul>
            </nav>
            <div
                id="desktopLinks"
                style={{ display: desktopLinksVisible ? "block" : "none" }}>
                <h3>
                    <Link to="/" className="mobileLink">
                        Home
                    </Link>
                </h3>
                <h3>
                    <Link to="/Movies" className="deskLink">
                        Movies
                    </Link>
                </h3>
            </div>
            <nav className="mobileNav">
                <h1 className="logo">
                    <Link to="/" className="logoLink">
                        BDMI
                    </Link>
                </h1>
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleMobileLinks();
                    }}
                    className="icon">
                    <FontAwesomeIcon icon={faBars} />
                </a>
            </nav>
            <div
                id="mobileLinks"
                style={{ display: mobileLinksVisible ? "block" : "none" }}>
                <h3>
                    <Link to="/Login" className="mobileLink">
                        Login/Register
                    </Link>
                </h3>
                <h3>
                    <Link to="/" className="mobileLink">
                        Home
                    </Link>
                </h3>
                <h3>
                    <Link to="/Movies" className="mobileLink">
                        Movies
                    </Link>
                </h3>
            </div>
        </div>
    );
}

export default Navbar;
