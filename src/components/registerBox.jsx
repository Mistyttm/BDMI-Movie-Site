import { Link } from "react-router-dom";
import { useState } from "react";

function RegisterBox() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfPassword, setRegisterConfPassword] = useState("");

    const register = () => {
        const url = "http://sefdb02.qut.edu.au:3000/user/register";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: registerEmail, password: registerPassword }),
        })
        .then((res) => 
            res.json().then((res) => {
                console.log(res);
            })
        )
        .catch((error) => console.log(error));
    };


    return (
        <div className="registerWrapper">
            <div className="registerBox">
                <h1 className="loginTitle">Register</h1>
                <div>
                    <label htmlFor="registerEmail"></label>
                    <input
                        type="text"
                        className="registerEmail"
                        id="registerEmail"
                        name="registerEmail"
                        placeholder="Email"
                        value={registerEmail}
                        onChange={(event) => {
                            setRegisterEmail(event.target.value);
                        }}
                    />
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
                            setRegisterConfPassword(event.target.value);
                        }}
                    />
                    <button id="registerSubmit" onClick={register} >Register Now</button>
                </div>
                <Link to="/Login" className="login">
                    Already have an account? Login here
                </Link>
            </div>
        </div>
    );
}

export default RegisterBox;
