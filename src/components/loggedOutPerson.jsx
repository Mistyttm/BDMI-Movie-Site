import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Component that is displayed when the user is unauthorized
function UnautorisedPerson() {
    const navigate = useNavigate();

    // Function to navigate to the login page
    const navToLogin = useCallback(() => {
        let path = `/Login`;
        navigate(path);
    }, [navigate]);

    // Sets the document title to "Oops, Please login" when the component mounts
    useEffect(() => {
        document.title = "Oops, Please login";
    }, []);

    // Render the component
    return (
        <div className="pageWrapper">
            <div className="personWrapperLogout">
                <h1>Oops, looks like you're not logged in</h1>
                <h2>Please login and try again</h2>
                <button id="login" onClick={navToLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default UnautorisedPerson;
