// import '../Styles/Hero/hero.css'
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init();

function HeroImg() {
    return (
        <div className="hero-conatiner">
            <img
                src="https://static.vecteezy.com/system/resources/previews/005/502/524/original/cinema-background-concept-movie-theater-object-on-red-curtain-background-and-movie-time-with-electric-bulbs-frame-illustration-free-vector.jpg"
                alt="MOVIE TIME"
                className="hero-image"
            />
        </div>
    );
}

export default HeroImg;
