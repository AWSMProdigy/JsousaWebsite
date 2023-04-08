import React, { useState, useEffect} from 'react';
import CardItem from "./CardItem";



function Featured(){

    const [listings, setListings] = useState()

    useEffect(() => {
        if(!listings){
            try{
                fetch("/api/featured")
                .then((result) => result.json()).then((data) =>{
                    console.log(data);
                    for(let i = 0; i < data.length; i++){
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

    return (
        <div className='featured'>
            <h1>Featured Homes</h1>
            <div className='featuredHomes'>
                {listings && listings.houseListings.slice(0, 4).map((listing, i) => {
                    return <CardItem key={i} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')} address={listing.UnparsedAddress} price={listing.ListPrice} bed={listing.BedroomsTotal} bath={listing.BathroomsTotalInteger} sqft={listing.LotSizeSquareFeet} listingKey={listing.ListingKey} PropertyType={listing.PropertyType} county={listing.CountyOrParish}/>
                })}
            </div>
            <h1>Featured Land</h1>
            <div className='featuredHomes'>
                {listings && listings.landListings.slice(0, 4).map((listing, i) => {
                    return <CardItem key={i} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')} address={listing.UnparsedAddress} price={listing.ListPrice} path='/services' sqft={listing.LotSizeSquareFeet} listingKey={listing.ListingKey} PropertyType={listing.PropertyType} county={listing.CountyOrParish}/>
                })}
            </div>
        </div>
    );

}

export default Featured;
