// Importing necessary dependencies from React and React Router
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

// Defining the LoginBox component
function LoginBox() {
    // Initializing state variables for form data, login error, and React Router navigation
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        longExpiry: false,
    });
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    // Defining a function to handle changes to the form input fields
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        // Using a functional update to merge the new input value with the existing form data
        const newValue = type === "checkbox" ? checked : value;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
    };

    // Setting the current date and time for proper expiry
    let date = new Date().getTime();

    // Defining a function to handle the form submission and login request
    const handleLogin = async () => {
        try {
            // Sending a POST request to the login API endpoint with the form data
            const url = "http://sefdb02.qut.edu.au:3000/user/login";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            // Parsing the response data as JSON and checking for a bearer token
            const data = await response.json();
            if (data.bearerToken) {
                // If a bearer token is received, clear the login error and store the tokens in local storage before navigating to the home page
                setLoginError(null);
                localStorage.setItem(
                    "bearerToken",
                    JSON.stringify(data.bearerToken)
                );
                localStorage.setItem(
                    "refreshToken",
                    JSON.stringify(data.refreshToken)
                );
                localStorage.setItem(
                    "timeOfCreation",
                    JSON.stringify(Math.floor(date / 1000))
                );
                navigate("/");
            } else {
                // If a bearer token is not received, set the login error to the error message returned by the API
                setLoginError(data.message);
            }
        } catch (error) {
            // If an error occurs during the login request, set the login error to the error message
            setLoginError(error);
        }
    };

    // Rendering the LoginBox component with the form fields and login button
    return (
        <div className="loginWrapper">
            <div className="loginBox">
                <h1 className="loginTitle">Login</h1>
                <input
                    type="text"
                    name="email"
                    className="loginEmail"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    className="loginPassword"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                />
                <p className="checkP">
                    <input
                        type="checkbox"
                        name="longExpiry"
                        className="loginExpiry"
                        checked={formData.expiry}
                        onChange={handleInputChange}
                    />
                    Remember me?
                </p>
                <button id="loginSubmit" onClick={handleLogin}>
                    Login
                </button>
                {/* Rendering the login error message if there is one */}
                {loginError && (
                    <p className="error">
                        <FontAwesomeIcon icon={faCircleExclamation} /> Error:{" "}
                        {loginError}
                    </p>
                )}
                <Link to="/Register" className="register">
                    Don't have an account? Register here
                </Link>
            </div>
        </div>
    );
}

// Exporting the LoginBox component
export default LoginBox;
