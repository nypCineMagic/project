$(document).ready(function () {
    
})

function addToCart() {
    var newCart = {
        movietitle: $("#movietitle").val(),
        location: $("#location").val(),
        time: $("#time").val(),
        quantity: $("#quantity").val(),
        price: $("#price").val()
        
    };

    $.ajax({
        url:"/cart?token="+sessionStorage.authToken,
        method:"POST",
        data: newCart
    })
    .done(function(data){
        $(".statusMessage").text(data);
        setTimeout(function(){
            location.reload();
        },3000);
    })
    .fail(function(err){
        $(".statusMessage").text("Unable to add movie into cart");
    })
    return false;
}


    