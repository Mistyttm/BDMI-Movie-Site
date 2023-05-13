import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import checkToken from "../apis/tokenRefresh";
import logout from "../apis/logout";
import "../Styles/Navbar/navMedia.css";
import Aos from "aos";
import "aos/dist/aos.css";
import {
    faCircleExclamation,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Movies/Movies.css";

Aos.init();

function Navbar() {
    const navigate = useNavigate();

    const [desktopLinksVisible, setDesktopLinksVisible] = useState(false);
    const [mobileLinksVisible, setMobileLinksVisible] = useState(false);
    const [ableLogout, setAbleLogout] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        checkToken(setAbleLogout);
    }, []);

    function toggleDesktopLinks() {
        setDesktopLinksVisible(!desktopLinksVisible);
    }

    function toggleMobileLinks() {
        setMobileLinksVisible(!mobileLinksVisible);
    }

    function logoutButton() {
        logout(JSON.parse(localStorage.getItem("refreshToken")).token);
    }

    const searchMovie = (e) => {
        e.preventDefault();
        navigate("/Movies?q=" + search);
    };

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
                <form onSubmit={searchMovie}>
                    <input
                        className="searchBox"
                        type="text"
                        id="q"
                        name="q"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button id="subButton" type="submit" onClick={searchMovie}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
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
                                        logoutButton();
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
