import { Link } from "react-router-dom";

function Navbar() {


    return (
        <div class="navbar-bg">
            <nav class="navlinks">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Movies">Movies</Link>
                    </li>
                    <li>
                        <Link to="/Login">Login/Register</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;