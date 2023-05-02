const refresh = async (token) => {
    try {
        // Send a POST request to the server to refresh the token
        const response = await fetch("http://sefdb02.qut.edu.au:3000/user/refresh", {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken: token,
            }),
        });
        // Parse the response data as JSON
        const data = await response.json();
        // If an error occurred, throw an error with the message
        if (data.error) {
            throw new Error(data.message);
        }
        // If the token was successfully refreshed, store the new tokens and the time of creation in local storage
        localStorage.setItem("bearerToken", JSON.stringify(data.bearerToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        localStorage.setItem("timeOfCreation", JSON.stringify(new Date().getTime()));
        return true;
    } catch (error) {
        // If an error occurred, throw an error with the message
        throw new Error(error);
    }
};

export default refresh;
