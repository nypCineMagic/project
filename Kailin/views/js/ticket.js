var ticketId = 0;
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    ticketId = urlParams.get('id');

    $.ajax({
        url: "/tickets",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(ticket) {
                    $(".tickets").append(`
                        <article>
                        <h2><a href="/edit?id=${ticket._id}">${ticket.title}</a></h2>
                        <div>
                            ${ticket.name}<br>
                            ${ticket.price}<br>
                            ${ticket.title}<br>
                            ${ticket.description}<br>
                        </div>
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

$(".deleteTicketBtn").on('click', function() {
    $.ajax(
        {
            url: '/tickets/'+ticketId,
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