var userId = 0;
$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    $.ajax({
        url: "/user/" + userId,
        method: "get"
    }).done(
        function (data) {
            $('#name').val(data.name);
            $('#email').val(data.email);
            $('#number').val(data.number);
            $('#password').val(data.password);
            $('#address').val(data.address);
            $('#postalCode').val(data.postalCode);
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    // $(".deleteEventBtn").on('click', function() {
    //     $.ajax(
    //         {
    //             url: '/events/'+eventId+"?token="+sessionStorage.authToken,
    //             method: 'delete'
    //         }
    //     ).done(
    //         function (data) {
    //             alert("Event deleted!");
    //             window.location.href = "/";
    //         }
    //     ).fail(
    //         function (err) {
    //             console.log(err.responseText);
    //         }
    //     );
    // });
});

function editProfile() {
    var user = {
        id: userId,
        name: $("#name").val(),
        email: $("#email").val(),
        number: $("#number").val(),
        password: $("#password").val(),
        address: $("#address").val(),
        postalCode: $("#postalCode").val()
    };
    $.ajax(
        {
            url: '/user?token='+sessionStorage.authToken,
            method: 'put',
            data: user
        }
    ).done(
        function (data) {
            alert("User updated!");
        }
    ).fail(
        function (err) {
           console.log(err.responseText);
        }
    );
    return false;
}