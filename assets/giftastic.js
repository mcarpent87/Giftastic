
// Initial array of tv Shows that will show up on the html page as the "default" tv Show buttons
var tvShowArray = ["Seinfeld","Curb Your Enthusiasm","Breaking Bad", "Better Call Saul", "Mad Men", "The Office", "Parks and Rec", "New Girl", "Lost", "30 Rock", "Game of Thrones", "Veep", "Silicon Valley", "Kimmy Schmidt", "Modern Family", "The Walking Dead", "The Simpsons"];

// Function for displaying tvShow buttons on html page
function renderButtons() {

  // Deleting the tvShow buttons prior to adding new tvShow buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttonPanel").empty();

  // Looping through the array of tvShowArray
  for (var i = 0; i < tvShowArray.length; i++) {

    // Dynamically generate buttons for each tvShow in the array.
    var button = $('<button class="btn btn-info"></button>');
    // Adding a class
    button.addClass("tvShowButton");
    // Adding a data-attribute with a value of the tvShowArray at index i
    button.attr("data-tvShow", tvShowArray[i]);
    // Providing the button's text with a value of the tvShowArray at index i
    button.text(tvShowArray[i]);
    // Adding the button to the HTML
    $("#buttonPanel").append(button);
  }
}

// This function handles events where one button is clicked
$("#add-tvShow").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We are using a form so that the user can hit enter instead of clicking the button if they choose to
  event.preventDefault();

  // This line will grab the text from the input box
  var tvShow = $("#tvShow-input").val().trim();
  // The tvShow from the textbox is then added to our array
  tvShowArray.push(tvShow);
  $("#tvShow-input").val("");

  // calling renderButtons which handles the processing of our tvShow array
  renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of tvShows
renderButtons();

//Retrieve TV show GIFS function with the GIPHY API
function retrieveTvShowGifs() {
//Get the tvShow name from the button clicked
var tvShowName = $(this).attr("data-tvShow");

//Giphy URL
// Constructing a queryURL using the tvShow name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
tvShowName + "&api_key=kJiIUSPXUQayNOlryNjJ70NSoNhpD79S&limit=15";

// Performing an AJAX request with the queryURL
$.ajax({
url: queryURL,
method: "GET"
})

.done(function( result) {
//Get the results array
    var dataArray = result.data;

//Create and display div element for each of the reurned gifs
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
        var newDiv = $("<div>");
        newDiv.addClass("tvShowGif");

        var Rating = $("<h2>").html("Rating: " + dataArray[i].rating);
        newDiv.append(Rating);

        var newImg = $("<img>");
        newImg.attr("src", dataArray[i].images.fixed_height_still.url);
        newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
        newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
        newImg.attr("data-state", "still");
        newDiv.append(newImg);

      // Append the new Gifs to the gifPanel
      $("#gifPanel").append(newDiv);

    }
    
});
}

// Function animateTvShowGif will animate a still Gif and stop a moving Gif
function animateTvShowGif() {
    // The image state will be either "still" or "animated"
    var state = $(this).find("img").attr("data-state");
  
    // Make the Gif either animated or still depending on the "data-state" value
    if (state === "still") {
      $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
      $(this).find("img").attr("data-state", "animate");
    } else {
      $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
      $(this).find("img").attr("data-state", "still");
    }
  }
  
  // Render the initial tvShow buttons when the HTML has finished loading
  $(document).ready(function() {
    renderButtons();
  });
  
  // An event handler for the tvShow buttons to fetch appropriate Gifs
  $(document).on("click", ".tvShowButton", retrieveTvShowGifs);
  
  // Add an event handler for the tvShow Gifs to make the image animate and stop
  $(document).on("click", ".tvShowGif", animateTvShowGif);

