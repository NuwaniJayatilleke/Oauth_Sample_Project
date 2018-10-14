const axios = require('axios');
const bodyParser = require("body-parser");
const app = require("express")();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, X-Auth-Token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  next();
});

var accessTokenUrl = 'https://github.com/login/oauth/access_token';
var dataUrl = 'https://api.github.com/user?access_token=';
var client_id = "c8dfb8d3abfab2d11e1d";
var client_secret = "1e3c7fbb2212e8d78cd952228474c33972fdca97";
var callback = "http://localhost:4200/home";
var state = "123456"

// get access token
app.post('/token', (req, res) => {

  let parameter = {
    "client_id": client_id,
    "client_secret": client_secret,
    "code": req.body.code,
    "redirect_uri": callback,
    "state": state
  };

  console.log(req.body.code);

  axios.post(accessTokenUrl, parameter)
    .then(function (response) {
      console.log(response.data)
      res.send({"data":getToken(response)})
    })
    .catch(function (error) {
      console.log(error);
    });
})

// get data from access tokens
app.post('/data', (req, res) => {
  axios.get(dataUrl + req.body.accessToken)
    .then(function (userdata) {
      res.send(userdata.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// customize the token
function getToken (response) {
  return response.data.split('&')[0].split('=')[1]
}

app.listen(5005, () => {
  console.log("Server runs on port : " + 5005);
});
