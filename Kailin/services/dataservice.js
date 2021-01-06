var mongoose = require('mongoose');
var schema = mongoose.Schema;
var movieSchema = {};
var userSchema = {};
var userModel;
var movieModel;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('debug',true);
mongoose.set('useUnifiedTopology', true);

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/ProjectDB', function (err) {
            if (err == null) {
                console.log("Connected to MongoDB");
                //initialize values
                movieSchema = schema({
                    title : String,
                    genre : String,
                    releaseDate : String,
                    runningTime : String,
                    language : String,
                    rating : String,
                    ticketPrice : Number,
                });
                userSchema = schema({
                    firstName : String,
                    lastName : String,
                    birthDate : Date,
                    email : String,
                    mobile : Number,
                    password : String,

                });
                var connection = mongoose.connection;
                movieModel = connection.model("movies", movieSchema);
                userModel = connection.model("users", userSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    // add like the functions here
    // addCart: function(t, g, rd, rt, l, r, tp, callback){

    // }
    updateProfile: function(id, fn, ln, bd, e, m, p, callback){
        var updatedProfile = {
            firstName : fn,
            lastName : ln,
            birthDate : bd,
            email : e,
            mobile : m,
            password : p,
        };
        userModel.findByIdAndUpdate(id, updatedProfile, callback);
    }
};

module.exports = database;