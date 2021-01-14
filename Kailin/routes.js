var bodyParser = require('body-parser');
var crypto = require('crypto');
var db = require('./services/dataservice.js');
var movieController = require('./controllers/movieController.js');
const {updateUser} = require('./services/dataservice.js');

db.connect();
//router defining db connection
var routes = function () {
    var router = require('express').Router();

    router.use(bodyParser.urlencoded({
        extended: true
    }));

    // allow people to do listing
    
    router.use(function(req,res,next){
        //only check for token if it is PUT, DELETE methods or it is POSTING to events
        if(req.method=="PUT" || req.method=="DELETE"
            || (req.method=="POST" && req.url.includes("/events"))) {
            var token = req.query.token;
            if (token == undefined) {
                res.status(401).send("No tokens are provided. You are not allowed to perform this action.");
            } else {
                db.checkToken(token, function (err, organizer) {
                    if (err || organizer == null) {
                        res.status(401).send("[Invalid token] You are not allowed to perform this action.");
                    } else {
                        //means proceed on with the request.
                        next();
                    }
                });
            }
        } else {    //all other routes will pass
            next();
        }
    });

    router.get('/', function (req, res) {
        res.sendFile(__dirname + "/views/index.html");
    });

    router.get('/viewProfile', function (req, res) {
        res.sendFile(__dirname + "/views/viewProfile.html");
    });
    router.get('/faq', function (req, res) {
        res.sendFile(__dirname + "/views/faq.html");
    });
    router.get('/editProfile', function (req, res) {
        res.sendFile(__dirname + "/views/editProfile.html");
    });
    router.get('/register', function (req, res) {
        res.sendFile(__dirname + "/views/register.html");
    });
    router.get('/login', function (req, res) {
        res.sendFile(__dirname + "/views/login.html");
    });

    router.get('/faq', function (req, res) {
        res.sendFile(__dirname + "/views/faq.html");
    });
    //for recommended movies page
    router.get('/recommend', function (req, res) {
        res.sendFile(__dirname + "/views/recommend.html");
    });
    router.get('/movies', function (req, res) {
        db.getAllRMovies(function (err, movies){
            res.send(movies);
        });
    })

    router.get('/css/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });
    
    router.get('/js/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });

    //search
    router.post('/search', function (req, res) {
        var title = req.body.title;
        db.searchMovie(title,function(err,movie) {
           res.end(); 
        });

    });

    //update user
    router.put('/user', function (req, res) {
        console.log("update profile")
        var data = req.body;
        db.updateUser(data.id, data.name, data.email, data.number, data.password, data.address, data.postalCode,
            function (err, user) {
                res.end();
            });
    })
    //get user
    router.get('/user', function(req, res){
        // var id = req.params.id;
        db.getAllUser(function(err, user){
            res.send(user);
        })
    })

    router.get('/user/:id', function(req, res){
        var id = req.params.id;
        db.getUser(id, function(err, user){
            res.send(user);
        })
    })
    //get movie
    router.get('/movie', function(req, res){
        res.send(movieController.getMovie());
    })

    //register user
    router.post('/register', function (req, res) {
        var data = req.body;
        db.addUser(data.name, data.password, data.email, data.number, data.address, data.postalCode, function (err, user) {
            if (err) {
                res.status(500).send("Unable to register a new user");
            } else {
                res.status(200).send("User has been registered!");
            }
        })
    })

    //login user
    router.post('/login', function (req, res) {
        var data = req.body;
        db.login(data.email, data.password, function (err, user) {
            if (err) {
                res.status(401).send("Login unsucessful. Please try again later");
            } else {
                if (user == null) {
                    res.status(401).send("Login unsucessful. Please try again later");
                } else {
                    var strToHash = user.name + Date.now();
                    var token = crypto.createHash('md5').update(strToHash).digest('hex');
                    db.updateToken(user._id, token, function (err, user) {
                        res.status(200).json({ 'message': 'Login successful.', 'token': token });
                    });
                }
            }
            
        })
    })

    //logout user
    router.get("/logout", function (req, res) {
        var token = req.query.token;
        if (token == undefined) {
            res.status(401).send("No tokens are provided");
        } else {
            db.checkToken(token, function (err, organizer) {
                if (err || organizer == null) {
                    res.status(401).send("Invalid token provided");
                } else {
                    db.removeToken(organizer._id, function (err, user) {
                        res.status(200).send("Logout successfully")
                    });
                }
            })
        }
    })

    router.get('/movies', function (req, res) {
        db.getAllRecommendMovies(function (err, movies) {
            res.send(movies);
        })
    })

    return router;
};

module.exports = routes();
