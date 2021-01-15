var ticketId = 0;
$(document).ready(function(){
    // $(".reserved input").prop('checked', true);
    // $(".reserved input").prop('disabled', true);
    // $("label").click(function(){
    //     if(!$(this).hasClass("reserved")){
    //         if($(this).find("input").is(":checked")){
    //         $(this).addClass("selected");
    //         }else{
    //             console.log("selected");
    //             $(this).removeClass("selected");
    //         }
    //     }
    //     else{
    //         alert("Already booked");
    //     }
    // })


    var urlParams = new URLSearchParams(window.location.search);
    ticketId = urlParams.get('id');

    $.ajax({
        url: "/ticket/" + userId,
        method: "get" // after get user
    }).done( // fill in data so it will get user
        function (data) { // callback data
            console.log(data);
            $('#rowNo').val(data.rowNo);
            $('#reserved').val(data.reserved);
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    $(".buyTicket").click(function () {
        $(".seatViewing").show();
    })
    
});



function updateSeat() {
    var seat = {
        id: ticketId,
        rowNo: $("#rowNo").val(),
        reserved: $("#reserved").val()
    };
    $.ajax(
        {
            url: '/seat?token='+sessionStorage.authToken,
            method: 'put',
            data: seat
        }
    ).done(
        function (data) {
            alert("Seat Information updated!");
        }
    ).fail(
        function (err) {
           console.log(err.responseText);
        }
    );
    return false;
};