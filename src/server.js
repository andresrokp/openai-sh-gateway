"use strict";

// LOAD LIB
const morgan = require('morgan');
const express = require('express');
const app = express();


// CORE MIDDLEWARES
// To handle json in requests
app.use(express.json());
// To poner la verga console log
app.use(morgan('[:date] :remote-addr :method :url :status :res[content-length] - :response-time ms'));
// to use the public folder for page serving
app.use(express.static("./src/public"));

// Apply custom middlewares
// app.use(require('./middleware/domainValidator'));
// app.use(require('./middleware/tokenValidator'));

// Apply routes
app.use('/api', require('./routes/api'));

//  object to use as server model
module.exports = app;