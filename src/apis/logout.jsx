export default async function logout(token) {
    try {
        // Send a POST request to the server to logout
        const response = await fetch(
            "http://sefdb02.qut.edu.au:3000/user/logout",
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
        // If the logout was successful, remove the tokens and the time of creation from local storage
        localStorage.removeItem("bearerToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("timeOfCreation");
        return true;
    } catch (error) {
        // If an error occurred, throw an error with the message
        throw new Error(error);
    }
}