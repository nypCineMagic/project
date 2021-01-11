const e = require('express');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var movieSchema = {};
var userSchema = {};
var movieModel, userModel;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

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
                    Director: String,
                    Cast: String,
                    description: String
                });

                userSchema = schema({
                    name: String,
                    password: String,
                    email: String,
                    number: String,
                    address: String,
                    postalCode: String
                });

                var connection = mongoose.connection;
                movieModel = connection.model('movies', movieSchema);
                userModel = connection.model('users', userSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    getAllEvents: function (callback) {
        eventModel.find({}, callback);
    },
    addEvent: function (n, d, sd, st, ed, et, callback) {
        var newEvent = new eventModel({
            name: n,
            description: d,
            start: {
                date: sd,
                time: st
            },
            end: {
                date: ed,
                time: et
            }
        });
        newEvent.save(callback);
    },
    getEvent: function (id, callback) {
        eventModel.findById(id, callback);
    },
    updateEvent: function (id, n, d, sd, st, ed, et, callback) {
        var updatedEvent = {
            name: n,
            description: d,
            start: {
                date: sd,
                time: st
            },
            end: {
                date: ed,
                time: et
            }
        };
        eventModel.findByIdAndUpdate(id, updatedEvent, callback);
    },
    updateProfile: function (id, n, e, num, pass, a, pc, callback) {
        var updatedProfile = {
            name: n,
            email: e,
            number: num,
            password: pass,
            address: a,
            postalCode: pc

        };
        userModel.findByIdAndUpdate(id, updatedProfile, callback);
    },
    deleteEvent: function (id, callback) {
        eventModel.findByIdAndDelete(id, callback);
    },
    addUser: function (n, p, e, n, a, pc, callback) {
        var newUser = new userModel({
            name: n,
            password: p,
            email: e,
            number: n,
            address: a,
            postalCode: pc
        });
        newUser.save(callback);
    },
    login: function (u, p, callback) {
        organizerModel.findOne({ username: u, password: p }, callback);
    },
    updateToken: function (id, token, callback) {
        organizerModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function(token,callback) {
        organizerModel.findOne({token:token},callback);
    },
    removeToken: function(id,callback) {
        organizerModel.findByIdAndUpdate(id, {$unset: {token: 1}},callback);
    }
};

module.exports = database;