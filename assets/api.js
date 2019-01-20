var apiKey= "pqNOnbzfBte9skLM2LpXsdEXxeYh9GCz";
var policians = ["Barack Obama", "Donald Trump", "Hillary Clinton", "Bill Clinton", "Joe Biden", "Vladimir Putin", "Sarah Palin", "Bernie Sanders", "George W. Bush", "John McCain"];

function btnsOnTheFly() {
    $("#myBtns").empty();
    for (var i = 0; i < policians.length; i++) {
        var btn = $("<button>");
        btn.attr("data-name", policians[i]);
        btn.text(policians[i]);
        btn.addClass("myBtn btn btn-info");
        $("#myBtns").append(btn);
    }
}
btnsOnTheFly();

$("#addGif").click(function(event) {
    event.preventDefault();
    var newPolitician = $("#gif-input").val().trim();
    policians.push(newPolitician);
    btnsOnTheFly();
});

function giveMeGif () {
    $("#gifs").empty();
    var poliGif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+apiKey+"&q="+poliGif+"&limit=15&offset=0&rating=PG13&lang=en";

    $.ajax({url:queryURL, method: "GET"})
    .then(function(response){
    console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var div = $("<div>");
            div.addClass("float-left myCard card");
            var pDiv = $("<div>");
            pDiv.addClass("card-text");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            p.addClass("ratings card-text");
            pDiv.append(p);
            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height.url);
            image.addClass("card-img-top");
            div.append(pDiv);
            div.append(image);
            $("#gifs").append(div);
        }
    })
    
}
$(document).on("click", ".myBtn", giveMeGif);
