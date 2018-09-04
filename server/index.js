const cors_proxy = require('cors-anywhere');

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8080;

cors_proxy
  .createServer({
    originWhitelist: ['https://ygo.now.sh', 'http://localhost:3000']
  })
  .listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  });
