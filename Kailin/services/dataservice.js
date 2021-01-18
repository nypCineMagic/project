const e = require('express');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var movieSchema = {};
var userSchema = {};
var ticketSchema = {};
var seatSchema = {};
var cartSchema = {};
var faqSchema = {};
var movieModel, userModel, cartModel, seatModel, ticketModel, faqModel;

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
                    description: String
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
                    description: String
                });

                seatSchema = schema({
                    rowNo: String,
                    reserved: Boolean,
                });

                // need to referenece movie to movie schema
                cartSchema = schema({
                    name: String,
                    location: String,
                    time: String,
                    price: String,
                    noOfTicket: Number,
                    title: String,
                    
                });

                faqSchema = schema({
                    inquiry: String
                });

                var connection = mongoose.connection;
                movieModel = connection.model('movie', movieSchema);
                userModel = connection.model('users', userSchema);
                ticketModel = connection.model('tickets', ticketSchema);
                cartModel = connection.model('cart', cartSchema);
                seatModel = connection.model('seat', seatSchema);
                faqModel = connection.model('faqs', faqSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },

    // reserveSeat = function({seats, name}, callback){
    //     Seat.updateMany({_id: {$in: seats}},{reserved: true, name: name}, callback);
    // },

    // addMany = function({seatsArray, name}, callback){
    //     Seat.insertMany(seatsArray, callback);
    // },

    //get seat status
    // getSeatStatus: function(callback) {
    //     seatModel.find({}, callback);
    // },
    // used to create seat info
    // getSeatInfo: function(callback) {
    //     seatModel.find({}, callback);
    // },
    //update seat id
    // updateSeat: function (id, rN, r, callback) {
    //     var updatedSeat = {
    //         rowNo: rN,
    //         reserved: r
    //     };
    //     seatModel.findByIdAndUpdate(id, updatedSeat, callback);
    // },
    getAllCart: function(callback){
        cartModel.find({}, callback);
    },
    getCart: function (id, callback) {
        cartModel.findById(id, callback);
    },
    //add to cart
    addCart: function (n, l, ti, p, not, t, callback) {
        var newCart = new cartModel ({
            name: n,
            location: l,
            time: ti,
            price: p,
            noOfTicket: not,
            title: t
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
    }
};

module.exports = database;