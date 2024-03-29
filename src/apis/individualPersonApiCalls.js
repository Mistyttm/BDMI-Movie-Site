const getApiData = (apiURL, setMovieData, token) => {
    const response = fetch(apiURL, {
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + token,
        },
    })
        .then((response) => response.json())
        .then((response) => setMovieData(response))
        .catch((err) => console.log(err));
};

export default getApiData;
