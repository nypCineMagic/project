var ticketId = 0;
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    ticketId = urlParams.get('id');

    attachButtons = function() {
        $(".deleteTicketBtn").click(function() {
            var ticketId = $(this).data('ticketid');
            $.ajax(
                {
                    method: "POST",
                    url: '/tickets/delete',
                    data: {"ticketId": ticketId},
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
    }

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
                            Name: ${ticket.name}<br>
                            Price: ${ticket.price}<br>
                            Title: ${ticket.title}<br>
                        </div>
                        <button class="deleteTicketBtn" data-ticketid=${ticket._id}>Delete Ticket</button>
                        </article>
                    `);
                })
                attachButtons()
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
});