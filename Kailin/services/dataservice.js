const e = require('express');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var movieSchema = {};
var userSchema = {};
var ticketSchema = {};
var cartSchema = {};
var faqSchema = {};
var movieModel, userModel, cartModel, ticketModel, faqModel;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('debug',true);

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/eventsDB', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                movieSchema = schema({
                    title: String,
                    genre: String,
                    language: String,
                    runningTime: String,
                    director: String,
                    cast: String,
                    description: String,
                    rating: Number
                });

                userSchema = schema({
                    name: String,
                    password: String,
                    email: String,
                    number: String,
                    address: String,
                    postalCode: String,
                    token: String
                });

                ticketSchema = schema({
                    name: String,
                    price: String,
                    title: String,
                    // description: String
                });

                cartSchema = schema({
                    movietitle : String,
                    location: String,
                    time: String,
                    price: String,
                    quantity: String
                    
                });

                faqSchema = schema({
                    inquiry: String
                });

                ticketSchema = schema({
                    name: String,
                    price: String,
                    title: String
                })

                var connection = mongoose.connection;
                movieModel = connection.model('movies', movieSchema);
                userModel = connection.model('users', userSchema);
                ticketModel = connection.model('tickets', ticketSchema);
                cartModel = connection.model('cart', cartSchema);
                faqModel = connection.model('faqs', faqSchema);
                ticketModel = connection.model('tickets', ticketSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },

    
    getAllCart: function(callback){
        cartModel.find({}, callback);
    },
    // get cart
    getCart: function (id, callback) {
        cartModel.findById(id,callback);
    },
    addTicket: function (n, p, t, callback) {
        var newTicket = new ticketModel ({
            name: n,
            price: p,
            title: t,
            
            
        });
        newTicket.save(callback);
    },
    //add to cart
    addCart: function (ti,l, t, p, q, callback) {
        var newCart = new cartModel ({
            movietitle: ti,
            location: l,
            time: t,
            price: p,
            quantity: q
            
        });
        newCart.save(callback);
    },
    //remove from cart
    deleteCart: function (id, callback) {
        cartModel.findByIdAndDelete(id, callback);
    },
    getAllMovies: function(callback){
        movieModel.find({}, callback);
    },
    
    getAllTickets: function(callback){
        ticketModel.find({}, callback);
    },

    deleteTicket: function(id, callback) {
        ticketModel.findByIdAndDelete(id, callback);
    },

    //getuserprofile
    getAllUser: function(callback){
        userModel.find({}, callback);
    },
    getMovie: function(id, callback){
        movieModel.findById(id, callback);
    },
    getUser: function(id, callback){
        userModel.findById(id, callback);
    },
    //update profile by id
    updateUser: function (id, n, e, num, pass, a, pc, callback) {
        var updatedUser = {
            name: n,
            email: e,
            number: num,
            password: pass,
            address: a,
            postalCode: pc

        };
        userModel.findByIdAndUpdate(id, updatedUser, callback);
    },
    
    // search movie by title
    searchMovieByTitle: function(t, callback){
        movieModel.find({title: new RegExp(t,'i')}, callback);
    },
    
    addUser: function (na, p, e, n, a, pc, callback) {
        var newUser = new userModel({
            name: na,
            password: p,
            email: e,
            number: n,
            address: a,
            postalCode: pc
        });
        newUser.save(callback);
    },
    login: function (e, p, callback) {
        userModel.findOne({ email: e, password: p }, callback);
    },
    updateToken: function (id, token, callback) {
        userModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function(token,callback) {
        userModel.findOne({token:token},callback);
    },
    removeToken: function(id,callback) {
        userModel.findByIdAndUpdate(id, {$unset: {token: 1}},callback);
    },
    addFaq: function(i, callback){
        var newFaq = new faqModel({
            inquiry: i
        });
        newFaq.save(callback);
    },
    getAllRMovies: function(callback){
        movieModel.find({}, callback);
    },

};

module.exports = database;
