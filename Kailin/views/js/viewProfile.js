$(document).ready(function () {
    $.ajax({
        url: "/user",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(user) {// 
                    $(".user").append(`
                        <article>
                        <div>
                        <h2>${user.name}</h2>
                            Email Address: ${user.email}<br>
                            Mobile Number: ${user.number}<br>
                            Password: ${user.password}<br>
                            Home Address: ${user.address}<br>
                            Postal Code: ${user.postalCode}<br>
                        </div>
                        <br>
                        <a href="/editProfile?id=${user._id}">Click to Edit Profile</a>
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

    // $(".Profile").click(function () {
    //     $(".editProfile").show();
    // })
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