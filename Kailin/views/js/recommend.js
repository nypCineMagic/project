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
                            ${movie.genre}<br>
                            ${movie.language}<br>
                            ${movie.runningTime}<br>
                            ${movie.Director}<br>
                            ${movie.Cast}<br>
                            ${movie.description}<br>
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