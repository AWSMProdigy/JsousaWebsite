import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faSquare } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Jorge from '../../images/Jorge.webp'
import Platinum from '../../images/Platinum.webp'
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
    const [listing, setListing] = useState()
    const params = useParams();
    const [isHouse, setHouse] = useState(false);
    
    const [formState, setFormState] = useState({
        failedName: false,
        failedEmail: false,
        failedPhone: false,
        failedComment: false
    })
    const [formFinished, setForm] = useState(false);


    useEffect(() => {
        if(params.propertyType === "Residential"){
            setHouse(true);
        }
        if(!listing){
            try{
                fetch("/api/listings/" + params.ListingKey)
                .then((result) => result.json()).then((data) => setListing(data))
            }
            catch(err){
                console.log(err)
            }
        }
    }, [])

    
    // If residential is in the url, search only residential listings. Otherwise, search land

    function ApplianceList(){
        if(listing && isHouse && listing.Appliances){
            return(
                <div className='listingDetail'>
                    <span>Appliances -</span>
                    <div className='spacer'></div>
                    <ul className='appList'>{listing.Appliances.map((app, i) => {
                        return(
                            <li>
                                {app}{i !== listing.Appliances.length - 1 && `,`}
                            </li>
                        )
                    })}
                    </ul>
                </div>
            )
        }
    }

    function UtilitiesList(){
        if(listing){
            return(listing.Utilities.map((app, i) => {
                return(
                    <li>
                        {app}{i !== listing.Utilities.length - 1 && `,`}
                    </li>
                )
            }))
        }
    }

    function LotFeatures(){
        if(listing && !isHouse && listing.LotFeatures){
            return(
                <div className='listingDetail'>
                    <span>Lot Features -</span>
                    <div className='spacer'></div>
                    <ul className='appList'>{listing.LotFeatures.map((app, i) => {
                        return(
                            <li>
                                {app}{i !== listing.LotFeatures.length - 1 && `,`}
                            </li>
                        )
                    })}
                    </ul>
                </div>
            )
        }
    }

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
        alert("Message sent!");
        e.target.reset();
        }
    }

    console.log(isHouse);
    return(
        
        <div className='listingPageContainer'>
            {listing &&
            <>
            <Carousel responsive={responsive} showDots={true} draggable={false}>
                {listing &&
                (listing.Media.map((image, i) => {
                return(
                    <div style={{'height': '100%'}}><img className='carouselImg' alt={listing.UnparsedAddress} src={"https://d190pq94iryepm.cloudfront.net" + image.MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')}></img></div>
                )
                }))
                }
                <div style={{'height': '100%'}}><img className='carouselImg' alt={'Jorge headshot'} src={Jorge}></img></div>
                <div style={{'height': '100%'}}><img className='carouselImg' alt={'Platinum'} src={Platinum}></img></div>
            </Carousel>
            <div className='listingBot'>
                <div className='listingDescription'>     
                    <div className='listingDescriptionTitle'>
                        <div>
                            <h1>{listing.UnparsedAddress}</h1>
                            <h3 id='listingCityCode'>{listing.City + `, ` + listing.StateOrProvince + ` ` + listing.PostalCode}</h3>
                        </div>
                        <div className='statWithIcon'>
                            {isHouse && 
                            <>
                            <div>
                                <FontAwesomeIcon icon={faBed}/>
                                <h3><span>{listing.BedroomsTotal}</span> Bed  </h3>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faBath}/>
                                <h3><span>{listing.BathroomsTotalInteger}</span> Bath  </h3>                               
                            </div>
                            </>
                            }
                            <div>
                                <FontAwesomeIcon icon={faSquare}/>
                                <h3><span>{listing.LotSizeAcres}</span> Acres  </h3>
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
                    <hr style={{'width': '98%', 'border-bottom': '2px solid #0c2e53', 'margin': '0 auto'}}></hr>
                    <div className='listingDescriptionDetails'>
                        <div style={{'width': '49%'}}>
                            {isHouse ? <ApplianceList/> : <LotFeatures/>}
                            <div className='listingDetail'>
                                <span>{isHouse ? 'Year Built -' : 'Water Source -'}</span>
                                <div className='spacer'></div>
                                <span>{isHouse ? listing.YearBuilt : listing.WaterSource}</span>
                            </div>
                            <div className='listingDetail'>
                                <span>Property Type -</span>
                                <div className='spacer'></div>
                                <span>{isHouse ? listing.PropertySubType : listing.PropertyType}</span>
                            </div>
                            <div className='listingDetail'>
                                <span>County -</span> 
                                <div className='spacer'></div>
                                <span>{listing.CountyOrParish}</span>
                            </div>
                        </div>
                        <vr style={{'border-left': '2px solid #0c2e53', 'margin-top': '5px'}}></vr>
                        <div style={{'width': '49%'}}>
                            <div className='listingDetail'>
                                <span>Utilities -</span> 
                                <div className='spacer'></div>
                                <ul className='appList'><UtilitiesList/></ul>
                            </div>
                            <div className='listingDetail'>
                                <span>{isHouse ? 'Building sqft -' : 'Lot Dimensions -'}</span>
                                <div className='spacer'></div>
                                <span>{isHouse ? listing.LivingArea : listing.LotSizeDimensions}</span>
                            </div>
                            <div className='listingDetail'>
                                <span>Days On Market -</span>
                                <div className='spacer'></div>
                                <span>{listing.CumulativeDaysOnMarket}</span>
                            </div>
                            <div className='listingDetail'>
                                <span>MLS Status -</span>
                                <div className='spacer'></div>
                                <ul className='appList'>For Sale</ul>
                            </div>
                            <div className='listingDetail'>
                                <span>Road Surface -</span>
                                <div className='spacer'></div>
                                <ul className='appList'>{listing.RoadSurfaceType}</ul>
                            </div>
                        </div>
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
                        I'm interested
                    </button>
                    <img alt="headshot"src={Jorge}/>
                </form>     
            </div>                  
            </>
            }
        </div>
        
    )
}

export default ListingPage;