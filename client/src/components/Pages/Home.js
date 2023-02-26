import React from 'react';
// import '../App.css';
import Featured from '../Featured';
import {Button} from '../Button'


function Home(){
    return (
        <div className='parallax'>
            <div className='listing-container'>
                <img alt="headshot"src={require("../../images/Jorge.jpg")} className="headshot"/>                
            </div>
            <div className='homeSection'>
                <h1>The Realtor That Wants the Best For You</h1>
                <p>Jorge puts in the extra effort to make you happy and satisfied when purchasing a new home, or selling your old one.</p>
                <div className='homeCardContainer'>
                    <div className='homeCard'>
                        <i className="fab fa-facebook-f"/>
                        <h2>Reliable</h2>
                    </div>
                    <div className='homeCard'>
                        <i className="fab fa-house"></i>
                        <h2>Honest</h2>
                    </div>
                    <div className='homeCard'>
                        <i className="fa-solid fa-house"></i>
                        <h2>Experienced</h2>
                    </div>
                </div>
                <p>Work with a realtor who will fight for you</p>
            </div>
            <Featured></Featured>
        </div>
    );

}

export default Home;
