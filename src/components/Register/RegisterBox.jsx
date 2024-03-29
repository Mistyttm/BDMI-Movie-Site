import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import RegisterApi from "../../apis/RegisterApiCall";


function RegisterBox() {
    // Define state variables for the email, password, and confirmation password fields
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfPassword, setRegisterConfPassword] = useState("");

    // Define state variables for displaying errors
    const [emailError, setEmailError] = useState(null);
    const [passError, setPassError] = useState(null);
    const [formError, setFormError] = useState(null);

    const navigate = useNavigate();

    const checkPass = () => {
        if ((registerConfPassword !== registerPassword && registerConfPassword !== "" && registerPassword !== "")) {
            setPassError("Passwords do not match");
        } else {
            setPassError(null);
        }
    }

    useEffect(() => checkPass(), [registerConfPassword,registerPassword]);

    // Function to handle user registration
    const register = () => {
        // Check if the email and password fields have been filled out correctly
        if (emailError !== null || passError !== null) {
            // If not, set the form error
            setFormError("Please fill the form out correctly");
        } else {
            // If yes, reset the form error and send a POST request to the server
            setFormError(null);
            const url = "http://sefdb02.qut.edu.au:3000/user/register";

            RegisterApi(url, registerEmail, registerPassword, setFormError, navigate);
        }
    };

    return (
        <div className="registerWrapper">
            <div className="registerBox">
                <h1 className="loginTitle">Register</h1>
                <div>
                    <input
                        type="text"
                        className="registerEmail"
                        id="registerEmail"
                        name="registerEmail"
                        placeholder="Email"
                        value={registerEmail}
                        onChange={(event) => {
                            const { value } = event.target;
                            if (
                                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
                            ) {
                                setEmailError(null);
                            } else {
                                setEmailError("This is not a valid email");
                            }
                            setRegisterEmail(value);
                        }}
                    />
                    {emailError != null ? (
                        <p className="inputError">
                            <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                            Error: {emailError}
                        </p>
                    ) : null}
                    <input
                        type="password"
                        className="registerPassword"
                        id="registerPassword"
                        name="registerPassword"
                        placeholder="Password"
                        value={registerPassword}
                        onChange={(event) => {
                            setRegisterPassword(event.target.value);
                        }}
                    />

                    <input
                        type="password"
                        className="registerConfPassword"
                        id="registerConfPassword"
                        name="registerConfPassword"
                        placeholder="Confirm Password"
                        value={registerConfPassword}
                        onChange={(event) => {
                            const { value } = event.target;
                            setRegisterConfPassword(value);
                        }}
                    />
                    {passError != null ? (
                        <p className="inputErrorPass">
                            <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                            Error: {passError}
                        </p>
                    ) : null}
                    <button id="registerSubmit" onClick={register}>
                        Register Now
                    </button>
                    {formError != null ? (
                        <p className="formError">
                            <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                            Error: {formError}
                        </p>
                    ) : null}
                </div>
                <Link to="/Login" className="login">
                    Already have an account? Login here
                </Link>
            </div>
        </div>
    );
}

export default RegisterBox;
