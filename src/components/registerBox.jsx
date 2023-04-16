import { Link } from "react-router-dom";

function RegisterBox() {
    return(
        <div className="registerWrapper">
            <div className="registerBox">
                <h1 className="loginTitle">Register</h1>
                <form method="post">
                    <input type="text" className="registerEmail" id="registerEmail" name="registerEmail" placeholder="Email" />
                    <input type="text" className="registerPassword" id="registerPassword" name="registerPassword" placeholder="Password" />
                    <input type="text" className="registerConfPassword" id="registerConfPassword" name="registerConfPassword" placeholder="Confirm Password" />
                    <input type="submit" classname="registerSubmit" id="registerSubmit" name="registerSubmit" value="Register Now" />
                </form>
                <Link to="/Login" className="login">Already have an account? Login here</Link>
            </div>
        </div>
    );
}

export default RegisterBox;