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

    function applianceList(){
        if(listing){
            return(listing.Appliances.map((app, i) => {
                return(
                    <li>
                        {app}
                    </li>
                )
            }))
        }
    }

    return(
        <div className='listingPageContainer'>
            <div className='listingTop'>
                <div className='carousel'>
                    <button className='carouselButton prev' onClick={backwards}>{'\u21D0'}</button>
                    <button className='carouselButton next' onClick={forwards}>{'\u21D2'}</button>
                    <ul>      
                        <Carousel/>
                    </ul>
                </div>
                <div className='listingDescription'>
                    {listing && 
                    <>
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
                    </>
                    }
                    <p></p>
                </div>
            </div>
            <div className='listingBot'>
                <div className='botLeft'>
                    <span>Appliances - <ul><applianceList/></ul></span>
                    <span>Appliances - <applianceList/></span>
                    <span>Property Type - {listing.PropertySubType}</span>
                </div>
                <div className='botRight'>
                    <span>Property Type - {listing.YearBuilt}</span>
                </div>
            </div>
        </div>
    )
}

export default ListingPage;