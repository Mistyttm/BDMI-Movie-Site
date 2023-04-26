function Critic(props) {
    // Get the badge class based on the source and value props
    const badgeClass = getBadgeClass(props.source, props.value);

    // Render the badge with the source and value props, along with the badge class
    return (
        <div className={props.source}>
            <p>
                <b className="titler">{props.source}</b>:{" "}
                <div className={badgeClass}>
                    <p>{props.value}</p>
                </div>
            </p>
        </div>
    );
}

// Function to get the badge class based on the source and value props
function getBadgeClass(source, value) {
    // If the value is 0, return the "badge0" class
    if (value === 0) {
        return "badge0";
    }

    // Otherwise, determine the appropriate badge class based on the source
    switch (source) {
        case "Internet Movie Database":
            return getIMDBBadgeClass(value);
        case "Rotten Tomatoes":
            return getRottenTomatoesBadgeClass(value);
        case "Metacritic":
            return getMetacriticBadgeClass(value);
        // If the source is not recognized, return the "badge0" class
        default:
            return "badge0";
    }
}

// Functions to determine the badge class based on the value for each source
function getIMDBBadgeClass(value) {
    if (value <= 3) {
        return "badge1";
    } else if (value <= 8) {
        return "badge2";
    } else {
        return "badge3";
    }
}

function getRottenTomatoesBadgeClass(value) {
    if (value <= 25) {
        return "badge1";
    } else if (value <= 50) {
        return "badge2";
    } else {
        return "badge3";
    }
}

function getMetacriticBadgeClass(value) {
    if (value <= 40) {
        return "badge1";
    } else if (value <= 75) {
        return "badge2";
    } else {
        return "badge3";
    }
}

export default Critic;
