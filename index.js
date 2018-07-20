var express = require('express');
var router = express.Router();
const request = require('./node_modules/request/index');

const app = express();

let options = {
    headers: {'content-type' : 'application/x-www-form-urlencoded',
            ' authorization' : ''},
    url:    'https://accounts.spotify.com/api/token',
    method: "POST",
    json: false,
    form:   'grant_type=client_credentials'
  };

request(options, function(err, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });

app.listen(3000)

module.exports = router;