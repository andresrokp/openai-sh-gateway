
const express = require('express');
const app = express();

app.use(express.json());

// Apply custom middlewares
app.use(require('./middleware/domainValidator'));
app.use(require('./middleware/tokenValidator'));

// Apply routes
app.use('/api', require('./routes/api'));

module.exports = app;