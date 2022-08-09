const mongoose = require('mongoose');

//Concept on javascript side of the equation
const farmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name!']
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email required!']
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

//Name of the Model(singular, Capitalized) and Schema are passed as arguments
//Save the results to a class(capitalized)
//Mongoose will make a collection with lowercase and pluralize the model name i.e. movies
//Below line is to compile our model
const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;