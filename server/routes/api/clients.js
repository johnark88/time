var router = require('express').Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/cimarron-winter';
var firebase = require('firebase');
var checkDataType = require('../modules/dataType');


router.route('/clients')
    .get(function(req, res) {
        firebase.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
            console.log('clients get route hit');
            pg.connect(connectionString, function(err, client, done) {
                // var data = client.query;
                if (err) {
                    console.log(err);
                } else {
                    var resultsArray = [];
                    var queryResults;
                    queryResults = client.query('SELECT * FROM clients');
                    queryResults.on('row', function(row) {
                        resultsArray.push(row);

                    }); //on row function
                    queryResults.on('end', function() {
                        done();
                        return res.send(resultsArray);
                    }); //on end function
                } //else
            }); //pg.connect
        }).catch(function(error) {
            console.log(error);
            // If the id_token isn't right, you end up in this callback function
            res.send("Sorry your Auth-Token was incorrect");
        }); //end catch
    }) //router.get

//add an employee
.post(function(req, res) {
        firebase.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
            console.log('projects post route hit');
            var data = req.body;
            console.log('data which is also req.body', data);
            pg.connect(connectionString, function(err, client, done) {
                if (err) {
                    console.log(err);
                } else {
                  if(checkDataType('string',[data.clientname])){

                    var resultsArray = [];
                    var query = client.query('INSERT INTO clients (clientname) VALUES ($1) RETURNING clientid', [data.clientname]);
                    query.on('row', function (row) {
                      resultsArray.push(row);
                      console.log('resultsArray in post experimental call',resultsArray);
                    });//query on row funciton
                    query.on('end', function () {
                      done();
                      res.send({
                          success: true,
                          results: resultsArray
                      });//res.send
                    });//query on end function
                  }else{
                    res.send({
                        success: false,
                    });//res.send
                  }//nested else bracket
                } //else bracket
            }); //pg.connect
        }).catch(function(error) {
            console.log(error);
            // If the id_token isn't right, you end up in this callback function
            res.send("Sorry your Auth-Token was incorrect");
        }); //end catch
    }) //post route

//edits projects table expects an object like this {clientid: whatever  clientname: whatever updated clientname you want}
.put(function(req, res) {
    firebase.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
        console.log('put route');
        var data = req.body;
        pg.connect(connectionString, function(err, client, done) {
            if (err) {
                console.log(err);
            } else {
              if(checkDataType('number',[data.clientid])&& checkDataType('string',[data.clientname])){
                client.query('UPDATE clients SET clientname = $1 WHERE clientid = $2', [data.clientname, data.clientid]);
                done();
                res.send({
                    success: true
                });//res.send
              }else{
                res.send({
                    success: false
                });//res.send
              }//nested else
            } //else
        }); //pg.connect
    }).catch(function(error) {
        console.log(error);
        // If the id_token isn't right, you end up in this callback function
        res.send("Sorry your Auth-Token was incorrect");
    }); //end catch
}); //.put route
module.exports = router;
