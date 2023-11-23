"use strict";

// load libraries
const path = require('path');
const express = require('express');
const app = express();



// indicate json parsing
app.use(express.json());

// to use the public folder for page serving
const publicPath = path.resolve(__dirname, 'public');
console.log(publicPath);
app.use(express.static("./src/public"));

// Apply custom middlewares
// app.use(require('./middleware/domainValidator'));
// app.use(require('./middleware/tokenValidator'));

// Apply routes
app.use('/api', require('./routes/api'));

//  object to use as server model
module.exports = app;