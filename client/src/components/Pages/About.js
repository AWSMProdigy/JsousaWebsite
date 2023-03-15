import React from 'react';
// import '../App.css';
export default function About(){
    return (
        <>
        <div className='aboutHero'>
            <img alt="headshot"src={require("../../images/Corvette.jpg")}/>  
            <h1>About Jorge</h1>          
        </div>
        <div className="About-sections">
            <div className="About-container">
                <img src={require("../../images/Corvette.jpg")} className="About-pic"/>
                <div className="About-text-container">
                    <h1>Well Traveled</h1>
                    <p className="About-text">Jorge is more than just a man behind a desk making calls: Jorge is well traveled and can tell you what you need to know about the area you want
                        to move in to. In his 2001 C5 Corvette, Jorge has traveled around the state and has the experience you NEED to make a great move.</p>
                </div>
            </div>
            <div className="About-container">
                <div className="About-text-container">
                    <h1>Family Man</h1>
                    <p className="About-text">Jorge is a family man that understands the urgency and difficulty associated with relocating your family, and will do everything in his power 
                    to get you into the home that will make you and your family happy! .</p>
                </div>
                <img src={require("../../images/Corvette.jpg")}/>
            </div>
            <div className='aboutGradient'>
                <div className='carousel'>
                    {/* Images of mother and father */}
                </div>
            </div>

            {/* Happy to help with: (list here) */}
            <div className="About-container">
                <img src={require("../../images/Platinum.jpg")}/>
                <div className="About-text-container">
                    <h1>More than willing to help you!</h1>
                    <p className="About-text">Jorge isn't alone! Jorge is backed by a brokerage that has access to information and experience that will make the difference between you making 
                    that move or being left in the dust.</p>
                </div>            
            </div>
        </div>
        </>
    )
}