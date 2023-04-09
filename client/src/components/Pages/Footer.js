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
                    <a href='https://www.facebook.com/jorge.sousa67'><FontAwesomeIcon icon={faFacebook}/></a>     
                </i>
                <i id="instaI">
                    <a href='https://www.instagram.com/jorgerealestatesalesagent/'><FontAwesomeIcon icon={faInstagram}/></a> 
                </i>
                <i id="twitI">
                    <a href='https://twitter.com/JorgeSousa2000'><FontAwesomeIcon icon={faTwitter}/></a>     
                </i>
                <i id="linkedI">
                    <a href='https://www.linkedin.com/in/jorge-sousa-50b041171/'><FontAwesomeIcon icon={faLinkedin}/></a>  
                </i>
            </div>
            <div className='footerLinks'>
                <Link style={{ 'textDecoration': 'none', 'color': '#ebebeb' }} to='/'>Home</Link>
                <div className='vl'></div>
                <Link style={{ 'textDecoration': 'none', 'color': '#ebebeb' }} to='/About'>About</Link>
                <div className='vl'></div>
                <Link style={{ 'textDecoration': 'none', 'color': '#ebebeb' }} to='/Contact'>Contact</Link>
            </div>
        </div>
    )
}

export default Footer
