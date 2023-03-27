import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardItem from '../CardItem';

function Listings() {

    const [listings, setListings] = useState();
    const params = useParams();



    useEffect(() => {
        if(!listings){
            try{
                console.log(params.county);
                fetch("/api/county/" + params.county)
                .then((result) => result.json()).then((data) =>{
                    // console.log(data);
                    for(let i = 0; i < data.length; i++){
                        console.log(data[i].PropertyType);
                        if(data[i].PropertyType === "Land"){
                           setListings({houseListings:(data.slice(0, i)),
                           landListings:data.slice(i, data.length)}); 
                           break;
                        }
                    }
                })
            }
            catch(err){
                console.log(err)
            }
        }
    }, [])

    console.log(listings);
    
    return (
        <div className='featured'>
              <div className='header_search'>
              <textarea style={{visibility: "hidden"}}>Search</textarea>
                <h1>{params.county} county</h1>
                <textarea>Search</textarea>
            </div>
            <h1>Home listings</h1>
            <div className='featuredHomes'>
                {listings && listings.houseListings.map((listing, i) => {
                    return <CardItem key={i} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')} address={listing.UnparsedAddress} price={listing.ListPrice} bed={listing.BedroomsTotal} bath={listing.BathroomsTotalInteger} sqft={listing.LotSizeSquareFeet} listingKey={listing.ListingKey} PropertyType={listing.PropertyType}/>
                })}
            </div>
            <h1>Land Listings</h1>
            <div className='featuredHomes'>
                {listings && listings.landListings.map((listing, i) => {
                    return <CardItem key={i} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')} address={listing.UnparsedAddress} price={listing.ListPrice} sqft={listing.LotSizeSquareFeet} listingKey={listing.ListingKey} PropertyType={listing.PropertyType}/>
                })}
            </div>
        </div>
    );
    }

export default Listings;
