import React, { useState, useEffect} from 'react';
import CardItem from "./CardItem";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function SearchForm(props){

    const[searchType, setSearch] = useState(props.query.searchType ? props.query.searchType : "Residential")
    const[minPrice, setMin] = useState(props.query.minPrice ? props.query.minPrice : "Any");
    const[maxPrice, setMax] = useState(props.query.maxPrice ? props.query.maxPrice : "Any");
    const[bed, setBed] = useState(props.query.bed ? props.query.bed : "Any");
    const[bath, setBath] = useState(props.query.bath ? props.query.bath : "Any");
    const[county, setCounty] = useState(props.query.county ? props.query.county : "Any");
    const[size, setSize] = useState(props.query.size ? props.query.size : "Any");

    function searchSubmit(e){
        e.preventDefault();        
    }

    function onChange(e, minMax){
        e.preventDefault();
        if(!Number.isInteger(e.target.value)){
            alert("Please enter a number");
            e.target.value = 0;
        }
        else if(minMax){
            setMin(e.target.value)
        }
        else{
            setMax(e.target.value)
        }
    }

    function changeMax(amount){
        console.log(maxPrice)
        let numMax;
        if(maxPrice === "Any"){
            numMax = 0
            if(amount > 0 && minPrice !== "Any"){
                setMax(Number(minPrice) + amount)
                return;
            }
        }else{
            numMax = Number(maxPrice)
        }
        if(minPrice !== "Any"){
            if(numMax + amount === Number(minPrice)){
                setMin(Math.max(0, numMax + (amount * 2)));
            }
            else if(numMax + amount < Number(minPrice) && numMax + amount >= 0){
                setMin(Math.max(0, numMax + amount));
            }
        }
        if(numMax + amount === 0 || numMax + amount < 0){
            setMax("Any")
        }
        else{
            setMax(Math.max(0, numMax + amount));
        }
    }

    function changeMin(amount){
        let numMin;
        if(minPrice === "Any"){
            numMin = 0;
        }else{
            numMin = Number(minPrice)
        }
        if(maxPrice !== "Any"){
            if(numMin + amount === Number(maxPrice)){
                setMax(Math.max(0, numMin + (amount * 2)));
            }
            else if(numMin + amount > Number(maxPrice)){
                setMax(Math.max(0, numMin + amount));
            }
        }
        if(numMin + amount === 0 || numMin + amount < 0){
            setMin("Any")
        }
        else{
            setMin(String(Math.max(0, numMin + amount))) 
        }
    }

    function changeAcres(amount){
        let numAcre;
        if(size === "Any"){
            numAcre = 0;
        }
        else{
            numAcre = Number(size)
        }
        if(numAcre + amount === 0 || numAcre + amount < 0){
            setSize("Any")
        }else{
            setSize(String(Math.max(0, numAcre + amount)))
        }
    }

    return (
        <form className='listingSearch' onSubmit={searchSubmit}>
            <div className='searchButtons'>
                <button onClick={() => setSearch("Residential")} className={"residential " + (searchType === "Residential" ? "chosen" : "unChosen")}>
                    Residential
                </button>
                <button onClick={() => setSearch("Land")} className={"land " + (searchType === "Land" ? "chosen" : "unChosen")}>
                    Land
                </button>
            </div>
            <div className='listingSearchQueries'>
                <div>
                    <label>
                        Min Price
                        <input value={minPrice !== 0 && minPrice ? minPrice : "Any"} defaultValue={props.query.minPrice !== 0 ? props.query.minPrice : "Any"} type="text" name="price" onChange={(e) => onChange(e.target.value, true)}/>
                        <div className='addSubtract'>
                            <button onClick={() => changeMin(10000)}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                            <button onClick={() => changeMin(-10000)}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </button>
                        </div>
                    </label>
                    <label>
                        Max Price
                        <input value={maxPrice !== 0 && maxPrice ? maxPrice : "Any"} type="text" name="price" defaultValue={props.query.maxPrice !== 0 ? props.query.maxPrice : "Any"} onChange={(e) => onChange(e.target.value, false)}/>
                        <div className='addSubtract'>
                            <button onClick={() => changeMax(10000)}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                            <button onClick={() => changeMax(-10000)}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </button>
                        </div>
                    </label>
                </div>
                {
                    searchType === "Residential" && 
                    <>
                    <div>
                    <label>
                        Beds
                        <select onChange={(e) => setBed(e.target.value)} defaultValue={props.query.bed}>
                            <option value="Any">Any</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                    </div>
                    <div> 
                        <label>
                            Baths
                            <select onChange={(e) => setBath(e.target.value)} defaultValue={props.query.bath}>
                                <option value="Any">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>
                    </div>
                    </>
                }  
                {
                    searchType === "Land" && 
                    <>
                    <div>
                        <label>
                            Min Acres
                            <input value={size && size !== 0 ? size : "Any"} type="text" name="price" defaultValue={props.query.size !== 0 ? props.query.size : "Any"} onChange={(e) => setSize(e.target.value)}/>
                            <div className='addSubtract'>
                            <button onClick={() => changeAcres(0.25)}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                            <button onClick={() => changeAcres(-0.25)}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </button>
                        </div>
                        </label>
                    </div>
                    </>
                }  
                <div>
                    <label>
                        County
                        <select onChange={(e) => setCounty(e.target.value)} defaultValue={props.query.county}>
                            <option value="Any">Any</option>
                            <option value="Marion">Marion</option>
                            <option value="Putnam">Putnam</option>
                            <option value="Madison">Madison</option>
                            <option value="Citrus">Citrus</option>
                            <option value="Highlands">Highlands</option>
                            <option value="Clay">Clay</option>
                            <option value="Brevard">Brevard</option>
                        </select>
                    </label>
                    </div>
            </div>
            <div className='searchButton'>
                <Link onClick={props.rerender}to={searchType === "Residential" ? "/search/Residential?minPrice=" + minPrice + "&maxPrice=" + maxPrice + "&bed=" + bed + "&bath=" + bath + "&county=" + county :
                "/search/Land?minPrice=" + minPrice + "&maxPrice=" + maxPrice + "&lotSize=" + size + "&county=" + county}>
                    <button>
                        Search
                    </button>
                </Link>
            </div>
        </form> 
    );

}

export default SearchForm;