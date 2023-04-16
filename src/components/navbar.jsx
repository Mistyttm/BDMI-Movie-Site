import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import '../Styles/Navbar/navMedia.css';

function openMobileMenu() {
    let x = document.getElementById("mobileLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function openMenu() {
    let x = document.getElementById("desktopLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function Navbar() {


    return (
        <div className="navbar-bg">
            {/* <img src={logo} alt="website logo"/> */}
            <nav className="navlinks">
                <h1 className="logo"><Link to="/" className="logoLink">BDMI</Link></h1>
                <a href="javascript:void(0);" className="icon" onClick={openMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </a>
                <form action="/Movies">
                    <input className="searchBox" type="text" id="globalSearch" name="globalSearch" placeholder="Search" />
                </form>
                <ul>
                    <li id="login">
                        <h2><Link to="/Login" className="loginreg">Login/Register</Link></h2>
                    </li>
                </ul>
            </nav>
            <div id="desktopLinks">
                <h3><Link to="/Movies" className="deskLink">Movies</Link></h3>
            </div>
            <nav className="mobileNav">
                <h1 className="logo"><Link to="/" className="logoLink">BDMI</Link></h1>
                <a href="javascript:void(0);" className="icon" onClick={openMobileMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </a>
            </nav>
            <div id="mobileLinks">
                <h3><Link to="/Login" className="mobileLink">Login/Register</Link></h3>
                <h3><Link to="/Movies" className="mobileLink">Movies</Link></h3>
            </div>
            
        </div>
    );
}

export default Navbar;