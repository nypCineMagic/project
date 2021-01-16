$(document).ready(function () {
    
   
    $(".searchBtn").click(function(e){
        //prevents the browser from navigating to "#", as defined by the <a href> tag
        e.preventDefault();
        
        $.ajax({
            url: "/movies/title",
            method: "get"
        })
        .done(
            function (data) {
                data.forEach(function(movieResult) {// 
                    $(".movieResult").append(`
                        <article>
                        <div>
                        <h2>${movieResult.title}</h2>
                            Genre: ${movieResult.genre}<br>
                            Language: ${movieResult.language}<br>
                            Running Time: ${movieResult.runningTime}<br>
                            Director: ${movieResult.director}<br>
                            Cast: ${movieResult.cast}<br>
                            Description: ${movieResult.description}<br>
                        </div>
                        </article>
                    `);
                })
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
    })
})

function searchMovieByTitle() {
    var movie = {
        id: movieid,
        title: $("#title").val(),
        genre: $("#genre").val(),
        language: $("#language").val(),
        runningTime: $("#runningTime").val(),
        director: $("#director").val(),
        cast: $("#cast").val(),
        description: $("#description").val()
    };
    $.ajax(
        {
            url: '/movie?token='+sessionStorage.authToken,
            method: 'put',
            data: movie
        }
    ).done(
        function (data) {
            alert("");
        }
    ).fail(
        function (err) {
           console.log(err.responseText);
        }
    );
    
    return false;
}