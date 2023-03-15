import React from 'react';
import axios from 'axios';
import CardItem from '../CardItem';
let listings;
try{
    listings = require('../../listings.json');
}
catch(err){
    console.log(err)
}
export default class Listings extends React.Component{
   
    state = {
        listings:[],
    }
    
    render(){
        console.log(listings[0].ListingKey);

    return (
            <div className='featured'>
                <div className='header_search'>
                    <textarea style={{visibility: "hidden"}}>Search</textarea>
                    <h1>Featured Homes</h1>
                    <textarea>Search</textarea>
                </div>
                <div className='featuredHomes'>
                    {listings.map((listing, i) => {
                        return <CardItem key={i} src={require("../../images/img-2.jpg")} address={listing.ListingKey} label='poppin off' path='/services'/>
                    })}
                </div>
                <h1>Featured Land</h1>
                <div className='featuredHomes'>
                    <CardItem src={require("../../images/img-2.jpg")} text="Pop off my wayward son" label='poppin off' path='/services'/>  
                    <CardItem src={require("../../images/img-2.jpg")} text="Pop off my wayward son" label='poppin off' path='/services'/>  
                    <CardItem src={require("../../images/img-2.jpg")} text="Pop off my wayward son" label='poppin off' path='/services'/>  
                    <CardItem src={require("../../images/img-2.jpg")} text="Pop off my wayward son" label='poppin off' path='/services'/>  
                </div>
        </div>
    )
    }
}