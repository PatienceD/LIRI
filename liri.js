require("dotenv").config();
let axios = require("axios");
var moment = require('moment');
var fs = require("fs");
let Spotify = require('node-spotify-api');
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);

var userInput = undefined;
if (process.argv[3]) {
    userInput = process.argv.slice(3).join("+");
}
spotifyMasterFunction(process.argv[2], userInput);

function spotifyMasterFunction(primaryCommand, userInput) {
    if (primaryCommand === "spotify-this-song" && userInput === undefined) {
        spotify.search({ type: 'track', query: "the+sign" }).then(data => {
            console.log("Artist Name: " + data.tracks.items[3].artists[0].name);
            console.log("Album Name: " + data.tracks.items[3].album.name);
            console.log("Song Name: " + data.tracks.items[3].name)
            console.log("Find the music here: " + data.tracks.items[3].artists[0].external_urls.spotify);
        })
            .catch(err => {
                console.log("This is the error: " + err);
            });

    } else if (primaryCommand === "spotify-this-song") {
        spotify.search({ type: 'track', query: userInput }).then(data => {
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Where to Listen: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album Name: " + data.tracks.items[0].album.name);
        })
            .catch(err => {
                console.log("This is the error: " + err);
            });

    } else if (primaryCommand === "movie-this" && userInput === undefined) {
        console.log("Title: Mr. Nobody");
        console.log("Year: 2013");
        console.log("imdb Rating: 7.8");
        console.log("Rotten Tomatoes Rating: undefined");
        console.log("Country Filmed in: Belgium, Germany, Canada, France, USA, UK");
        console.log("Language: English, Mohawk");
        console.log("The Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
        console.log("The Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");


    } else if (primaryCommand === "movie-this") {
        let queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrl);

        axios.get(queryUrl).then(response => {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("imdb Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Filmed in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("The Plot: " + response.data.Plot);
            console.log("The Actors: " + response.data.Actors);
        })
            .catch(error => {
                console.log("This is the error: " + error)
            });

    } else if (primaryCommand === "concert-this") {
        let artist = userInput;
        let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=eb5c2a63-daa4-4a52-9013-9157108d89a6";
        console.log(queryUrl);

        axios.get(queryUrl).then(response => {
            console.log("Venue Name: " + response.data[0].venue.name);
            console.log("Venue City: " + response.data[0].venue.city);
            console.log("Date: " + moment(response.data[0].dateTime).format(" MMM D YYYY "));
        })

    } else if (primaryCommand === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", (error, data) => {
            if (error) {
                return console.log(error);
            }
            var stringArray = data.split(",");
            var trimmedString = stringArray[1].replace(/\"/g, '');
            spotifyMasterFunction(stringArray[0], trimmedString.split(" ").slice(0).join("+"));
        });
    }

}
