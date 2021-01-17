var movieId = 0;
$(document).ready(function() {
    //extract para from the url
    var urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');

    
    $.ajax({
        url: "/movie/" + movieId,
        method: "get" // after get user
    }).done( // fill in data so it will get user
        function (data) {
            data.forEach(function(movie) {// 
                $(".moviedetails").append(`
                    <article>
                    <div>
                    <h3>${movie.title}</h3>
                        Genre: ${movie.genre}<br>
                        Language: ${movie.language}<br>
                        Running Time: ${movie.runningTime}<br>
                        Director: ${movie.director}<br>
                        Cast: ${movie.cast}<br>
                        Description: ${movie.description}<br>
                    </div>
                    </article>
                `);
            })
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );
});

    
   
