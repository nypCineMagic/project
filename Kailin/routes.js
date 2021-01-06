var bodyParser = require('body-parser');
var moviesController = require('./controllers/moviesController.js');
var userController = require('./controllers/userController.js');
var db = require('./services/dataservice.js');

db.connect();

var routes = function () {
    // need to define routes for anything(video, images) that will be used in the html, its like the css
    var router = require('express').Router();
    
    // Must have, if not the data from body will be empty json.
    router.use(bodyParser.urlencoded({
        extended: true
    }));

    // this is for all the css
    // otherwise have to route for every css
    // * is any file that are css.
    // req.originalURL is the generic code for the the route URL of the css
    router.get('/css/*', function (req, res) {
        res.sendFile(__dirname + "/views/" + req.originalUrl);
    });

    router.get('/js/*', function (req, res) {
        res.sendFile(__dirname + "/views/" + req.originalUrl);
    });

    router.get('/', function(req, res){
        res.sendFile(__dirname+"/views/index.html");
    });

    router.get('/update',function(req, res){
        res.sendFile(__dirname + "/views/updateProfile.html");
    });

    router.put('/profile', function(req, res){
        var data = req.body;
        db.updateProfile(data.id, data.firstName, data.lastName,
            data.birthDate, data.email, data.mobile, data.password,
            function(err, profile){
                res.end();
            });
    })

    return router;
};

module.exports = routes();