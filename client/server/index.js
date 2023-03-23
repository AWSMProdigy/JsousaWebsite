const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
//Set the port that you want the server to run on
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });

// retrieve()
// .then(()=> {
    app.listen(port);
    console.log('App is listening on port ' + port);
// });
