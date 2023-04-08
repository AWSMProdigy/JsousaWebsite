import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import CardItem from '../CardItem';
import Featured from '../Featured';
import SearchForm from '../searchForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Search() {

    const [listings, setListings] = useState();
    const [activePage, setPage] = useState(0);
    const propertyParams = useParams();
    const[query, setQuery] = useState();
    const[newSearch, resetSearch] = useState(true);


    useEffect(() => {
        console.log("useEffect")
        
            try{
                let search = window.location.search;
                let params = new URLSearchParams(search);
                let thisQuery;
                setPage(0);
                if(propertyParams.propertyType === "Residential"){
                    thisQuery = {
                        searchType: "Residential",
                        bath: params.get('bath'),
                        bed: params.get('bed'),
                        minPrice: params.get('minPrice'),
                        maxPrice: params.get('maxPrice'),
                        county: params.get('county') 
                    }
                    setQuery(thisQuery);
                }
                else{
                    thisQuery = {
                        searchType: "Land",
                        lotSize: params.get('lotSize'),
                        county: params.get('county'),
                        minPrice: params.get('minPrice'),
                        maxPrice: params.get('maxPrice')  
                    }
                    setQuery(thisQuery);
                }
                console.log(thisQuery);
                fetch(thisQuery.searchType === "Residential" ? "/api/search/Residential/" + thisQuery.bath + "/" + thisQuery.bed + "/" + thisQuery.minPrice + "/" + thisQuery.maxPrice + "/" + thisQuery.county : "/api/search/Land/" + thisQuery.lotSize + "/" + thisQuery.minPrice + "/" + thisQuery.maxPrice + "/" + thisQuery.county)
                .then((result) => {
                    if(result.ok){
                        return result.json()
                    }
                    return result.text().then(text => {throw new Error(text)})
                })
                .then((data) =>{
                    setListings(data);
                })
                .catch((err) => {
                    alert(err)
                })
            }
            catch(err){
                console.log("We got an error");
                console.log(err)
                setListings([]);
            }
        
    }, [newSearch])

    function searchSubmit(e){
        e.preventDefault();        
    }

    const rerender = ()=>{
        if(window.location.href.includes("search")){
            resetSearch(!newSearch);
        }
    }

    function movePage(amount){
        setPage(activePage + amount);
    }

    return(
    <div className='featured'>
        <h1>Search</h1>
        <div className="blueBG" style={{"padding": "10px", "margin-bottom": "10px"}}>
            {query && <SearchForm query={query} rerender={rerender}/>}
        </div>
        {listings && listings.length !== 0 &&
        <>
        {/* <h1>{params.propertyType} listings</h1> */}
        <div className='featuredHomes'>
            {(listings.slice(0 + (24 * activePage),Math.min(listings.length, 24 + (24 * activePage)))).map((listing, i) => {
                return <CardItem key={i} src={"https://d190pq94iryepm.cloudfront.net" + listing.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid", '')} address={listing.UnparsedAddress} price={listing.ListPrice} bed={listing.BedroomsTotal} bath={listing.BathroomsTotalInteger} sqft={listing.LotSizeSquareFeet} listingKey={listing.ListingKey} PropertyType={listing.PropertyType} county={listing.CountyOrParish}/>
            })}
        </div>
        {listings && listings.length > 24 &&
        <div className='pageButtonContainer'>
            <button onClick={() => movePage(-1)} className={activePage === 0 ? 'disabled' : 'pageButton'}>
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
            </button>
            <button onClick={() => movePage(1)} className={listings.length / 24 < activePage + 1 ? 'disabled' : 'pageButton'}>
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </button>
        </div>
        }
        </>
        }
        {listings && listings.length === 0 &&
        <>
        <h1>We have no listings that meet your query. Take a look at these instead!</h1>
        <Featured/>
        </>
        }
    </div>
    )
}

export default Search;
