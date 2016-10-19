require('dotenv').config(); // Imports all .env values
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var connectionString = 'postgres://localhost:5432/cimaron-winter';
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
app.use(bodyParser.json());
app.listen(process.env.PORT, function() {
    console.log('lisening on', port);
});

//index route
var index = require('./routes/index');
//employees route
var users = require('./routes/api/users');
app.use('/api', users);

app.use('/inc', express.static( path.resolve('./node_modules/angular') ) );

//use public folder
app.use(express.static(path.resolve('public')));
