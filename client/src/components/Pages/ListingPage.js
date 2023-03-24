import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faSquare } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import CardItem from '../CardItem';
let landListings;
let houseListings;


function ListingPage(){
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    let listingKey = useParams();
    const [listing, setListing] = useState()
    
    const [formState, setFormState] = useState({
        failedName: false,
        failedEmail: false,
        failedPhone: false,
        failedComment: false
    })
    const [formFinished, setForm] = useState(false);


    useEffect(() => {
        if(!listing){
            try{
                fetch("/api/listings/MFR681697741")
                .then((result) => result.json()).then((data) => setListing(data))
            }
            catch(err){
                console.log(err)
            }
        }
    }, [])

    
    // If residential is in the url, search only residential listings. Otherwise, search land
    const [index, setIndex] = useState(0);
    
    function backwards(){
        setIndex(index === 0 ? listing.Media.length - 1 : index - 1)
    }

    function forwards(){
        setIndex(index === listing.Media.length - 1 ? 0 : index + 1)
    }

    function CarouselItems(){
        if(listing){
            console.log(listing);
            return(listing.Media.map((image, i) => {
                return(
                    // <li className={index === i ? 'slide-active' : 'slide'}>
                    //     <img alt={listing.UnparsedAddress} src={"https://d190pq94iryepm.cloudfront.net" + image.MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')}></img>
                    // </li>
                    <div><img alt={listing.UnparsedAddress} src={"https://d190pq94iryepm.cloudfront.net" + image.MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')}></img></div>
                )
            }))
        }
    }

    function ApplianceList(){
        if(listing){
            return(listing.Appliances.map((app, i) => {
                return(
                    <li>
                        {app}{i !== listing.Appliances.length - 1 && `,`}
                    </li>
                )
            }))
        }
    }

    function contactSubmit(e){
        e.preventDefault();
        let tempState = {
            failedName: false,
            failedEmail: false,
            failedPhone: false,
            failedComment: false
        }
        if(e.target[0].value === ""){
            tempState.failedName = true;
        }
        if(e.target[1].value === ""){
            tempState.failedPhone = true;
        }
        if(e.target[2].value === ""){
            tempState.failedEmail = true;
        }
        if(e.target[3].value === ""){
            tempState.failedComment = true;
        }
        setFormState(tempState);     
    }

    return(
        
        <div className='listingPageContainer'>
            {listing &&
            <>
            <Carousel responsive={responsive}>
            <div><img alt={listing.UnparsedAddress} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')}></img></div>
            <div><img alt={listing.UnparsedAddress} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')}></img></div>
            <div><img alt={listing.UnparsedAddress} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')}></img></div>
            <div><img alt={listing.UnparsedAddress} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')}></img></div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
            </Carousel>
            <div className='listingLeft'>
                <div className='listingDescription'>     
                    <div className='listingDescriptionTitle'>
                        <div>
                            <h1>{listing.UnparsedAddress}</h1>
                            <h3 id='listingCityCode'>{listing.City + `, ` + listing.StateOrProvince + ` ` + listing.PostalCode}</h3>
                        </div>
                        <div className='statWithIcon'>
                            <div>
                                <FontAwesomeIcon icon={faBed}/>
                                <h3><span>{listing.BedroomsTotal}</span> Bed  </h3>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faBath}/>
                                <h3><span>{listing.BathroomsTotalInteger}</span> Bath  </h3>                               
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faSquare}/>
                                <h3><span>{listing.LotSizeSquareFeet}</span> sqft  </h3>
                            </div>
                        </div>
                        <div style={{'visibility': 'hidden'}}>
                            <div>
                                <h1>{listing.UnparsedAddress}</h1>
                                <h3 id='listingCityCode'>{listing.City + `, ` + listing.StateOrProvince + ` ` + listing.PostalCode}</h3>
                            </div>
                        </div>
                    </div>              
                    <h2>{`$` + Number(listing.ListPrice).toLocaleString('en')}</h2>
                    <p>{listing.PublicRemarks}</p>      
                    <span>Appliances - <ul className='appList'><ApplianceList/></ul></span>
                    <span>Year Built - {listing.YearBuilt}</span>
                    <span>Property Type - {listing.PropertySubType}</span>
                    <span>County - {listing.CountyOrParish}</span>       
                </div> 
            </div>         
            <form className='listingContact' onSubmit={contactSubmit}>
                <h1>Contact Me</h1>          
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
                    <span className={formState.failedEmail ? `invalid` : `valid`}>Please enter your email</span>
                </div>
                <div>
                    <textarea type="text" name='message' placeholder={`I am interested in this property at ` + listing.UnparsedAddress + `.`}/>
                    <span className={formState.failedComment ? `invalid` : `valid`}>Please enter a message</span>
                </div>
                <button>
                    Contact Me
                </button>
                <img alt="headshot"src={require("../../images/Jorge.jpg")}/>
            </form>              
            </>
            }
        </div>
        
    )
}

export default ListingPage;