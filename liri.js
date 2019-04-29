require("dotenv").config();
let axios = require("axios");
// var fs = require("fs");
let Spotify = require('node-spotify-api');
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);
// fs.readFile("random.txt", "utf8", function (error, data) {
//     if (error) {
//         return console.log(error);
//     }
//     console.log(data);
// })

let userInput = process.argv.slice(3).join("+");

if (process.argv[2] === "spotify-this-song" && process.argv[3] === undefined) {
    spotify.search({ type: 'track', query: "the+sign" }).then(data => {
        console.log("Artist Name: " + data.tracks.items[3].artists[0].name);
        console.log("Album Name: " + data.tracks.items[3].album.name);
        console.log("Song Name: " + data.tracks.items[3].name)
        console.log("Find the music here: " + data.tracks.items[3].artists[0].external_urls.spotify);
    })
        .catch(err => {
            console.log("This is the error: " + err);
        });

} else if (process.argv[2] === "spotify-this-song") {
    spotify.search({ type: 'track', query: userInput }).then(function (data) {
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Where to Listen: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[0].album.name);
    })
        .catch(err => {
            console.log("This is the error: " + err);
        });

} else if (process.argv[2] === "movie-this" && process.argv[3] === undefined) {
    console.log("Title: Mr. Nobody");
    console.log("Year: 2013");
    console.log("imdb Rating: 7.8");
    console.log("Rotten Tomatoes Rating: undefined");
    console.log("Country Filmed in: Belgium, Germany, Canada, France, USA, UK");
    console.log("Language: English, Mohawk");
    console.log("The Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
    console.log("The Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");


} else if (process.argv[2] === "movie-this") {
    let movie = process.argv[3];
    let queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    axios.get(queryUrl).then(response => {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("imdb Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings.Value);
        console.log("Country Filmed in: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("The Plot: " + response.data.Plot);
        console.log("The Actors: " + response.data.Actors);
    })
        .catch(error => {
            console.log("This is the error: " + error)
        });


} else if (process.argv[2] === "concert-this") {
    let artist = process.argv[3];
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=eb5c2a63-daa4-4a52-9013-9157108d89a6";
    console.log(queryUrl);

    axios.get(queryUrl).then(response => {
        console.log(response.data);
    })
}


