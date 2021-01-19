var userId = 0;
$(document).ready(function() {
    //extract para from the url
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    
    $(".deleteCart").on('click', function() {
        $.ajax(
            {
                url: '/cart/'+userId+"?token="+sessionStorage.authToken,
                method: 'delete'
            }
        ).done(
            function (data) {
                alert("Ticket deleted!");
                window.location.href = "/";
            }
        ).fail(
            function (err) {
                console.log(err.responseText);
            }
        );
    });
});