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
                {houseListings.map((listing, i) => {
                    return <CardItem key={i} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')} address={listing.ListingKey} label='poppin off' path='/services'/>
                })}
            </div>
            <h1>Featured Land</h1>
            <div className='featuredHomes'>
                <CardItem src={require("../images/img-2.jpg")} text="Pop off my wayward son" label='poppin off' path='/services'/>  
                <CardItem src={require("../images/img-2.jpg")} text="Pop off my wayward son" label='poppin off' path='/services'/>  
                <CardItem src={require("../images/img-2.jpg")} text="Pop off my wayward son" label='poppin off' path='/services'/>  
                <CardItem src={require("../images/img-2.jpg")} text="Pop off my wayward son" label='poppin off' path='/services'/>  
            </div>
        </div>
    );

}

export default Featured;
