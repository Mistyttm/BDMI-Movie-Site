

// Function to handle user registration
function RegisterApi(url, registerEmail, registerPassword, setFormError, navigate) {
    
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: registerEmail,
            password: registerPassword,
        }),
    })
        .then((res) =>
            res.json().then((res) => {
                navigate("/Login"); // Redirect to the Login page on successful registration
            })
        )
        .catch((error) => setFormError(error.toString()));
}

export default RegisterApi;
