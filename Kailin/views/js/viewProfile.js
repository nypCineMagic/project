var userId = 0;
$(document).ready(function () {
    userId = sessionStorage.Id

    $.ajax({
        url: "/user/" + userId ,
        method: "get"
    })
        .done(
            function (data) {
               
                    $(".user").append(`
                        <article>
                        <div>
                        <h3>Click Name to Edit Your Profile</h3>
                        <h3><a href="/editProfile?id=${data._id}">${data.name}</a></h3>
                            Email Address: ${data.email}<br>
                            Mobile Number: ${data.number}<br>
                            Password: ${data.password}<br>
                            Home Address: ${data.address}<br>
                            Postal Code: ${data.postalCode}<br>
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
