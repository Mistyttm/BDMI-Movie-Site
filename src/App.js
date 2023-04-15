import Navbar from './components/navbar';
import HeroImg from './components/hero';
import Footer from './components/footer';
import './Styles/App.css';
import './Styles/Navbar/navMedia.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <HeroImg />
        <div className="extra-text">
          <h1>Welcome to BDMI</h1>
          <h2>We hope you find what you're looking for</h2>
          <p>We're not IMDB</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
