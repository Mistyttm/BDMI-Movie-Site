const getApiData = async (apiURL, setMovieData, token) => {
    const response = await fetch(apiURL, {
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + token,
        },
    })
        .then((response) => response.json())
        .then((response) => setMovieData(response));
};

export default getApiData;
