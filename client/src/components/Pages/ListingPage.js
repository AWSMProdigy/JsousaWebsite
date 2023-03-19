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
    const {listingKey} = useParams();
    const [listing, setListing] = useState();

    useEffect(() => {
        if(!listing && window.location.href.indexOf("Residential") > -1) {
            console.log("Nani?");
            setListing(houseListings.find(item => item.ListingKey === listingKey));
        }
        else{
            setListing(landListings.find(item => item.ListingKey === listingKey));
        }
    }, [])

    
    // If residential is in the url, search only residential listings. Otherwise, search land
    const [index, setIndex] = useState(0);
    
    function backwards(){
        setIndex(index === 0 ? 1 : index - 1)
    }

    function forwards(){
        setIndex(index === 1 ? 0 : index + 1)
    }

    function Carousel(){
        if(listing){
            {listing.media.map((image, i) => {
                return(
                    <li className={index === i ? 'slide-active' : 'slide'}>
                        <img alt={listing.UnparsedAddress} src={"https://d190pq94iryepm.cloudfront.net" + image.MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')}></img>
                    </li>
                )
            })}
        }
    }
    console.log(listing);

    return(
        <div className='listingPageContainer'>
            <div className='listingTop'>
                <div className='carousel'>
                    <button className='carouselButton prev' onClick={backwards}>&#8656</button>
                    <button className='carouselButton next' onClick={forwards}>&#8658</button>
                    <ul>      
                        <Carousel/>
                    </ul>
                </div>
                <div className='listingDescription'>
                    <h1></h1>
                    <p></p>
                </div>
            </div>
            <div className='listingBot'>
                <div className='botLeft'></div>
                <div className='botRight'></div>
            </div>
        </div>
    )
}

export default ListingPage;