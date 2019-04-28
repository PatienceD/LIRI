require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// var song = process.argv[2];
spotify.search({ type: 'track', query: 'The Sign' }).then(response => {
    console.log(response);

    // if (song) {

    // }
})
    .catch(err => {
        console.log("this is the error: " + err);
    });

// var axios = require("axios");

// var movie = process.argv[2];
// var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

// console.log(queryUrl);

// axios.get(queryUrl).then(response => {
//     if (movie) {
//         // console.log(response)
//         console.log("Title: " + response.data.Title);
//         console.log("Year: " + response.data.Year);
//         console.log("imdb Rating: " + response.data.imdbRating);
//         console.log("Rotten Tomatoes Rating: " + response.data.Ratings.Value);
//         console.log("Country Filmed in: " + response.data.Country);
//         console.log("Language: " + response.data.Language);
//         console.log("The Plot: " + response.data.Plot);
//         console.log("The Actors: " + response.data.Actors);
//     } else {
//         console.log("Title: Mr. Nobody");
//         console.log("Year: 2013");
//         console.log("imdb Rating: 7.8");
//         console.log("Rotten Tomatoes Rating: undefined");
//         console.log("Country Filmed in: Belgium, Germany, Canada, France, USA, UK");
//         console.log("Language: English, Mohawk");
//         console.log("The Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
//         console.log("The Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");
//     }
// })
//     .catch(error => {
//         console.log(error.response)
//     });