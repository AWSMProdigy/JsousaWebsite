import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Marion from '../images/ActualMarion.webp';
import Brevard from '../images/Brevard.webp';
import Citrus from '../images/Citrus.webp';
import Clay from '../images/Clay.webp';
import Highlands from '../images/Highlands.webp';
import Madison from '../images/Madison.webp';
import Putnam from '../images/Putnam.webp';

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
                        <img src={Putnam} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Madison"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Madison">
                        <img src={Madison} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Citrus"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Citrus">
                        <img src={Citrus} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Highlands"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Highlands">
                        <img src={Highlands} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Clay"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Clay">
                        <img src={Clay} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
                <div className='county'>
                    <Link to={"/Brevard"} className="county">
                    <figure className="cards__item__pic-wrap" data-category="Brevard">
                        <img src={Brevard} alt="Home thumbnail" className="cards__item__img"/>
                    </figure>
                    </Link>
                </div>
            </div>
        </div>
    );
    }

export default County;
