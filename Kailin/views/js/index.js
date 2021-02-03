$(document).ready(function () {
    

    var token = sessionStorage.authToken;

    if(token==undefined) {
        $(".protectedSection").hide();
        $(".unprotectedSection").show();
    } else {
        $(".protectedSection").show();
        $(".unprotectedSection").hide();
    }
})
function addToCart() {
    var newCart = {
        title: $("#mtitle").val(),
        location: $("#location").val(),
        time: $("#time").val(),
        quantity: $("#quantity").val(),
        price: $("#price").val(),
        id: sessionStorage.id,
        
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


    
   
