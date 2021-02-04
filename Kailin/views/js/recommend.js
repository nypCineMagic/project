$(document).ready(function () {
    $.ajax({
        url: "/movies",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(movie) {
                    $(".movies").append(`
                        <article>
                        <h2><a href="/edit?id=${movie._id}">${movie.title}</a></h2>
                        <div>
                            Genre: ${movie.genre}<br>
                            Language: ${movie.language}<br>
                            Running Time: ${movie.runningTime}<br>
                            Director: ${movie.Director}<br>
                            Cast: ${movie.Cast}<br>
                            Description: ${movie.description}<br>
                            Rating: ${movie.rating}<br>
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