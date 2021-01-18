$(document).ready(function () {
    userId = sessionStorage.Id

    $.ajax({
        url: "/cart/" + userId,
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(cart) {
                    $(".cart").append(`
                        <article>
                        <div>
                        <h3></h3>
                        <h3>${cart.name}</h3>
                            Email Address: ${cart.email}<br>
                            Mobile Number: ${cart.number}<br>
                            Password: ${cart.password}<br>
                            Home Address: ${cart.address}<br>
                            Postal Code: ${cart.postalCode}<br>
                        </div>
                        <h4>Total Price : $</h4>
                        <br>
                        
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
        $(".buyTicket").click(function () {
            $(".seatViewing").show();
        })
})

{/* <a href="/editProfile?id=${cart._id}"> */}