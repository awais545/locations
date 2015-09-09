// server.js

// modules ====================================================================
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongoose        = require('mongoose');

// configuration ==============================================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

mongoose.connect(db.url);

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));


// routes =====================================================================
require('./routes/index')(app); // configure our routes
// start app ==================================================================
app.listen(port);
console.log('Server is running on port: ' + port);
exports = module.exports = app;
