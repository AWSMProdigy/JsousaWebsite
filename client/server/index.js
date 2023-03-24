const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
var listingsFile = require('./listings.json');


app.get('/api', (req, res) => {
  res.send("Api is working!");
})

app.get('/api/listings', (req, res) => {
    try{
      res.json(listingsFile);
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

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// retrieve()
// .then(()=> {
    app.listen(port);
    console.log('App is listening on port ' + port);
// });
