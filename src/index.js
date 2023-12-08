const https = require('https');
const fs = require('fs');
const app = require('./server'); // Server setup logic

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/shassistant.ddns.net/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/shassistant.ddns.net/fullchain.pem'),
  };

  const httpsServer = https.createServer(options, app);

  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
} else {
  app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
  });
}