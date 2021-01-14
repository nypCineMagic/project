$(document).ready(function () {

    $.ajax({
        url: "/users",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(users) {// 
                    $(".users").append(`
                        <article>
                        <div>
                        <h3>Click Name to Edit Your Profile</h3>
                        <h3><a href="/editProfile?id=${users._id}">${users.name}</a></h3>
                            Email Address: ${users.email}<br>
                            Mobile Number: ${users.number}<br>
                            Password: ${users.password}<br>
                            Home Address: ${users.address}<br>
                            Postal Code: ${users.postalCode}<br>
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