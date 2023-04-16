import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../Styles/notFound/404.css';

function NotFound() {
    return (
        <div className="App">
            <Navbar />
            <div className="errorMessage">
                <h1>404</h1>
                <h2>Oops, something went wrong</h2>
            </div>
            <Footer />
        </div>
    );
}

export default NotFound;