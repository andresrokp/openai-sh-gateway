const https = require('https');
const fs = require('fs');
const app = require('./server'); // Server setup logic

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  console.log('production ssl server running');
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/shassistant.ddns.net/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/shassistant.ddns.net/fullchain.pem'),
  };
  console.log(options.key.slice(0,20), options.cert.slice(0,20));

  const httpsServer = https.createServer(options, app);

  httpsServer.listen(1443, () => {
    console.log('HTTPS Server running on port 1443');
  });
} else {
  app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
  });
}
