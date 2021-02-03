$(document).ready(function () {
    // ?token=" + sessionStorage.authToken
    $.ajax({
        url: "/cart?token=" + sessionStorage.authToken,
        method: "get"
    })
        .done(
            function (data) {
                // Title: ${data.movie.title}<br></br>
                // data.forEach(function(cart) {
                    $(".cart").append(`
                        <article>
                        <div>
                        Total Price : (${data.price} * ${data.quantity})<br>
                            Movie Title: ${data.title}<br>
                            Location: ${data.location}<br>
                            Time of Movie: ${data.time}<br>
                            Quantity: ${data.quantity}<br>
                            Price of Ticket: ${data.price}<br>
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
        // $(".buyTicketBtn").click(function () {
        //     $(".buyTickets").show();
        // })

 })

