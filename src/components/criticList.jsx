function Critic(props) {
    let badgeClass = "badge0"; // Initialize badgeClass to "badge0"

    // Check if the value prop is not 0
    if (props.value !== 0) {
        // Determine badgeClass based on source and value props
        if (props.source === "Internet Movie Database") {
            if (props.value <= 3) {
                badgeClass = "badge1";
            } else if (props.value <= 8) {
                badgeClass = "badge2";
            } else {
                badgeClass = "badge3";
            }
        } else if (props.source === "Rotten Tomatoes") {
            if (props.value <= 25) {
                badgeClass = "badge1";
            } else if (props.value <= 50) {
                badgeClass = "badge2";
            } else {
                badgeClass = "badge3";
            }
        } else if (props.source === "Metacritic") {
            if (props.value <= 40) {
                badgeClass = "badge1";
            } else if (props.value <= 75) {
                badgeClass = "badge2";
            } else {
                badgeClass = "badge3";
            }
        }
    }

    // Render the component with appropriate badgeClass and source prop
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

export default Critic;
