import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Button } from '../Button'
// import './Footer.css'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <div className='footer-container'>
            <div className="socialIcons">  
                <i>
                    <FontAwesomeIcon icon={faFacebook}/>     
                </i>
                <i id="instaI">
                    <FontAwesomeIcon icon={faInstagram}/>     
                </i>
                <i id="twitI">
                    <FontAwesomeIcon icon={faTwitter}/>     
                </i>
                <i id="linkedI">
                    <FontAwesomeIcon icon={faLinkedin}/>     
                </i>
            </div>
            <div className='footerLinks'>
                <Link to='/'>Home</Link>
                <div className='vl'></div>
                <Link to='/About'>About</Link>
                <div className='vl'></div>
                <Link to='/Listings'>Listings</Link>
            </div>
            <div>
                <Link>
                    Contact Me
                </Link>
            </div>
        </div>
    )
}

export default Footer
