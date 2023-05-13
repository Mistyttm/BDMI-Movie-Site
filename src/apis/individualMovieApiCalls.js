import { tempDataMovie } from "../components/GeneralPurpose/DummyData";

const getApiData = (apiURL, setMovieData, setApiError) => {
    const response = fetch(apiURL)
        .then((response) => response.json())
        .then((response) => setMovieData(response))
        .catch((err) => {
            setMovieData(tempDataMovie);
            setApiError(err);
        });
};

export default getApiData;
