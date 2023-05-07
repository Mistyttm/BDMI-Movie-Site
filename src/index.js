import { BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NotFound from "./pages/notFound";
import App from './App';
import Movies from "./pages/Movies";
import MoviePage from "./pages/MoviePage";
import PersonPage from "./pages/PersonPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App title="Home"/>} />
        <Route path="/Movies" element={<Movies title="Search Movies" />} />
        <Route path="/MoviePage" element={<MoviePage />} />
        <Route path="/Person" element={<PersonPage />} />
        <Route path="/Login" element={<Login title="Login" />} />
        <Route path="/Register" element={<Register title="Register" />} />
        <Route path="*" element={<NotFound title="Error: 404"/>} />
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
