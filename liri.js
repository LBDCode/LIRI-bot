require("dotenv").config();

var axios = require("axios");
var Spotify = require('node-spotify-api'); 
var keys = require('./keys.js');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");


//command check
if (command === "do-what-it-says") {
    fs.readFile('./random.txt', 'utf8', function(err, contents) {
        var com = contents.split(',')[0];
        var srch = contents.split(',')[1];
        doWhat(com, srch);
    });
} else {
    doWhat(command, search);
};

//run command
function doWhat(c, s) {
    if (c === "concert-this") {  
        console.log("concert-this");
        
        var query = "https://rest.bandsintown.com/artists/" + s + "/events?app_id=codingbootcamp";
    
        axios.get(query).then(
        function(response) {
            var concertArr = response.data;
            concertArr.forEach(function (elem) {
                console.log(elem.venue.name);
                console.log(elem.venue.city + ", " + elem.region);
                console.log(elem.datetime + "\n");
            });
        });
    } else if (c === "spotify-this-song") {
        console.log("spotify this song.");

        var searchQ;
        if (s === ""){
            searchQ = "the sign ace of base";
        } else {
            searchQ = s;
        }

        spotify.search({ type: 'track', query: searchQ, limit: 1}, function(err, data) {
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
            });
        });
    
    } else if (c === "movie-this") {
        console.log("movie this");

        var searchQ;
        if (s === ""){
            searchQ = "mr nobody";
        } else {
            searchQ = s;
        }

        var query = "http://www.omdbapi.com/?t=" + searchQ + "&y=&plot=short&apikey=trilogy";
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
    } else {
        console.log("Please use one of the four given commands.")
    };

}


//need to add momentJS to format event date for concert-this
//do bonus
