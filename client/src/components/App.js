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
        </Routes>
        <Footer/>
      </Router>
      </React.StrictMode>
      </>
    );
    
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
root.render (<App />);