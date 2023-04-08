import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../index.css';
import Home from './Pages/Home';
import Listings from './Pages/Listings';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Footer from './Pages/Footer';
import ListingPage from './Pages/ListingPage';
import County from './County';
import Search from "./Pages/Search";
import { ParallaxProvider } from "react-scroll-parallax";


function App() {
    return (
      <>

      <React.StrictMode>
      <div className="pageContainer">
        <div className="contentWrap">
          <Router>
            <NavBar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/About' element={<About/>}/>
              <Route path='/Contact' element={<Contact/>}/>
              <Route path='/Search/:propertyType' element={<Search/>}/>
              <Route path='/:county/:propertyType/:ListingKey' element={<ListingPage/>}/>
              <Route path='/:county' element={<Listings/>}/>
            </Routes>
            <Footer/>
          </Router>
        </div>
      </div>
      </React.StrictMode>
      </>
    );
    
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
root.render (<App />);