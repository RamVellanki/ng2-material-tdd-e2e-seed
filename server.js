'use strict';

var express = require('express'),
  app = express(),
  root = '/dist/',
  config = require('./config/config.json');
  
console.log(config.deploy.host);
  
app.use("/", express.static(__dirname + '/dist'));
app.use("/node_modules", express.static(__dirname + '/node_modules/'));
app.use(express.static(root));

process.env.host = config.deploy.host;
process.env.port = config.deploy.port;

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

if (module === require.main) {
  var server = app.listen(process.env.PORT || 8383, function () {
    var host = process.env.host;
    var port = process.env.PORT;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;
