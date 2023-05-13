import { tempDataMovie } from "../components/GeneralPurpose/DummyData";

const getApiData = async (apiURL, setMovieData, setApiError) => {
    const response = await fetch(apiURL)
        .then((response) => response.json())
        .then((response) => setMovieData(response))
        .catch((err) => {
            setMovieData(tempDataMovie);
            setApiError(err);
        });
};

export default getApiData;
