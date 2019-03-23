// Array Defenition
  var animals=["Dog", "Cat", "Rabbit", "Hamster", "Lion", "Tiger", "Chinchilla", "Hedgehog", "Chicken", "Bird", "Ferret", "Goat", "Panda", "Kuala", "Hippo"];
  var play = false;
///// Start of Function Defenition //////

//  Adding Buttons from the Container
  function renderButtons(aniSelect){
    generateHTML = "<button class='anbtn' id='"+aniSelect+"'>"+aniSelect+"</button>"
    $('#gifBtn').append(generateHTML)
  }

// Adding Image to the page
  function getJSON(aniSelect){
    $('#gImg').empty();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+aniSelect+"&api_key=RXNS9yy1Iamexpkd9gQ9PXk0gJX7Sc7h&limit=10";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response)
    var gifresponse = response.data;
    for (var i = 0; i < gifresponse.length; i++) {
      // console.log(gifresponse[i].images.fixed_height_still.url)
      generateHTML = "<img class='aniGIF' id='"+gifresponse[i].images.fixed_height.url+"' src='"+gifresponse[i].images.fixed_height_small_still.url+"'>"
      $('#gImg').append(generateHTML);
    }
    });
  }

  function playFunction(oldGif, newGif){
    $('img[src="' + oldGif + '"]').attr('src', newGif);
    $('img[id="' + newGif + '"]').attr('id', oldGif);
  }
///// End of Function Defenition //////

// Adding a New Button to the container
  $("#addGif").on("click", function() {
    event.preventDefault();
    var addAnimal = $("#animalInput").val().trim();
    renderButtons(addAnimal)
  });

// Clearing the images and GIFS
$("#clearGif").on("click", function() {
  event.preventDefault();
  $('#gImg').empty();
});

//// Click event for Buttons
$(document).on("click", ".anbtn", function() {
  selectedAnimal = this.id;
  console.log(selectedAnimal);
  getJSON(selectedAnimal);
});
$(document).on("click", ".aniGIF", function() {
  oldGif = this.src
  newGif = this.id
  console.log(play)
  // console.log("SRC"+this.src)
  // console.log("Play"+this.id)
  if(!play){
    playFunction(oldGif, newGif)
    play = true;
  } else
  {
    playFunction(oldGif, newGif);
    play = false;
  }

});

$( document ).ready(function() {
  for (var i = 0 ; i < animals.length; i++){
    renderButtons(animals[i])
  }

})
