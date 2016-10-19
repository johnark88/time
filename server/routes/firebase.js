var router = require('express').Router();
var path = require('path');
var firebase = require('firebase');

router.get("/secretData", function(req, res){

  /* This is where the magic happens. We pull the idtoken off of the request,
  verify it against our private_key, and then we return the decodedToken */
  firebase.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
    /* Whatever you do in here is protected by your authorization.
    WARNING: So far you are returning secret data to ANYONE who is logged in
    there is still more work to be done if you want to implement roles
    You can use the decodedToken and some logic to do that. */

    var objectToReturn ={
      batman: 'Robin',
      cody: 'john',
      lisa: 'matt'
    };

    console.log(decodedToken); // Here you can see the information firebase gives you about the user
    res.send((JSON.stringify(objectToReturn)));
    // res.send("Welcome to Cimarron Winter Time"+ ' ' + decodedToken.name +'.' + ' ' +'Your email has been verified ' + ' ' + decodedToken.email_verified);
  })
  .catch(function(error) {
    console.log(error);
    // If the id_token isn't right, you end up in this callback function
    res.send("No secret data for you!");
  });

});

module.exports = router;
