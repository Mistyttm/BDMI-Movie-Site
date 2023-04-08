import { Link } from "react-router-dom";
import logo from "../logo.svg";

function Navbar() {


    return (
        <div class="navbar-bg">
            {/* <img src={logo} alt="website logo"/> */}
            <nav class="navlinks">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Movies">Movies</Link>
                    </li>
                    <li id="login">
                        <Link to="/Login">Login/Register</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;