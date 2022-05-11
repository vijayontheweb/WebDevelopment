const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies');

//Concept on javascript side of the equation
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

//Name of the Model(singular, Capitalized) and Schema are passed as arguments
//Save the results to a class(capitalized)
//Mongoose will make a collection with lowercase and pluralize the model name i.e. movies
const Movie = mongoose.model('Movie', movieSchema);

//Now we can make new instances of movie class and save them to mongo database
const dangal = new Movie({ title: 'Dangal', year: 2017, score: 9.3, rating: 'U' });
dangal.save().then(() => console.log('SAVED!')).catch(() => { console.log('ERROR!') });;
