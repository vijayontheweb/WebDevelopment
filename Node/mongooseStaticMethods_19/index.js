const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/productsApp');

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    onSale: {
        type: Boolean,
        default: false
    }
});

//METHODS THAT LIVE ON THE MODEL ITSELF
productSchema.statics.fireSale = function () {
    //Here THIS refers to the model class itself and NOT refer to individual instances
    return this.updateMany({}, { onSale: true, price: 0 });
}

//assign a function i.e.greet to the 'methods' object of our productSchema
productSchema.methods.greet = function () {
    console.log(`Hello dear ${this.name}! You cost Rs.${this.price} and you are ${!this.onSale ? "NOT " : ""}on sale!`)
}

const Product = mongoose.model('Product', productSchema);

const cornFlakes = new Product({ name: 'Kellogs', price: 285 });
const colgate = new Product({ name: 'Colgate', price: 97 });

cornFlakes.save().then(() => {
    cornFlakes.greet();
    console.log('SAVED!');
}).catch(() => console.log('ERROR!'));

colgate.save().then(() => {
    colgate.greet();
    console.log('SAVED!');
}).catch(() => console.log('ERROR!'));

Product.fireSale().then((res) => {
    console.log(res);
    cornFlakes.greet();
    colgate.greet();
}); 