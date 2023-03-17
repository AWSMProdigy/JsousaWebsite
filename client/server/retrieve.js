const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
let nextUrl = null;
let landArray = [];

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
        landArray = landArray.concat(res.data.value.filter(function(listing){
            return listing.ListAgentFullName === "Jorge DeSousa" && listing.MlsStatus === "Active";
        }))
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
            
            landArray = landArray.concat(res.data.value.filter(function(listing){
                return listing.ListAgentFullName === "Jorge DeSousa" && listing.MlsStatus === "Active";
            }))
        })
        .catch(err => console.log(err))
    }
    let houseArray = [];
    for(let i = 0; i < landArray.length; i++){
        if(landArray[i].PropertyType === "Residential"){
            houseArray.push(landArray[i]);
            landArray.splice(i, 1);
        }
    }

    fs.writeFile("../src/landListings.json", JSON.stringify(landArray, null, 4), 'utf8', function(err){
        if(err){
            return console.log(err)
        }
        console.log("Land listings written to json file")
    });

    fs.writeFile("../src/houseListings.json", JSON.stringify(houseArray, null, 4), 'utf8', function(err){
        if(err){
            return console.log(err)
        }
        console.log("Listings written to json file")
    })
}

gatherListings();

module.exports = gatherListings;
