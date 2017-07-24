//FIRST: DYNAMICALLY CREATE BUTTONS

var buttonArray = ["Dog", "Cat", "Bunny", "Sugar Glider", "Squirrel", "Chipmunk", "Koala", "Panda"];

function createButtons() {
  $("#buttonsGo").empty();

  for (i = 0; i < buttonArray.length; i++){

    var btnhtml = "<button class='btn showPics' data-name='" + buttonArray[i] + "'>" + buttonArray[i] + "</button>";

    // console.log(btnhtml);

    $('#buttonsGo').append(btnhtml);
  }
}

$('#addPic').on("click", function(event) {

  //Prevents form html from refreshing the page
  event.preventDefault();

  //store input from field in a variable
  var inputPic = $('#picInput').val().trim();

  //only makes a new button if there is no duplicate
  if (buttonArray.indexOf(inputPic) === -1 ) {
          buttonArray.push(inputPic);
        }

  //creates buttons again
  createButtons();

  $("#picInput").val("");

})


//clicks
function displayPics() {
  var pic = $(this).attr("data-name");
  console.log(pic);
  var APIkey = "e4cfd36ef77042378f377b450ce757c7";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pic +
                 "&api_key=" + APIkey + "&limit=5";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);

    var results = response.data;

    for (i = 0; i < results.length; i++) {
      var picSpan = $("<div class='item col-md-4'>")

      var rating = results[i].rating;
      var rateP = $("<p>").text("Rating: " + rating.toUpperCase());

      var aniImg = $("<img>");
      aniImg.attr("src", results[i].images.fixed_height.url);

      picSpan.prepend(rateP);
      picSpan.prepend(aniImg);

      $("#picsGo").prepend(picSpan);

    }

  })
}

$(document).on("click", ".showPics", displayPics);

//CREATE INITIAL BUTTONS
createButtons();
