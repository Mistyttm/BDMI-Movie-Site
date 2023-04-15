import Navbar from './components/navbar';
import Slideshow from './components/carousel';
import Footer from './components/footer';
import './Styles/App.css';
import './Styles/Navbar/navMedia.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Slideshow />
      <Footer />
    </div>
  );
}

export default App;
