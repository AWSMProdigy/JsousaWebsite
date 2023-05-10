import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


function SousaFooter() {
    return (
        <div className='sousaFooter'>
            <div>
                Made by <a href='mailto:Kyle@SousaSolutionsLLC.com'>SousaSolutionsLLC</a>
            </div>
            <div className='policyLinks'>
                <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
            <div style={{"visibility": "hidden"}}>
                Made by <a href='mailto:SousaSolutionsLLC'>SousaSolutionsLLC</a>
            </div>
        </div>
    )
}

export default SousaFooter;