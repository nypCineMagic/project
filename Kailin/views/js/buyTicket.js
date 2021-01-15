$(document).ready(function(){
    $(".reserved input").prop('checked', true);
    $(".reserved input").prop('disabled', true);
    $("label").click(function(){
        if(!$(this).hasClass("reserved")){
            if($(this).find("input").is(":checked")){
            $(this).addClass("selected");
            }else{
                console.log("selected");
                $(this).removeClass("selected");
            }
        }
        else{
            alert("Already booked");
        }
    })
});