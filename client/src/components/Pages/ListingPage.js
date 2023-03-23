import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import CardItem from '../CardItem';
let landListings;
let houseListings;
try{
    landListings = require('../../landListings.json');
    houseListings = require('../../houseListings.json');
}
catch(err){
    console.log(err)
}

function ListingPage(){
    const {ListingKey} = useParams();
    const [listing, setListing] = useState();
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if(!listing && window.location.href.indexOf("Residential") > -1) {
            setListing(houseListings.find(item => item.ListingKey === ListingKey));
        }
        else if(!listing){
            setListing(landListings.find(item => item.ListingKey === ListingKey));
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

    function Carousel(){
        if(listing){
            return(listing.Media.map((image, i) => {
                return(
                    <li className={index === i ? 'slide-active' : 'slide'}>
                        <img alt={listing.UnparsedAddress} src={"https://d190pq94iryepm.cloudfront.net" + image.MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')}></img>
                    </li>
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

    function contactSubmit(){
        
    }

    return(
        
        <div className='listingPageContainer'>
            {listing &&
            <>
            <div className='listingLeft'>
                <div className='carousel'>
                    <button className='carouselButton prev' onClick={backwards}>{'\u21D0'}</button>
                    <button className='carouselButton next' onClick={forwards}>{'\u21D2'}</button>
                    <ul>      
                        <Carousel/>
                    </ul>
                </div>
                <div className='botLeft'>
                    <span>Appliances - <ul className='appList'><ApplianceList/></ul></span>
                    <span>Year Built - {listing.YearBuilt}</span>
                    <span>Property Type - {listing.PropertySubType}</span>
                    <span>County - {listing.CountyOrParish}</span>
                </div>
            </div>
            <div className='listingRight'>
                <div className='listingDescription'>                   
                    <h1>{listing.UnparsedAddress}</h1>
                    <h3>{listing.City + `, ` + listing.StateOrProvince + ` ` + listing.PostalCode}</h3>
                    <div className='listingBtns'>
                    <button>
                        View On Map
                    </button>
                    <button>
                        Contact Me
                    </button>
                    </div>
                    <h2>{`$` + Number(listing.ListPrice).toLocaleString('en')}</h2>
                    <h3><span>{listing.BedroomsTotal}</span> Bed  <span>{listing.BathroomsTotalInteger}</span> Bath  <span>{listing.LotSizeSquareFeet}</span> sqft</h3>
                    <p>{listing.PublicRemarks}</p>             
                    <p></p>
                </div>     
                <form className='listingContact' onSubmit={contactSubmit}>
                    <h1>Contact Me</h1>          
                    <div>
                        <input type="text" name='name' placeholder='Name'/>
                        <span className={failed ? `invalid` : `valid`}>Please enter your name</span>
                    </div>  
                    <div>
                        <input type="text" name='phone' placeholder='Phone'/>
                        <span className={failed ? `invalid` : `valid`}>Please enter your name</span>
                    </div>
                    <div>
                        <input type="text" name='email' placeholder='Email'/>
                        <span className={failed ? `invalid` : `valid`}>Please enter your name</span>
                    </div>
                    <textarea type="text" name='message' placeholder={`I am interested in this property at ` + listing.UnparsedAddress + `.`}/>
                    <button>
                        Contact Me
                    </button>
                    <img alt="headshot"src={require("../../images/Jorge.jpg")}/>
                </form>    
            </div>
            </>
            }
        </div>
        
    )
}

export default ListingPage;