const paginationTotal = async () => {
    const response = await fetch(
        "http://sefdb02.qut.edu.au:3000/movies/search"
    ).catch(err => console.log(err)); // hits the url provided and gets the response with its status code, body, headers, etc.
    const jsonData = await response.json(); // parses the response body to JSON

    return jsonData.pagination.total;
};

export default paginationTotal;