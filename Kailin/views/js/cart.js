$(document).ready(function () {
    // ?token=" + sessionStorage.authToken
    $.ajax({
        url: "/cart?id=" + sessionStorage.Id,
        method: "get"
    })
        .done(
            function (data) {
                // data.forEach(function(cart) {
                    $(".cart").append(`
                        <article>
                        <p hidden>${data.userId}</p>
                        
                        <div>
                        Name: ${data.name}<br>
                            Title: ${data.title}<br>
                            Location: ${data.location}<br>
                            Time of Movie: ${data.time}<br>
                            Number of Tickets bought: ${data.noOfTicket}<br>
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

// function addToCart() {
//     var newCart = {
//         // userId: $("#userId").val(),
//         name: $("#name").val(),
//         title: $("#title").val(),
//         location: $("#location").val(),
//         time: $("#time").val(),
//         noOfTicket: $("#noOfTicket").val(),
//         price: $("#price").val()
//     };

//     $.ajax({
//         url:"/cart?id="+sessionStorage.Id,
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
//         $(".statusMessage").text("Unable to add into cart");
//     })
//     return false;
// }
