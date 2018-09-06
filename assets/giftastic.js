
// Initial array of animals that will show up on the html page as the "defualt" animal buttons
var animalsArray = ["Seinfeld","Curb Your Enthusiasm","Breaking Bad", "Better Call Saul", "Mad Men", "The Office", "Parks and Rec", "New Girl", "Lost", "30 Rock", "Game of Thrones", "Veep", "Silicon Valley", "Kimmy Schmidt", "Modern Family", "The Walking Dead", "The Simpsons"];

// Function for displaying animal buttonsn on html page
function renderButtons() {

  // Deleting the animal buttons prior to adding new animal buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttonPanel").empty();

  // Looping through the array of animalsArray
  for (var i = 0; i < animalsArray.length; i++) {

    // Dynamically generate buttons for each animal in the array.
    var button = $('<button class="btn btn-info"></button>');
    // Adding a class
    button.addClass("animalButton");
    // Adding a data-attribute with a value of the animalsArray at index i
    button.attr("data-animal", animalsArray[i]);
    // Providing the button's text with a value of the animalsArray at index i
    button.text(animalsArray[i]);
    // Adding the button to the HTML
    $("#buttonPanel").append(button);
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var animal = $("#animal-input").val().trim();
  // The animal from the textbox is then added to our array
  animalsArray.push(animal);
  $("#animal-input").val("");

  // calling renderButtons which handles the processing of our animal array
  renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of animals
renderButtons();

//Retrieve Animals GIFS function with the GIPHY API
function retrieveAnimalGifs() {
//Get the animal name from the button clicked
var animalName = $(this).attr("data-animal");

//Giphy URL
// Constructing a queryURL using the animal name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
animalName + "&api_key=kJiIUSPXUQayNOlryNjJ70NSoNhpD79S&limit=10";

// dc6zaTOxFJmzC

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
        newDiv.addClass("animalGif");

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

// animateAnimalGif will animate a still Gif and stop a moving Gif
function animateAnimalGif() {
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
  
  // Render the initial animal buttons when the HTML has finished loading
  $(document).ready(function() {
    renderButtons();
  });
  
  // An event handler for the animal buttons to fetch appropriate Gifs
  $(document).on("click", ".animalButton", retrieveAnimalGifs);
  
  // Add an event handler for the animal Gifs to make the image animate and stop
  $(document).on("click", ".animalGif", animateAnimalGif);

