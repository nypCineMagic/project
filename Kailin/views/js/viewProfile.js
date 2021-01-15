$(document).ready(function () {
    $.ajax({
        url: "/user" ,
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(user) {
                    $(".user").append(`
                        <article>
                        <div>
                        <h3>Click Name to Edit Your Profile</h3>
                        <h3><a href="/editProfile?id=${user._id}">${user.name}</a></h3>
                            Email Address: ${user.email}<br>
                            Mobile Number: ${user.number}<br>
                            Password: ${user.password}<br>
                            Home Address: ${user.address}<br>
                            Postal Code: ${user.postalCode}<br>
                        </div>
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
})