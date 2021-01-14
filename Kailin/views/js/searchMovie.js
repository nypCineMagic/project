$(document).ready(function () {
    $.ajax({
        url: "/searchMovieByTitle",
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
            url: '/searchMovieByTitle?token='+sessionStorage.authToken,
            method: 'put',
            data: movie
        }
    ).done(
        function (data) {
            alert("Movie Result!");
        }
    ).fail(
        function (err) {
           console.log(err.responseText);
        }
    );
    return false;
}