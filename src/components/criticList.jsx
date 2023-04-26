function Critic(props){
    let badgeClass = "badge0";

    if (props.source === "Internet Movie Database"){
        if (props.value <= 3){
            badgeClass = "badge1";
        }
        if (props.value <= 8 && props.value > 3){
            badgeClass = "badge2";
        }
        if (props.value <= 10 && props.value > 8){
            badgeClass = "badge3";
        }
    }
    if (props.source === "Rotten Tomatoes"){
        if (props.value <= 25){
            badgeClass = "badge1";
        }
        if (props.value <= 50 && props.value > 25){
            badgeClass = "badge2";
        }
        if (props.value <= 100 && props.value > 50){
            badgeClass = "badge3";
        }
    }
    if (props.source === "Metacritic"){
        if (props.value <= 40){
            badgeClass = "badge1";
        }
        if (props.value <= 75 && props.value > 40){
            badgeClass = "badge2";
        }
        if (props.value <= 100 && props.value > 75){
            badgeClass = "badge3";
        }
    }

    return(
        <div className={props.source}>
            <p><b className="titler">{props.source}</b>: <div className={badgeClass}><p>{props.value}</p></div></p>
        </div>
    );
}

export default Critic;