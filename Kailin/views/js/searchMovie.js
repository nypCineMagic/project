$(document).ready(function () {
    
   
    $(".searchBtn").click(function(e){
        //prevents the browser from navigating to "#", as defined by the <a href> tag
        e.preventDefault();
        
        $.ajax({
            url: "/movies/title",
            method: "post",
            data: {title: $("#title").val()} 
        })
        .done(
            function (data) {
                $(".movieResult").empty()
                data.forEach(function(movieResult) {// 
                    $(".movieResult").append(`
                        <article>
                        <div>
                        <a href="/moviedetail" class="moviedetail"><h2>${movieResult.title}</h2></a>
                            Genre: ${movieResult.genre}<br>
                            Language: ${movieResult.language}<br>
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
    return false;
})



    
   
