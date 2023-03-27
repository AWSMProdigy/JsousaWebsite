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
import County from './Pages/County';


function App() {
    return (
      <>
      <React.StrictMode>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Listings' element={<County/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>
          <Route path='/Listings/:county/Residential/:ListingKey' element={<ListingPage/>}/>
          <Route path='/Listings/:county/Land/:ListingKey' element={<ListingPage/>}/>
          <Route path='/Listings/:county' element={<Listings/>}/>
        </Routes>
        <Footer/>
      </Router>
      </React.StrictMode>
      </>
    );
    
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
root.render (<App />);