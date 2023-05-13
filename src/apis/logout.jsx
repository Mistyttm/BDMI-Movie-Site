export default async function logout(token) {
    try {
        // Send a POST request to the server to logout
        const response = await fetch('http://sefdb02.qut.edu.au:3000/user/logout', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refreshToken': token
            })
        }).then((e) => {console.log(e)});

        localStorage.removeItem("bearerToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("timeOfCreation");
        return true;
    } catch (error) {
        // If an error occurred, throw an error with the message
        throw new Error(error);
    }
}