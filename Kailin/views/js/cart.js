$(document).ready(function(){
    $.ajax({
        url: "/cart",
        method: "get"
    })
    .done(
        function(data){
            // data.forEach(function(Cart){
            $(".cart").append(`
            <article>
            <div>
            Movie Title : ${data.movietitle}<br>
            
            Location : ${data.location}<br>
            Time of Movie : ${data.time}<br>
            Price of Movie : ${data.price}<br>
            Quantity : ${data.quantity}<br>
            `);
            // })
        }
    )
    .fail(
        function(err){
            console.log(err.responseText);
        }
    )
})