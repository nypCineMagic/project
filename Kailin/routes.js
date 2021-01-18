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
        //only check for token if it is PUT, DELETE methods or it is POSTING to movie
        if(req.method=="PUT" || req.method=="DELETE"
            || (req.method=="POST" && req.url.includes("/movie") 
            && req.url.includes("/users") && req.url.includes("/user"))) {
            var token = req.query.token;
            if (token == undefined) {
                res.status(401).send("No tokens are provided. You are not allowed to perform this action.");
            } else {
                db.checkToken(token, function (err, user) {
                    if (err || user == null) {
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

    //Movie details route
    router.get('/moviedetail', function (req, res) {
        res.sendFile(__dirname + "/views/moviedetail.html");
    });

    router.get('/viewProfile', function (req, res) {
        res.sendFile(__dirname + "/views/viewProfile.html");
    });
    router.get('/addCart', function (req, res) {
        res.sendFile(__dirname + "/views/cart.html");
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
    router.get('/buyTicket', function (req, res) {
        res.sendFile(__dirname + "/views/buyTicket.html");
    });
    router.get('/ticket', function (req, res) {
        res.sendFile(__dirname + "/views/ticket.html");
    });
    //for faq page
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
    //for ticket page
    router.get('/tickets', function (req, res) {
        db.getAllTickets(function (err, tickets){
            res.send(tickets);
        });
    })

    router.delete('/tickets/:id', function (req, res) {
        var id = req.params.id;
        db.deleteTicket(id, function (err, ticket) {
            res.end();
        });
    })

    router.get('/css/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });
    
    router.get('/js/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });
    
    //search movie by title
    router.post('/movies/title', function (req, res) {
        var title = req.body.title;
        db.searchMovieByTitle(title,function(err,movie) {
            if (err) {
                res.status(500).send("unable to find movie with this title");
            } else {
                res.status(200).send(movie);
            }
        });

    });

    router.put('/seat', function(req, res){
        console.log("update seats");
        var data = req.body;
        db.updateSeat(data.id, data.rowNo, data.reserved,
            function(err, seat){
                res.end();
            });

    });

    router.get('/checkout', function(req, res){
        
    });

    //get items from cart
    router.get('/cart', function(req, res){
        db.getAllCart(function(err, cart){
            if (err) {
                res.status(500).send("Unable to find Cart");
            } else {
                res.status(200).send(cart);
            }
        })
    })

    //add to cart
    router.put('/cart', function (req, res) {
        console.log("Added to Cart!");
        var data = req.body;
        db.addCart(data.id, data.name, data.title, data.date, data.time, data.price, data.noOfTicket,
            function (err, cart) {
                if (err) {
                    res.status(500).send("Unable to add into cart");
                } else {
                    res.status(200).send("Added successfully to Cart!");
                }
            });
    });

    //remove from cart
    router.delete('/cart/:id', function (req, res) {
        var id = req.params.id;
        db.deleteCart(id, function (err, cart) {
            if (err) {
                res.status(500).send("Unable to delete the ticket in cart");
            } else {
                if (event == null) {
                    res.status(200).send("No ticker is deleted from cart");
                } else {
                    res.status(200).send("ticked deleted successfully from cart");
                }
            }
        });
    })
    //add to cart
    router.post('/cart', function(req, res){
        var data = req.body;
        console.log(data);
        db.addCart(data.name, data.location, data.time, data.price, data.noOfTicket, data.title,
            function(err, cart){
                if(err){
                    res.status(500).send("Unable to add to cart");
                }else{
                    res.status(200).send("Successfully added to cart");
                }
            })
    });
    //checkout
    router.get('/checkout', function(req, res){
        
    });
    //update user
    router.put('/user', function (req, res) {
        console.log("update profile");
        var data = req.body;
        db.updateUser(data.id, data.name, data.email, data.number, data.password, data.address, data.postalCode,
            function (err, user) {
                res.end();
            });
    })
    //get user
    router.get('/user', function(req, res){
        db.getAllUser(function(err, user){
            if (err) {
                res.status(500).send("Unable to find user with this id");
            } else {
                res.status(200).send(user);
            }
        })
    })

    router.get('/movie', function(req, res){
        db.getAllMovies(function(err, movie){
            if (err) {
                res.status(500).send("Unable to find movie");
            } else {
                res.status(200).send(movie);
            }
        })
    })

    router.get('/user/:id', function(req, res){
        var id = req.params.id;
        console.log(id);
        db.getUser(id, function(err, user){
            if (err) {
                res.status(500).send("Unable to find user with this id");
            } else {
                res.status(200).send(user);
                console.log(user);
            }
        })
    })

    router.get('/movie/:id', function(req, res){
        var id = req.params.id;
        console.log(id);
        db.getMovie(id, function(err, movie){
            if (err) {
                res.status(500).send("Unable to find movie");
            } else {
                res.status(200).send(movie);
            }
        })
    })
    // //get movie
    // router.get('/movie', function(req, res){
    //     res.send(movieController.getMovie());
    // })

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
                        res.status(200).json({ 'message': 'Login successful.', 'token': token , 'Id': user._id});
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
            db.checkToken(token, function (err, user) {
                if (err || user == null) {
                    res.status(401).send("Invalid token provided");
                } else {
                    db.removeToken(user._id, function (err, user) {
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
