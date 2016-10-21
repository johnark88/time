var router = require('express').Router();
var path = require('path');
var firebase = require('firebase');
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/cimarron';


router.get("/dbcheck", function(req, res){
  firebase.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {

    console.log(decodedToken);
    
    //get users permission level
    //where email in database  === decodedToken.email
    //if isAdmin = true then -----
    //if isAdmin == false then ------

    res.send("Welcome to Cimarron Winter Time Tracker " + decodedToken.name);
    }).catch(function(error) {
      console.log(error);
      // If the id_token isn't right, you end up in this callback function
      res.send("Sorry your Auth-Token was incorrect");
    });
  });

module.exports = router;
