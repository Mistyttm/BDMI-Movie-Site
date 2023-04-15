import { Link } from "react-router-dom";
import '../Styles/Navbar/navMedia.css'

function Navbar() {


    return (
        <div class="navbar-bg">
            {/* <img src={logo} alt="website logo"/> */}
            <nav class="navlinks">
                <h1 class="logo">BDMI</h1>
                <form>
                    <input class="searchBox" type="text" id="globalSearch" name="globalSearch" placeholder="Search" />
                </form>
                <ul>
                    <li id="login">
                        <Link to="/Login" class="loginreg">Login/Register</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;