const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
let nextUrl = null;
let sousaArray = [];
let tempArray;

let headers = {
    headers: {
        'Accept-Encoding': 'gzip, deflate',
        'Authorization': process.env.AUTHORIZATION
    }
    
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

async function gatherListings(){
    await axios.get(`https://api.mlsgrid.com/v2/Property?$expand=Media&$filter=OriginatingSystemName%20eq%20'mfrmls' and ListOfficeMlsId eq 'MFR271500543'`, headers)
    .then(res => {
        if(res.data["@odata.nextLink"]){
            nextUrl = res.data["@odata.nextLink"]
        }
        tempArray = JSON.stringify(res.data.value.filter(function(listing){
            return listing.ListAgentFullName == "Jorge DeSousa" && listing.MlsStatus == "Active";
        }), null, 4)
        if(tempArray != "[]"){
            sousaArray += tempArray;
        }
    })
    .catch(err => console.log(err))

    while(nextUrl){
        //Just to be safe and not go past the 2 requests per second on MLS Grid
        await wait(1000);
        await axios.get(nextUrl, headers)
        .then(res => {
            if(res.data["@odata.nextLink"]){
                nextUrl = res.data["@odata.nextLink"]
            }
            else{
                nextUrl = null;
            }
            
            tempArray = JSON.stringify(res.data.value.filter(function(listing){
                return listing.ListAgentFullName == "Jorge DeSousa" && listing.MlsStatus == "Active";
            }), null, 4)
            if(tempArray != "[]"){
                sousaArray += tempArray;
            }
        })
        .catch(err => console.log(err))
    }
    fs.writeFile("./listings.json", sousaArray, 'utf8', function(err){
        if(err){
            return console.log(err)
        }
        console.log("Listings written to json file")
    })
}

gatherListings();
