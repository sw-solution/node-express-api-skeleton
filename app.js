// load required packages
const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const jwt        = require('jsonwebtoken');

// load models
const User = require('./models/user');
const Item = require('./models/item');

// load configuration
const config = require('./config/config');

// define the application
const app = express();

// configure application to use bodyParser which allows to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure application to use morgan for requests logging
app.use(morgan('dev'));

// configure secret variable
//app.set('secret', 'supersecret');

// connect to mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/wordlistdb', { useMongoClient: true });

// register routes
var routes = require('./routes');
app.use('/', routes);

// add handling for 404 - not found
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// set up the port
var port = process.env.PORT || config.server.port;
// start the server
app.listen(port);

console.log('Node + Express REST API skeleton server started on port: ' + port);