import React from 'react';
import CardItem from "./CardItem";
let landListings;
let houseListings;
try{
    landListings = require('../landListings.json');
    houseListings = require('../houseListings.json');
}
catch(err){
    console.log(err)
}


function Featured(){
    return (
        <div className='featured'>
            <h1>Featured Homes</h1>
            <div className='featuredHomes'>
                {houseListings.slice(0, 4).map((listing, i) => {
                    return <CardItem key={i} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')} address={listing.UnparsedAddress} price={listing.ListPrice} bed={listing.BedroomsTotal} bath={listing.BathroomsTotalInteger} sqft={listing.LotSizeSquareFeet} listingKey={listing.ListingKey} PropertyType={listing.PropertyType}/>
                })}
            </div>
            <h1>Featured Land</h1>
            <div className='featuredHomes'>
                {landListings.slice(0, 4).map((listing, i) => {
                    return <CardItem key={i} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')} address={listing.UnparsedAddress} price={listing.ListPrice} path='/services' sqft={listing.LotSizeSquareFeet} listingKey={listing.ListingKey} PropertyType={listing.PropertyType}/>
                })}
            </div>
        </div>
    );

}

export default Featured;
