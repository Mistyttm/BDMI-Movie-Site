let tempNum = 0;

export default function callMovies(
    params,
    URL,
    setResults,
    setRequestError,
    movieValue
) {
    // Fetches movie data from server and sets data source
    fetch(URL + movieValue)
        .then((res) => res.json())
        .then((data) => {
            tempNum = tempNum + data.data.length;
            params.successCallback(data.data, data.pagination.total);
            setResults(tempNum);
        })
        .catch((err) =>
            setRequestError(
                "404: Movies could not be found at this time. Please try again later."
            )
        );
    return tempNum;
}
