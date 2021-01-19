$(document).ready(function () {
    $.ajax({
        url: "/faq",
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

    $(".addFaq").click(function () {
        $(".addNewFaq").show();
    })
})