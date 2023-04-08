import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Marion from '../images/Aquestrian center.webp';

function County() {
    
    return (
        <div>
            <h1 className='blueBG' style={{'color': "#ebebeb"}}>Properties By County</h1>
            <div className='counties'>
                <div className='county'>
                    <Link to={"/Marion"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Marion">
                        <img src={Marion} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Putnam"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Putnam">
                        <img src={Marion} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Madison"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Madison">
                        <img src={Marion} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Citrus"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Citrus">
                        <img src={Marion} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Highlands"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Highlands">
                        <img src={Marion} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Clay"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Clay">
                        <img src={Marion} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Brevard"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Brevard">
                        <img src={Marion} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
            </div>
        </div>
    );
    }

export default County;
