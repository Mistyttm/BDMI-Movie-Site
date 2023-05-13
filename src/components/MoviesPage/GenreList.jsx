import { Fragment } from "react";

function Genre({ strings = [] }) {
    return (
        <Fragment>
            {strings.map((str) => (
                <li className="genreList" key={str}>{str}</li>
            ))}
        </Fragment>
    );
}

export default Genre;
