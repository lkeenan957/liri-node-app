var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var fs = require('fs');

var twitterKeys = new Twitter(keys.twitter);
var spotifyKeys = new Spotify(keys.spotify);
var Omdb = keys.omdb.api_key;

var userInput1 = process.argv[2];
var userInput2 = process.argv[3];



switch (userInput1) {
  case "my-tweets":
    //dosomething
    console.log("im running in my-tweets");
    getTweets();
    break;

  case "movie-this":
  	console.log("im running in movie-this");
    movieThis(userInput2);
    break;

  case "spotify-this-song":
  	console.log("im running in spotify-this-song");
    spotifyThis(userInput2);
    break;

  case "do-what-it-says":
  	console.log("im running in do-what-it-says");
    doWhatItSays();
    break;

  default:
    break;
}


function getTweets() {
  console.log("i the gettweets function")
  var params = {
    screen_name: 'nodejs'
  };

  twitterKeys.get('statuses/user_timeline', params, function (error, tweets, response) {
    if(error) {
      console.log("error "+ error)
    }
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
	  		console.log("Tweet: " + tweets[i].text + " created on " + tweets[i].created_at )
	  }
    }
  });
}


function movieThis(input) {
	var movie = input
  	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + Omdb, function (error, response, body) {
    if(!error && response.statusCode === 200){
    	console.log('body:', body); // Print the HTML for the Google homepage.
    }
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
  });
};

function spotifyThis(input){
	spotifyKeys.search({ type: 'track', query: input}, function(err, data){
		if(err){
			console.log("Error: " + err);
		};
		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Album Name: " + data.tracks.items[0].album.name);
	})
};

function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data){
		var dataArr = data.split(", ");

  		console.log(data);

  		for (var i = 0; i < dataArr.length; i++) {
	  		if (dataArr[i] === "spotify-this-song") {
	  				i++;
	  				spotifyThis(dataArr[i]);
	  		}
	  		if (dataArr[i] === "movie-this") {
	  			i++;
	  			movieThis(dataArr[i]);	
	  		}
	  		if (dataArr[i] === "my-tweets") {
	  			getTweets();
	  		}

  		}

	})

}