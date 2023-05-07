export const refresh = async (token) => {
    try {
        // Send a POST request to the server to refresh the token
        const response = await fetch(
            "http://sefdb02.qut.edu.au:3000/user/refresh",
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refreshToken: token,
                }),
            }
        );
        // Parse the response data as JSON
        const data = await response.json();
        // If an error occurred, throw an error with the message
        if (data.error) {
            throw new Error(data.message);
        }
        let time = new Date().getTime();
        // If the token was successfully refreshed, store the new tokens and the time of creation in local storage
        localStorage.setItem("bearerToken", JSON.stringify(data.bearerToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        localStorage.setItem("timeOfCreation", JSON.stringify(Math.floor(time / 1000)));
        return true;
    } catch (error) {
        // If an error occurred, throw an error with the message
        throw new Error(error);
    }
};

export default async function checkToken(setAbleLogout) {
    // Get the current time, bearer token, refresh token, and time of creation from localStorage.
    let date = new Date().getTime();
    date = Math.floor(date / 1000);
    const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    const time = JSON.parse(localStorage.getItem("timeOfCreation"));

    // Check if the bearer token, refresh token, and time of creation exist and the bearer token has expired.
    if (
        bearerToken?.expires_in &&
        refreshToken?.token &&
        time &&
        date - time > bearerToken.expires_in
    ) {
        try {
            // Refresh the bearer token with the refresh token and update the state of the ability to logout.
            setAbleLogout(await refresh(refreshToken.token));
        } catch (error) {
            // Log an error message and set the state of the ability to logout to false if an error occurs.
            console.log(error);
            setAbleLogout(false);
            localStorage.removeItem("bearerToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("timeOfCreation");
        }
    } else if (
        bearerToken?.expires_in &&
        refreshToken?.token &&
        time &&
        date - time < bearerToken.expires_in
    ) {
        setAbleLogout(true);
    } else {
        setAbleLogout(false);
    }
}
