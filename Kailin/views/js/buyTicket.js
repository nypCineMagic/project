$(document).ready(function () {
    
})

function addToCart() {
    var newCart = {
        // userId: $("#userId").val(),
        name: $("#name").val(),
        title: $("#title").val(),
        location: $("#location").val(),
        time: $("#time").val(),
        noOfTicket: $("#noOfTicket").val(),
        price: $("#price").val()
    };

    $.ajax({
        url:"/cart?id="+sessionStorage.Id,
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
// function addToCart() {
//     var newCart = {
//         name: $("#name").val(),
//         title: $("#title").val(),
//         location: $("#location").val(),
//         time: $("#time").val(),
//         noOfTicket: $("#noOfTicket").val(),
//         price: $("#price").val()
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
//         $(".statusMessage").text("Unable to add into cart");
//     })
//     return false;
// }

// $.ajax({
//         url: "/buyTicket",
//         method: "get"
//     })
//         .done(
//             function (data) {
//                 data.forEach(function(data) {
//                     $(".cart").append(`
//                         <article>
//                         <h2>${data.name} - cart</h2>
//                         <div>
//                             Title: ${data.title}<br>
//                             Location: ${data.location}<br>
//                             Time of Movie${data.time}<br>
//                             Number of Tickets bought: ${data.noOfTicket}<br>
//                             Price of Ticket${data.price}<br>
//                         </div>
//                         </article>
//                     `);
//                 });
//             }
//         )
//         .fail(
//             function (err) {
//                 console.log(err.responseText);
//             }
//         )