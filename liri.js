require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api'); 
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

if (command === "concert-this") {  
    console.log("concert-this");
    
    var query = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    axios.get(query).then(
    function(response) {
        console.log(response.data[0].venue.name);
        console.log(response.data[0].venue.city + ", " + response.data[0].region);
        console.log(response.data[0].datetime);
    });
} else if (command === "spotify-this-song") {
    console.log("spotify this song.");

    spotify.search({ type: 'track', query: search, limit: 2}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      var arrStr = data.tracks.items;
      arrStr.forEach(function(track) {
        var artistArr = track.album.artists[0];
        console.log(track.name); 
        console.log(track.album.name);
        console.log(track.preview_url);
        console.log(artistArr.name);
      })
      
      });

} else if (command === "movie-this") {
    console.log("movie this");
    
    var query = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    axios.get(query).then(
        function(response) {
            var ratings = response.data.Ratings;
            var rtRating = ratings.find(rating => rating.Source === "Rotten Tomatoes");
            rtRating = rtRating.Value;
            
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + rtRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        });
} else if(command === "do-what-it-says") {
    console.log("run spotify from random.txt");
} else {
    console.log("Please use one of the four given commands.")
}





//need to add momentJS to format event date for concert-this
//need to change concert log for concert-this to a forEach
//have mr nobody be default for movie-this
//have The Sign by Ace of Base be the default for spotify-this
