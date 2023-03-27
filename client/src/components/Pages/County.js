import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import corvette from '../../images/Corvette.jpg';

function County() {
    
    return (
        <div>
            <h1>Counties</h1>
            <div>
                <div>
                    <Link to={"/Listings/Marion"}>
                        <img alt='Marion' src={corvette}></img>
                        <h1>Marion</h1>
                    </Link>
                </div>
            </div>
        </div>
    );
    }

export default County;
