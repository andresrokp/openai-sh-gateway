// load my config
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// load core set up of the server from neighbor file
const app = require('./server');


// execute server object
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
