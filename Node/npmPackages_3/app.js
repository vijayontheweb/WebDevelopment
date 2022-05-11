const allJokes = require("./jokes");

allJokes.giveMeAJoke.getRandomDadJoke(function (joke) {
    console.log(joke.rainbow);
});