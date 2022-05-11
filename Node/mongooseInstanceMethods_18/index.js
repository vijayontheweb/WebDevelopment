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
        default: true
    }
});

//assign a function i.e.greet to the 'methods' object of our productSchema
productSchema.methods.greet = function () {
    console.log(`Hello dear ${this.name}! You cost Rs.${this.price} and you are ${!this.onSale ? "NOT " : ""}on sale!`)
}

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    //returns a THENABLE
    return this.save();
}

const Product = mongoose.model('Product', productSchema);
const cornFlakes = new Product({ name: 'Kellogs', price: 285 });
const colgate = new Product({ name: 'Colgate', price: 97 });

cornFlakes.save().then(() => console.log('SAVED!')).catch(() => { console.log('ERROR!') });
colgate.save().then(() => console.log('SAVED!')).catch(() => { console.log('ERROR!') });

//METHODS THAT LIVE ON INSTANCES OF THE MODEL
//now all of our Product instances have a greet method available to them
cornFlakes.greet();

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Colgate' });
    await foundProduct.toggleOnSale();
    foundProduct.greet();
}

findProduct();
//cornFlakes.save().then(() => console.log('SAVED!')).catch(() => { console.log('ERROR!') });
