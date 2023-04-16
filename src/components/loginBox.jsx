import { Link } from "react-router-dom";

function LoginBox() {
    return(
        <div className="loginWrapper">
            <div className="loginBox">
                <h1 className="loginTitle">Login</h1>
                <form>
                    <input type="text" className="loginEmail" id="loginEmail" name="loginEmail" placeholder="Email" />
                    <input type="text" className="loginPassword" id="loginPassword" name="loginPassword" placeholder="Password" />
                    <input type="submit" classname="loginSubmit" id="loginSubmit" name="LoginSubmit" value="Login" />
                </form>
                <Link to="/Register" className="register">Don't have an account? Register here</Link>
            </div>
        </div>
    );
}

export default LoginBox;