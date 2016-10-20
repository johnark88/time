var router = require('express').Router();
var path = require('path');
var pg = require ('pg');
var connectionString = 'postgres://localhost:5432/cimaron-winter';

router.route('/time')
//selecting all from time table
.get(function(req, res) {
  console.log('time get route hit');
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }else {
      var resultsArray = [];
      var queryResults = client.query('SELECT * FROM time');
      queryResults.on('row', function(row){
        resultsArray.push(row);
      });//on row function
      queryResults.on('end',function(){
        done();
        return res.send(resultsArray);
      });//on end function
    }//else
  });//pg.connect
})//router.get

//add a time instance
.post(function(req, res){
  console.log('time post route hit');
  var data = req.body;
  console.log('data which is also req.body',data);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }else {
    var query = client.query('INSERT INTO time (date, hours, description, empid, projectid) VALUES ($1,$2,$3,$4,$5)',[data.date, data.hours, data.description, data.empid, data.projectid]);
    res.sendStatus(201);
    }//else bracket
  });//pg.connect
})//post route

//update time table
.put(function(req,res){
  console.log('/time put route');
  var data = req.body;
  console.log("data logged here",data);
  pg.connect(connectionString, function (err, client, done){
    if (err){
      console.log(err);
    }else {
      var column = '';
      var updatedInfo = '';
      //build sql statement based on data in
        if (data.date!==undefined){
          column = 'date';
          updatedInfo = data.date;
        }else if (data.hours!==undefined) {
          column = 'hours';
          updatedInfo = data.hours;
        }else if (data.description!==undefined) {
          column = 'description';
          updatedInfo = data.description;
        }else if (data.empid!==undefined) {
          column = 'empid';
          updatedInfo = data.empid;
        }
    client.query( 'UPDATE time SET ' + column + ' = $1 WHERE projectid = $2',[ updatedInfo, data.projectid ] );
    res.sendStatus(202);
    }//else
  });//pg.connect
});//.put route
module.exports = router;
