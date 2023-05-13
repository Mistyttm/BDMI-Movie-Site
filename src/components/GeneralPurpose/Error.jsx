import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Component that is displayed when the user is unauthorized
function ErrorPopup(props) {
    const navigate = useNavigate();

    // Sets the document title to "Oops, Please login" when the component mounts
    useEffect(() => {
        document.title = "Oops, An error occured";
    }, []);

    // Render the component
    return (
        <div className="pageWrapper">
            <div className="personWrapperLogout">
                <h1>Oops, looks like an error ocurred</h1>
                <h2>Please go back and try again</h2>
            </div>
        </div>
    );
}

export default ErrorPopup;
