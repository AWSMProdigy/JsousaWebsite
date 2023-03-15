import React from 'react';
// import '../App.css';
import Featured from '../Featured';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHandshake, faStar } from '@fortawesome/free-solid-svg-icons'
import {Button} from '../Button'


function Home(){
    return (
        <div className='parallax platBG'>
            <div className='hero'>
                <img alt="headshot"src={require("../../images/Jorge.jpg")} className="headshot"/>    
                <h1>Jorge Sousa</h1>
                <p>The Realtor That Fights For You</p>            
            </div>
            <div className='homeSection blueBG'>
                <h1>Your Florida realtor dedicated to helping you with...</h1>
                <div className='homeCardContainer'>
                    <div className='homeCard'>
                        <FontAwesomeIcon icon={faHouse}/>
                        <h2>Houses</h2>
                        {/* Carousel of houses */}
                    </div>
                    <div className='homeCard'>
                        <FontAwesomeIcon icon={faHandshake}/>
                        <h2>Vacant Land</h2>
                        {/* Carousel of vacant land */}
                    </div>
                    <div className='homeCard'>
                        <FontAwesomeIcon icon={faStar}/>
                        <h2>Mobile Homes</h2>
                        {/* Carousel of mobile homes */}
                    </div>
                    <div className='homeCard'>
                        <FontAwesomeIcon icon={faStar}/>
                        <h2>Mobile Homes</h2>
                    </div>
                </div>
                {/* <div className='homeCardContainer'>
                    <div className='homeCard'>
                        <FontAwesomeIcon icon={faHouse}/>
                        <h2>Reliable</h2>
                    </div>
                    <div className='homeCard'>
                        <FontAwesomeIcon icon={faHandshake}/>
                        <h2>Dedicated To You</h2>
                    </div>
                    <div className='homeCard'>
                        <FontAwesomeIcon icon={faStar}/>
                        <h2>Experienced</h2>
                    </div>
                </div> */}
            </div>
            {/* <div className='homeSection parallax'>
                Could have listing examples of different items
            </div> */}
            <Featured></Featured>
        </div>
    );

}

export default Home;
