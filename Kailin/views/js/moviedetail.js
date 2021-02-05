var movieId = 0;
$(document).ready(function() {
    //extract para from the url
    var urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');

    
    $.ajax({
        url: "/movie/" + movieId,
        method: "get"
    }).done(
        function (movie) {
            
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
                        Rating: ${movie.rating}<br>
                    </div>
                    </article>
                `);
            
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    )
})

// function addToCart() {
    
//     var newCart = {
//         movietitle: $("#movietitle").val(),
//         location: $("#location").val(),
//         time: $("#time").val(),
//         quantity: $("#quantity").val(),
//         price: $("#price").val(),

        
//     };

//     $.ajax({
//         url:"/cart?token="+sessionStorage.authToken,
//         method:"POST",
//         data: newCart
//     })
//     .done(function(data){
//         $(".statusMessage").text(data);
//         setTimeout(function(){
//             location.reload();
//         },3000);
//     })
//     .fail(function(err){
//         $(".statusMessage").text("Unable to add movie into cart");
//     })
//     return false;
// }
