var userId = 0;
$(document).ready(function() {
    //extract para from the url
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    $.ajax({
        url: "/user/" + userId,
        method: "get" // after get user
    }).done( // fill in data so it will get user
        function (data) { // callback data
            console.log(data);
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
});

function editUser() {
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
            // url: '/user',
            // once jianming finishes login token part, i can change codes
            url: '/user?token='+sessionStorage.authToken
            method: 'put',
            data: user
        }
    ).done(
        function (data) {
            alert("Profile updated!");
        }
    ).fail(
        function (err) {
           console.log(err.responseText);
        }
    );
    return false;
};