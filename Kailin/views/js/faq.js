$(document).ready(function () {
    $.ajax({
        url: "/searchfaq",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(event) {
                });
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
})