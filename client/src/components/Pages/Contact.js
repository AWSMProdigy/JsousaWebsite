import React, { useState, useEffect} from 'react';
import Jorge from '../../images/Jorge.webp'
import { Button } from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMailBulk } from '@fortawesome/free-solid-svg-icons'


export default function Contact() {

    const [formState, setFormState] = useState({
        failedName: false,
        failedEmail: false,
        failedPhone: false,
        failedComment: false
    })

    function contactSubmit(e){
        e.preventDefault();
        let complete = true;
        let tempState = {
            failedName: false,
            failedEmail: false,
            failedPhone: false,
            failedComment: false
        }
        if(e.target[0].value === ""){
            tempState.failedName = true;
            complete = false;
        }
        if(e.target[1].value === ""){
            tempState.failedPhone = true;
            complete = false;
        }
        if(e.target[2].value === ""){
            tempState.failedEmail = true;
            complete = false;
        }
        if(e.target[3].value === ""){
            tempState.failedComment = true;
            complete = false;
        }
        setFormState(tempState);     
        if(complete){
            try{
            fetch('/api/email', ({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: e.target[0].value, phone: e.target[1].value, email: e.target[2].value, comment: e.target[3].value})
            })).then(response => response.json())
            }
            catch(err){
                console.log(err);
            }
        }
        e.target.forEach(input => input.value = "");
        alert("Email sent!");
        }

        return (
            <>
            <h1 style={{'textAlign': 'center', 'marginBottom': '10px', 'fontSize': '60px'}}>
                Contact Jorge
            </h1>
            <h2 style={{'textAlign': 'center', 'color': 'rgb(104 104 104)', 'margin': '10px 20px'}}>Jorge is always happy to help. For any inquiries, feel free to fill out this form and he will get back to you as soon as he can!</h2>
            <div className='contactDiv'>
                <img alt="headshot"src={Jorge}/>
                <form className='listingContact' id="contactPageForm" onSubmit={contactSubmit}>
                    <div className='socials'>
                        <div style={{'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'marginBottom': '5px'}}>
                            <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                            <h3>352-857-7499</h3>
                        </div>
                        <div style={{'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center'}}>
                            <FontAwesomeIcon icon={faMailBulk}></FontAwesomeIcon>
                            <h3>Jorgesousarealtor@gmail.com</h3>
                        </div>
                    </div>
                    <div className='contactQueries'>
                        <div>
                            <div>
                                <input type="text" name='name' placeholder='Name'/>
                                <span className={formState.failedName ? `invalid` : `valid`}>Please enter your name</span>
                            </div>  
                            <div>
                                <input type="text" name='phone' placeholder='Phone'/>
                                <span className={formState.failedPhone ? `invalid` : `valid`}>Please enter your phone</span>
                            </div>
                            <div>
                                <input type="text" name='email' placeholder='Email'/>
                                <div className={formState.failedEmail ? `invalid` : `valid`}>Please enter your email</div>
                            </div>
                        </div>
                        <div>
                            <div>
                            <textarea style={{'height': '66px'}}type="text" name='message' placeholder="Message"/>
                                <span className={formState.failedComment ? `invalid` : `valid`}>Please enter a message</span>
                            </div>
                        </div>
                    </div>
                    <button>
                        Send Message
                    </button>
                </form>  
            </div>   
            </>
        )
    }
