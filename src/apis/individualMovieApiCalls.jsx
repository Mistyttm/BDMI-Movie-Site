const getApiData = async (apiURL, setMovieData) => {
    const response = await fetch(apiURL)
        .then((response) => response.json())
        .then((response) => setMovieData(response));
};

export default getApiData;