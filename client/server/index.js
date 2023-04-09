const express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const app = express();
const fs = require('fs');
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
var listingsFile = require('./listings.json');
var houseFile = require('./houseListings.json');
var landFile = require('./landListings.json');
var nodemailer = require('nodemailer')
const retrieve = require('./retrieve')

let houseData = houseFile;
let landData = landFile;


const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",  
  secure: true,
  secureConnection: false, // TLS requires secureConnection to be false
  tls: {
      ciphers:'SSLv3'
  },
  requireTLS:true,
  port: 465,
  debug: true,
     auth: {
          user: 'EmailManager@ocalalandandrealty.com',
          pass: process.env.EMAILPASS,
       },
  });


app.get('/api', (req, res) => {
  res.send("Api is working!");
})

app.get('/api/featured', (req, res) => {
  try{
    let tempData = [];
    tempData = tempData.concat(houseData.slice(0, (Math.min(houseData.length, 10))));
    tempData = tempData.concat(landData.slice(0, (Math.min(landData.length, 10))));
    res.send(tempData);
  }
  catch(err){
    res.send(err);
  }
})

app.get('/api/listings', (req, res) => {
    try{
      res.json(listingsFile);
    }
    catch(err){
      res.send(err)
    }
})

app.get('/api/county/:county', (req, res) =>{
  try{
    let tempData = [];
    tempData = tempData.concat(houseData.filter(listing => listing.CountyOrParish === req.params.county));
    tempData = tempData.concat(landData.filter(listing => listing.CountyOrParish === req.params.county));
    res.send(tempData);
  }
  catch(err){
    res.send(err)
  }
})

app.get('/api/listings/:listingID', (req, res) => {
  try{
    let requestedListing = listingsFile.find(listing => listing.ListingKey === req.params.listingID);
    res.send(requestedListing);
  }
  catch(err){
    res.send(err);
  }
})

app.get('/api/search/Residential/:bath/:bed/:minPrice/:maxPrice/:county', (req, res) => {
  try{
    let bath = req.params.bath;
    let bed = req.params.bed;
    let minPrice = req.params.minPrice;
    let maxPrice = req.params.maxPrice;
    let county = req.params.county;
    if(minPrice === "Any"){
      minPrice = 0;
    }
    else{
      minPrice = Number(minPrice);
    }
    if(maxPrice === "Any"){
      maxPrice = 9999999;
    }
    else{
      maxPrice = Number(maxPrice);
    }
    if(bath === "Any"){
      bath = 0;
    }
    else{
      bath = Number(bath);
    }
    if(bed === "Any"){
      bed = 0;
    }
    else{
      bed = Number(bed)
    }
    if(!Number.isInteger(minPrice) || !Number.isInteger(maxPrice) ||!Number.isInteger(bath) ||!Number.isInteger(bed)){
      return res.status(400).send("Please provide 'Any' or integer value")
    }
    let tempData = [];
    if(county !== "Any"){
      tempData = tempData.concat(houseData.filter(listing => listing.CountyOrParish === county))
      tempData = tempData.concat(tempData.filter(listing => listing.MFR_CurrentPrice >= minPrice && listing.MFR_CurrentPrice <= maxPrice && listing.BathroomsTotalInteger >= bath && listing.BedroomsTotal >= bed));
    }
    else{
      tempData = tempData.concat(houseData.filter(listing => listing.MFR_CurrentPrice >= minPrice && listing.MFR_CurrentPrice <= maxPrice && listing.BathroomsTotalInteger >= bath && listing.BedroomsTotal >= bed));
    }
    
    res.send(tempData);
  }
  catch(err){
    res.send(err)
  }
})

app.get('/api/search/Land/:lotSize/:minPrice/:maxPrice/:county', (req, res) => {
  try{
    let {minPrice, maxPrice, lotSize, county} = req.params;
    if(minPrice === "Any"){
      minPrice = 0;
    }
    else{
      minPrice = Number(minPrice);
    }
    if(maxPrice === "Any"){
      maxPrice = 9999999;
    }
    else{
      maxPrice = Number(maxPrice);
    }
    if(lotSize === "Any"){
      lotSize = 0;
    }
    else{
      lotSize = Number(lotSize);
    }
    let tempData = [];
    if(county !== "Any"){
      tempData = tempData.concat(landData.filter(listing => listing.CountyOrParish === county))
      tempData = tempData.concat(tempData.filter(listing => listing.MFR_CurrentPrice >= minPrice && listing.MFR_CurrentPrice <= maxPrice && listing.LotSizeAcres >= lotSize));
    }
    else{
      tempData = tempData.concat(landData.filter(listing => listing.MFR_CurrentPrice >= minPrice && listing.MFR_CurrentPrice <= maxPrice && listing.LotSizeAcres >= lotSize));
    }
    res.send(tempData);
  }
  catch(err){
    res.send(err)
  }
})

app.post('/api/email', (req, res) => {
  console.log(req.body);
  const {name, phone, email, comment} = req.body;
  const mail = {
    from: "EmailManager@ocalalandandrealty.com",
    to: "Jorgesousarealtor@gmail.com",
    subject: "Listing Inquiry from " + name,
    text: "Name: " + name + "\nPhone: " + phone + "\nEmail: " + email + "\n" + comment
  }

  transporter.sendMail(mail, (error, info) => {
    if(error) {
      return console.log(error);
    }
    res.status(200).send({message: "Mail sent", message_id: info.messageId})
  })
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// retrieve()
// .then(()=> {
    app.listen(port);
    console.log('App is listening on port ' + port);
// });
