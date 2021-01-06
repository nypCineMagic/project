var moviesController = {
    movies: [],
    getMovies: function(){
        return this.movies;
    },
    addMovies: function(newMovie){
        this.events.push(newMovie);
    }
};

module.exports=moviesController;