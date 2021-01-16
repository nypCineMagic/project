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
                        <h2>${movieResult.title}</h2>
                            Genre: ${movieResult.genre}<br>
                            Language: ${movieResult.language}<br>
                            Running Time: ${movieResult.runningTime}<br>
                            Director: ${movieResult.director}<br>
                            Cast: ${movieResult.cast}<br>
                            Description: ${movieResult.description}<br>
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


    
   
