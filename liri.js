require("dotenv").config();

var axios = require("axios");
var Spotify = require('node-spotify-api'); 
var keys = require('./keys.js');
var fs = require("fs");
var moment = require('moment');

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
        var query = "https://rest.bandsintown.com/artists/" + s + "/events?app_id=codingbootcamp";
        
        axios.get(query)
        .then(function(response) {
            concertThis(response);
        })
        .catch(function(err) {
            console.log("No concerts could be found for that artist/band.");
        });

    } else if (c === "spotify-this-song") {
        var searchQ;
        
        if (s === ""){
            searchQ = "the sign ace of base";
        } else {
            searchQ = s;
        }

        spotify.search({ type: "track", query: searchQ, limit: 1}, function(err, data) {
            if (err) {
            return console.log("Error: " + err);
            }
            var arrStr = data.tracks.items;
            spontifyThis(arrStr);
        });
    
    } else if (c === "movie-this") {
        var searchQ;
        
        if (s === ""){
            searchQ = "mr nobody";
        } else {
            searchQ = s;
        }

        var query = "http://www.omdbapi.com/?t=" + searchQ + "&y=&plot=short&apikey=trilogy";
        axios.get(query)
            .then(function(response) {
                movieThis(response);
            })
            .catch(function(err) {
               console.log("Could not find that movie.")
            });
    } else {
        console.log("Please use one of the four given commands.")
    };
};

//handle bands in town response
function concertThis(resp) {
    var concertArr = resp.data;
    concertArr.forEach(function (elem) {
        var date = moment(elem.datetime).format("MM/DD/YYYY");
        var text = "\nVenue: " + elem.venue.name + "\nLocation: " 
        + elem.venue.city + "," + elem.region
        +"\nConcet date: " + date + "\n";
        console.log(text);
        fs.appendFile("log.txt", text, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
};

//handle OMDB response
function movieThis(resp) {
    var ratings = resp.data.Ratings;
    var rtRating = ratings.find(rating => rating.Source === "Rotten Tomatoes");
    rtRating = rtRating.Value;
    var text = "\nTitle: " + resp.data.Title
    + "\nRelease Year: " + resp.data.Year
    + "\nIMDB Rating: " + resp.data.imdbRating
    + "\nRotten Tomatoes Rating: " + rtRating
    + "\nCountry: " + resp.data.Country
    + "\nLanguage: " + resp.data.Language
    + "\nPlot: " + resp.data.Plot
    + "\nActors: " + resp.data.Actors + "\n";
    
    console.log(text);
    fs.appendFile("log.txt", text, function(err) {
        if (err) {
            console.log(err);
        }
    });
};

//handle spotify response
function spontifyThis(resp) {
    resp.forEach(function(track) {
        var artistArr = track.album.artists[0];
        var text = "\nSong: " + track.name
        + "\nAlbum: " + track.album.name
        + "\nPreview Song: " + track.preview_url
        + "\nArtist(s): " + artistArr.name + "\n";
        console.log(text);
        fs.appendFile("log.txt", text, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
};

