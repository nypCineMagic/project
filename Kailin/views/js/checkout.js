function Success() {
    var newTicket = {
        name: $("#name").val(),
        title: $("#title").val(),
        price: $("#price").val(),
        
    };

    $.ajax({
        url:"/ticket?token="+sessionStorage.authToken,
        method:"POST",
        data: newTicket
    })
    .done(function(data){
        $(".statusMessage").text(data);
        setTimeout(function(){
            location.reload();
        },3000);
    })
    .fail(function(err){
        $(".statusMessage").text("Unable to buy ticket");
    })
    return false;
}
