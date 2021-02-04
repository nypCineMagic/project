$(document).ready(function(){
    $.ajax({
        url: "/cart",
        method: "get"
    })
    .done(
        function(data){
            data.forEach(function(Carts){
            $(".cart").append(`
            <article>
            <div>
            
            Location : ${Carts.location}<br>
            Time of Movie : ${Carts.time}<br>
            Price of Movie : ${Carts.price}<br>
            Quantity : ${Carts.quantity}<br>
            `);
            })
        }
    )
    .fail(
        function(err){
            console.log(err.responseText);
        }
    )
})
// Movie Title : ${Carts.movietitle}<br>