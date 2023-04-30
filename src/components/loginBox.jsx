import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function LoginBox() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [expiry, setExpiry] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const navigate = useNavigate();

    const login = () => {
        const url = "http://sefdb02.qut.edu.au:3000/user/login";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                longExpiry: expiry,
            }),
        })
            .then((res) =>
                res.json().then((res) => {
                    if (res.bearerToken) {
                        setLoginError(null);
                        localStorage.setItem(
                            "bearerToken",
                            JSON.stringify(res.bearerToken)
                        );
                        localStorage.setItem(
                            "refeshToken",
                            JSON.stringify(res.refreshToken)
                        );
                        navigate("/");
                    } else {
                        setLoginError(res.message);
                    }
                })
            )
            .catch((error) => setLoginError(error));
    };

    return (
        <div className="loginWrapper">
            <div className="loginBox">
                <h1 className="loginTitle">Login</h1>
                <input
                    type="text"
                    className="loginEmail"
                    id="loginEmail"
                    name="loginEmail"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => {
                        const { value } = event.target;
                        setEmail(value);
                    }}
                />
                <input
                    type="password"
                    className="loginPassword"
                    id="loginPassword"
                    name="loginPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => {
                        const { value } = event.target;
                        setPassword(value);
                    }}
                />
                <p className="checkP">
                    <input
                        type="checkbox"
                        className="loginExpiry"
                        id="loginExpiry"
                        value={expiry}
                        onChange={() => setExpiry((prev) => !prev)}
                    />
                    Remember me?
                </p>
                <button id="loginSubmit" onClick={login}>
                    Login
                </button>
                {loginError != null ? (
                    <p className="error">
                        <FontAwesomeIcon icon={faCircleExclamation} /> Error:{" "}
                        {loginError}
                    </p>
                ) : null}
                <Link to="/Register" className="register">
                    Don't have an account? Register here
                </Link>
            </div>
        </div>
    );
}

export default LoginBox;
