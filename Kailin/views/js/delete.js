var ticketId = 0;
$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    ticketId = urlParams.get('id');

    $.ajax({
        url: "/delete/" + ticketId,
        method: "get"
    }).done(
        function (data) {
            //text come from ajax
            //ajax is calling event/id by get
            $('#name').val(data.name);
            $('#price').val(data.price);
            $('#title').val(data.title);
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    $(".deleteTicketBtn").on('click', function() {
        $.ajax(
            {
                url: '/delete/'+ticketId+"?token="+sessionStorage.authToken,
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

