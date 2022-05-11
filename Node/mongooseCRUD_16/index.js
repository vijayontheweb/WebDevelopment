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

/*
INSERT MANY
Now we can make new instances of movie class and save them to mongo database
Once it is saved, the promise is resolved.
Then callback ran and mongoose passed data into this callback
*/

Movie.insertMany([{ title: '3 Idiots', year: 2012, score: 9.1, rating: 'U' },
{ title: 'Doctor', year: 2021, score: 8.7, rating: 'U' },
{ title: 'War', year: 2018, score: 8, rating: 'U' },
{ title: 'Cast Away', year: 1994, score: 9.7, rating: 'U' }])
    .then(() => {
        console.log('SAVED!');
        console.log(data);
    })
    .catch(() => {
        console.log('ERROR!')
    });

/*
 FIND DOCUMENTS
   Model.find(filter[,projection][,options][,callback])
 Mongoose casts the filter to match the model's schema before the command is sent
 Example,
   await MyModel.find({});
*/
Movie.find({}).then((data) => console.log(data)).catch((error) => console.log(error));
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
Movie.find({ score: { $gt: 9 } }).then((data) => console.log(data)).catch((error) => console.log(error));
//WITH EXEC, IT GIVES BETTER STACK TRACES. IT INCLUDES THE CALLING CODE
Movie.find({ score: { $gt: 9 } }).exec().then((data) => console.log(data)).catch((error) => console.log(error));
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
//FINDS THE FIRST MATCH
Movie.findOne({ score: { $gt: 9 } }).then((data) => console.log(data)).catch((error) => console.log(error));
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
//FINDING BY ID
Movie.find({ _id: '62046ef50b41118c5c0d8c08' }).then((data) => console.log(data)).catch((error) => console.log(error));
Movie.findById('62046ef50b41118c5c0d8c08').then((data) => console.log(data)).catch((error) => console.log(error));

/*
   UPDATES DOCUMENTS
       Model.updateMany(filter[,doc][,options][,callback])
   Updates only the first document that matches the filter
       Model.updateOne(filter[,doc][,options][,callback])
*/
Movie.updateOne({ title: 'Dangal' }, { $set: { score: 9.5 } }).then((data) => console.log(data)).catch((error) => console.log(error));
Movie.updateMany({ title: { $in: ['3 Idiots', 'War'] } }, { $set: { score: 10 } }).then((data) => console.log(data)).catch((error) => console.log(error));
/*
  Finds one, updates and gives us the object after the update was applied
  We get back the object(default is old) with the new information
  {new:true} -> returns the modified document rather than the original document
  A.findOneAndUpdate(conditions, update, options, callback);  -> executes
  A.findOneAndUpdate(conditions, update, options);  -> returns query
  A.findOneAndUpdate(conditions, update, callback);  -> executes
  A.findOneAndUpdate(conditions, update);  -> returns query
  A.findOneAndUpdate();  -> returns query
*/

Movie.findOneAndUpdate({ title: 'Dangal' }, { $set: { score: 9.9 } }).then((data) => console.log(data)).catch((error) => console.log(error));
Movie.findOneAndUpdate({ title: 'Dangal' }, { $set: { score: 9.8 } }, { new: true }).then((data) => console.log(data)).catch((error) => console.log(error));

/*
This method sends a remove command directly to mongodb. No documents are involved
Removes all documents that matches condition from the collection
To remove just the first document that matches conditions, set the single option to true
Model.deleteOne(conditions[, options])
Model.findOneAndDelete -> To return back the deleted item
*/
Movie.deleteOne({ title: 'Dangal' }).then((data) => console.log(data)).catch((error) => console.log(error));
Movie.deleteMany({}).then((data) => console.log(data)).catch((error) => console.log(error));
Movie.deleteMany({ score: { $gt: 9 } }).then((data) => console.log(data)).catch((error) => console.log(error));
Movie.findOneAndDelete({ title: 'Doctor' }).then((data) => console.log(data)).catch((error) => console.log(error));