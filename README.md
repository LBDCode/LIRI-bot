# LIRI-bot

## The project:

LIRI-bot is a "Language Interpretation and Recognition Interface" app that takes user instructions from the terminal and returns information about concerts, album tracks, and movies.


## APIs and other tools:

### LIRI-bot is primarily powered by three APIs:
- Bands in Town for "concert-this": [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
- OMDB for "movie-this": [OMDB API](http://www.omdbapi.com)
- Spotify[Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

### Additionally, LIRI-bot uses the DotENV, Axios, and Moment packages.
- [Axios](https://www.npmjs.com/package/axios)
- [Moment](https://www.npmjs.com/package/moment)
- [DotEnv](https://www.npmjs.com/package/dotenv)

## Using LIRI-bot:

### From your terminal, run 'node liri.js' and one of four commands:

-[do-what-it-says]
-[concert-this] + band name
-[spotify-this-song] + optional song
-[movie-this] + optional movie title


### do-what-it-says:

The app will read random.txt to determine the command (API to use) and search parameter, then run one of the three defind queries (concert-this, spotify-this-song, or movie-this).


### concert-this <band name>:

LIRI will use the Bands in Town API to search for concert information for a user-supplied band.  A successful search will return the venue name, venue location, and concert date (formated by Moment).

### spotify-this-song <optional song title>:

LIRI will query the Spotify API for the user-supplied track, or default to Ace of Base's "The Sign" and return the following information:    

    - Song title

    - Album title

    - URL for a preview of the song

    - Artist name/names


### movie-this <optional movie title>:

LIRI will search the OMDB API for the user-supplied film title, or default to "Mr. Nobody" and return the following information:

    - Movie title

    - Year released

    - IMDB movie rating

    - Rotten Tomatoes rating

    - Production country (where the movie was produced)

    - Language

    - A short plot summary

    - Cast




