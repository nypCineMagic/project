$(document).ready(function () {
    $.ajax({
        url: "/users",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(event) {
                    $(".users").append(`
                        <article>
                        <h2><a href="/edit?id=${user._id}">${user.name}</a></h2>
                        <div>
                            Email Address: ${user.email}<br>
                            Mobile Number: ${user.number}<br>
                            Password: ${user.password}<br>
                            Home Address: ${user.address}<br>
                            Postal Code: ${user.postalCode}<br>
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

    $(".editProfile").click(function () {
        $(".editUserProfile").show();
    })
})

// function addEvent() {
//     var newEvent = {
//         name: $("#name").val(),
//         description: $("#description").val(),
//         startDate: $("#startDate").val(),
//         startTime: $("#startTime").val(),
//         endDate: $("#endDate").val(),
//         endTime: $("#endTime").val()
//     };

//     $.ajax({
//         url:"/events?token="+sessionStorage.authToken,
//         method:"POST",
//         data: newEvent
//     })
//     .done(function(data){
//         $(".statusMessage").text(data);
//         setTimeout(function(){
//             location.reload();
//         },3000);
//     })
//     .fail(function(err){
//         $(".statusMessage").text("Unable to add new event");
//     })
//     return false;
// }