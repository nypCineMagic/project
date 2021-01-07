var express = require('express');
var app = express();
var port = 3000;

//defines route in route.js
var routes = require('./routes.js');
app.use('/', routes);

app.listen(port, function() {
    console.log('Server started in port ' + port);
});