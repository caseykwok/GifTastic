$(document).ready(function() {

	var animals = ["turtle", "dog", "cat", "bunny", "otter", "seal", "dolphin", "walrus", "fox", "panda", "monkey", "elephant", "penguin", "polar bear", "sloth", "deer", "squirrel", "koala", "hedgehog", "hamster", "duckling", "anteater"];

	function renderButtons() {

		$(".buttons_view").empty();

		$.each(animals, function(index, animal) {
			newButton = $("<button>");
			newButton.addClass("animals");
			newButton.attr("name", animal);
			newButton.text(animal);
			$(".buttons_view").append(newButton);
		});

	};

	function getInformation() {

		$(".animal_display").empty();

		var animal = $(this).attr("name");
		// console.log(animal);
		var apiKey = "dc6zaTOxFJmzC";
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apiKey + "&limit=10";
		// console.log(queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var gifs = response["data"];
			$.each(gifs, function(index, gif) {
				var gifDiv = $("<div>");
				gifDiv.addClass("gif");
				// gifDiv.addClass("grid-item");
				var rating = $("<p>");
				rating.text("Rating: " + gif["rating"]);
				gifDiv.append(rating);
				var image = $("<img>");
				image.attr("data-state", "still");
				image.attr("data-still", gif["images"]["fixed_height_still"]["url"]);
				image.attr("data-animate", gif["images"]["fixed_height"]["url"]);
				image.attr("src", image.attr("data-still"));
				gifDiv.append(image);
				$(".animal_display").append(gifDiv);
			});
		});

	};

	function playStop() {

		var dataState = $(this).attr("data-state");
		if (dataState === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		};

	};

	$("#add_animal").on("click", function() {

		event.preventDefault();

		var input = $("#animal_input").val();
		if (input === "") {
			alert("Please input an animal.");
		} else if (animals.indexOf(input.toLowerCase()) === -1) {
			animals.push(input.toLowerCase());
			renderButtons();
		} else {
			alert("Animal is already listed. Please choose a different animal.");
		}

	});

	$(document).on("click", ".animals", getInformation);

	$(document).on("click", ".gif img", playStop);

	renderButtons();

});