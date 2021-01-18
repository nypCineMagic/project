var userId = 0;
$(document).ready(function () {
    userId = sessionStorage.Id
    $.ajax({
        url: "/cart/" + userId,
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(data) {
                    $(".cart").append(`
                        <article>
                        <h2>${data.name} - cart</h2>
                        <div>
                            Title: ${data.title}<br>
                            Location: ${data.location}<br>
                            Time of Movie${data.time}<br>
                            Number of Tickets bought: ${data.noOfTicket}<br>
                            Price of Ticket${data.price}<br>
                        </div>
                        </article>
                    `);
                });
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
    
})
