import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../index.css';
import Home from './Pages/Home';
import Listings from './Pages/Listings';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Footer from './Pages/Footer'
import ListingPage from './Pages/ListingPage'

function App() {
    return (
      <>
      <React.StrictMode>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Listings' element={<Listings/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>
          <Route path='/Listings/Residential/:ListingKey' element={<ListingPage/>}/>
          <Route path='/Listings/Land/:ListingKey' element={<ListingPage/>}/>
        </Routes>
        <Footer/>
      </Router>
      </React.StrictMode>
      </>
    );
    
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
root.render (<App />);