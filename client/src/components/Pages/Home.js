import React from 'react';
// import '../App.css';
import Featured from '../Featured';
import County from '../County';
import Jorge from '../../images/Jorge.webp'
import SearchForm from '../SearchForm';

function Home(){

    return (
        <div className='parallaxHome platBG'>
            <div className='hero'>
                <img alt="headshot"src={Jorge} className="headshot"/>    
                <h1>Jorge Sousa</h1>
                <p>The Realtor That Fights For You</p>            
            </div>
            <div className='searchSection blueBG'>
                <h1>Find Your Next Home</h1>
                <SearchForm query={{
                    searchType: "Residential",
                    bath: "Any",
                    bed: "Any",
                    minPrice: "Any",
                    maxPrice: "Any",
                    size: "Any",
                    county: "Any"
                }}/> 
            </div>
            <Featured></Featured>
            <County></County>
        </div>
    );

}

export default Home;
