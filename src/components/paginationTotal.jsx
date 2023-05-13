const paginationTotal = async (url) => {
    const response = await fetch(
        url
    ).catch(err => console.log(err)); // hits the url provided and gets the response with its status code, body, headers, etc.
    const jsonData = await response.json(); // parses the response body to JSON

    return jsonData.pagination.total;
};

export default paginationTotal;