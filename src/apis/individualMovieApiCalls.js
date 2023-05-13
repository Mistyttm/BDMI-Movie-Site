import { tempDataMovie } from "../components/GeneralPurpose/DummyData";

export function personRoles(apiURL, setRowData) {
    fetch(apiURL)
        .then((res) => res?.json())
        .then((data) => data?.principals)
        .then((principal) =>
            principal.map((person) => {
                return {
                    id: person.id,
                    category: person.category,
                    name: person.name,
                    characters: person.characters,
                };
            })
        )
        .then((books) => setRowData(books))
        .catch((err) => console.log(err));
}

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
