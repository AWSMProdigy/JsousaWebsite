import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faSquare } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Jorge from '../../images/Jorge.jpg'
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
    
    const [formState, setFormState] = useState({
        failedName: false,
        failedEmail: false,
        failedPhone: false,
        failedComment: false
    })
    const [formFinished, setForm] = useState(false);


    useEffect(() => {
        if(!listing){
            console.log("api/listings/" + params.ListingKey)
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
            <Carousel responsive={responsive} showDots={true} draggable={false}>
                {listing &&
                (listing.Media.map((image, i) => {
                return(
                    <div style={{'height': '100%'}}><img className='carouselImg' alt={listing.UnparsedAddress} src={"https://d190pq94iryepm.cloudfront.net" + image.MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')}></img></div>
                )
            }))
        }
            </Carousel>
            <div className='listingBot'>
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
                    <hr style={{'width': '98%', 'border-bottom': '2px solid #0c2e53', 'margin': '0 auto'}}></hr>
                    <div className='listingDescriptionDetails'>
                        <div style={{'width': '49%'}}>
                            <div className='listingDetail'>
                                <span>Appliances -</span>
                                <div className='spacer'></div>
                                <ul className='appList'><ApplianceList/></ul>
                            </div>
                            <div className='listingDetail'>
                                <span>Year Built -</span>
                                <div className='spacer'></div>
                                <span>{listing.YearBuilt}</span>
                            </div>
                            <div className='listingDetail'>
                                <span>Property Type -</span>
                                <div className='spacer'></div>
                                <span>{listing.PropertySubType}</span>
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
                                <span>Building sqft -</span>
                                <div className='spacer'></div>
                                <span>{listing.BuildingAreaTotal}</span>
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