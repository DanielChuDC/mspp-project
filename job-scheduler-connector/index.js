const express = require('express');
const app = express();
const debug = require('debug')('myapp:server');
const port = process.env.PORT || 3004;
const bodyParser = require('body-parser');
// import bull
var bullinit = require('./bull');
// Using dotnet config
require('dotenv').config();
// Import UUID
const uuidv4 = require('uuid/v4');

// Construct body parser with express
// The two lines tells express to accept both JSON and url encoded values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log('Server is up and running on port ', port);
});

app.get('/', function(req, res) {
  return res.send('hello from my app express server!');
});

// api call for bull js

app.get('/bull', function(req, res) {
  console.log(process.env.redis_port + process.env.redis_host);
  console.log(process.env.mqttconnector_host + process.env.mqttconnector_method);
  bullinit(process.env.mqttconnector_host, process.env.mqttconnector_method);
  //console.log(bullinit());
  return res.send('bull is working');
});
