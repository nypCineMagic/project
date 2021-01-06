var userId = 0;
$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    eventId = urlParams.get('id');

    $.ajax({
        url: "/user/" + userId,
        method: "get"
    }).done(
        function(data){
            $('#firstName').val(data.firstName);
            $('#lastName').val(data.lastName);
            $('#birthDate').val(data.birthDate);
            $('#email').val(data.email);
            $('#mobile').val(data.mobile);
            $('#password').val(data.password)
        }
    ).fail(
        function(err){
            console.log(err.responseText);
        }
    );
});

function updateProfile(){
    var profile = {
        id: userId,
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        birthDate: $("#birthDate").val(),
        email: $("#email").val(),
        mobile: $("#mobile").val(),
        password: $("#password").val(),
    };
    $.ajax(
        {
            url: '/profile',
            method: 'put',
            data: profile
        }
    ).done(
        function(data){
            alert("Profile Updated!");
        }
    ).fail(
        function(err){
            console.log(err.responseText);
        }
    );
    // stops html form from submitting
    return false;
}