let express = require('express');
let router = express.Router();
const request = require('request');

const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, Authentication, X-Requested-With");
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'application/json');
  next();
});

  let tokenOptions = {
    headers: {'content-type' : 'application/x-www-form-urlencoded',
            'authorization' : 'Basic ZmNjNTc2OGY0ZDA2NDFhZWE0MGUxMzNiOWVjMWQ1NTE6ZTBiNDY1NWEzNTY5NDI5YTg5Y2Q5OTI0ZWQzMTE5N2M='},
    url:    'https://accounts.spotify.com/api/token',
    method: "POST",
    form:   'grant_type=client_credentials'
  };

  let searchArtistOptions = {
    headers: {'content-type' : 'application/json',
            'authorization' : 'Bearer ', 'accept': 'application/json'},
    url:    'https://api.spotify.com/v1/search',
    method: "GET"
  };

  app.get('/api/token', function (req, res) {
    request(tokenOptions, function(err, response, body) {
      console.log(err);
      console.log(body);
      res.send(body);
    });
  });

  app.get('/api/search', function (req, res) {
    //search?q=tania%20bowra&type=artist
    let query = req.query.name;
    let authHeader = req.headers.authentication;

    let searchArtistRequest = {... searchArtistOptions};

    searchArtistRequest.url = searchArtistOptions.url + "?q=" + query + "&type=artist&limit=5";
    searchArtistRequest.headers.authorization = authHeader;

    request(searchArtistRequest, function(err, response, body) {
      res.send(body);
    });
  });

app.listen(3000)

module.exports = router;