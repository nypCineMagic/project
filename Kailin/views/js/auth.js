$(document).ready(function(){

    var token = sessionStorage.authToken;

    if(token==undefined) {
        $(".protectedSection").hide();
        $(".unprotectedSection").show();
    } else {
        $(".protectedSection").show();
        $(".unprotectedSection").hide();
    }

    // handles the clicking of the logout function
    $(".logoutLink").click(function(e){
        //prevents the browser from navigating to "#", as defined by the <a href> tag
        e.preventDefault();
        
        $.ajax({
            // token will reach server side
            url: "/logout?token="+sessionStorage.authToken,
            method:"get"
        })
        .done(function(data){
            //once successful, remove the oken
            sessionStorage.removeItem("authToken");
            //go to homepage
            // go to whatever page u wanna go
            window.location.href="/";
        })
        .fail(function(err){
            console.log(err.responseText);
        })
    })
    
    
});

function login() {
    var credentials = {
        email: $("#email").val(),
        password: $("#password").val()
    }
    $.ajax({
        url:"/login",
        method:"post",
        data:credentials
    })
    .done(function(data){
        $(".statusMessage").text(data.message);
        sessionStorage.authToken=data.token;
    })
    .fail(function(err){
        $(".statusMessage").text(err.responseText);
    })
    return false;
}

function register() {
    // get all data
    var newUser = {
        name: $("#name").val(),
        password: $("#password").val(),
        email: $('#email').val(),
        address: $('#address').val(),
        number: $('#number').val(),
        postalCode: $("#postalCode").val(),
    }
    $.ajax({
        url: "/register",
        method: "post",
        data: newUser
    })
    .done(function(data){
        $(".statusMessage").text(data);
    })
    .fail(function (err){
        $(".statusMessage").text(err);
    })
    return false;
}