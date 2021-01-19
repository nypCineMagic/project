$(document).ready(function () {
    // ?token=" + sessionStorage.authToken
    $.ajax({
        url: "/cart",
        method: "get"
    })
        .done(
            function (cart) {
                // data.forEach(function(data) {
                    $(".cart").append(`
                        <article>
                        <h2>${cart.name} - cart</h2>
                        <div>
                            Title: ${cart.title}<br>
                            Location: ${cart.location}<br>
                            Time of Movie${cart.time}<br>
                            Number of Tickets bought: ${cart.noOfTicket}<br>
                            Price of Ticket${cart.price}<br>
                        </div>
                        </article>
                    `);
                // });
            }
            
        ) // the end of function
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
        $(".buyTicketBtn").click(function () {
            $(".buyTickets").show();
        })

 })

function addToCart() {
    var newCart = {
        name: $("#name").val(),
        title: $("#title").val(),
        location: $("#location").val(),
        time: $("#time").val(),
        noOfTicket: $("#noOfTicket").val(),
        price: $("#price").val()
    };

    $.ajax({
        url:"/cart?token="+sessionStorage.authToken,
        method:"POST",
        data: newCart
    })
    .done(function(data){
        $(".statusMessage").text(data);
        setTimeout(function(){
            location.reload();
        },3000);
    })
    .fail(function(err){
        $(".statusMessage").text("Unable to add into cart");
    })
    return false;
}
