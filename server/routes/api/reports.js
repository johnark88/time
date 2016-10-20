var bodyParser = require('body-parser');
var router = require('express').Router();
var path = require('path');
var pg = require ('pg');
var connectionString = 'postgres://localhost:5432/cimaron-winter';

router.use(bodyParser.urlencoded({extended:true}));

//report get route
router.get('/reports',function(req, res){

    console.log('/reports get route hit');
    var objectIn = {
      username:req.query.userid,
      projectId:Number(req.query.projectId),
      sDate:req.query.sDate,
      eDate:req.query.eDate
    };
    console.log('this is the info sent',objectIn);
    pg.connect(connectionString, function(err, client, done){
      if(err){
        console.log(err);
      }else {
        var resultsArray = [];
        var queryResults;
        if (objectIn.username === undefined) {
          // 'SELECT title FROM movies RIGHT JOIN favorites ON movie_id = id WHERE
          
          // conditional-> if no usierid and no date range=thing 1-- if no userid and date range=thing2--if userid and date range thing 3
          queryResults = client.query('SELECT * FROM time JOIN projects on projid = projectid WHERE projectid = $1;',[objectIn.projectId]);
        }else {
          queryResults = client.query('SELECT * FROM time JOIN projects on projid = projectid WHERE projectid = $1 AND empid = $4',[objectIn.projectId,objectIn.sDate, objectIn.eDate,objectIn.username]);
        }
        queryResults.on('row', function(row){
          resultsArray.push(row);
        });//on row function
        queryResults.on('end',function(){
          done();
          return res.send(resultsArray);
        });//on end function
      }//else
    });//pg.connect
});//get active users
module.exports = router;
