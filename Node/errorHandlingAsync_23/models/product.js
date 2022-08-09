const mongoose = require('mongoose');

//Concept on javascript side of the equation
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be blank']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
});

//Name of the Model(singular, Capitalized) and Schema are passed as arguments
//Save the results to a class(capitalized)
//Mongoose will make a collection with lowercase and pluralize the model name i.e. movies
//Below line is to compile our model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;