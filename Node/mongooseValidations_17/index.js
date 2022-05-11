const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp');

//This structure helps us to add built-in validations
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        min: 0
        //min: [0, 'Macha, negative not allowed da!'] -> Custom validation message
    },
    onSale: {
        type: Boolean,
        default: true
    },
    competitors: {
        type: [String]
    },
    taxes: {
        GST: {
            type: Number,
            default: 10.5
        },
        importTax: {
            type: Number,
            default: 1.8
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

const Product = mongoose.model('Product', productSchema);

/*
const cornFlakes = new Product({ name: 'Kellogs', price: 285 });
cornFlakes.save().then(() => console.log('SAVED!')).catch(() => { console.log('ERROR!') });
//Below will throw validation error
//Error: Product validation failed: name: Path `name` is required.
const unnamed = new Product({ price: 10 });
unnamed.save().then(() => console.log('SAVED!')).catch((err) => { console.log('ERROR!'); console.log(err) });
//Below will throw validation error
//Error: Product validation failed: price: Cast to Number failed for value "twenty" (type string) at path "price"
const noodles = new Product({ name: 'Maggi', price: 'twenty' });
noodles.save().then(() => console.log('SAVED!')).catch((err) => { console.log('ERROR!'); console.log(err) });
//color: 'green' will not be saved since it was not part of the schema.
//price: '140' will be saved, since the value is still a number 
const shampoo = new Product({ name: 'Patanjali', price: '140', color: 'green' });
shampoo.save().then(() => console.log('SAVED!')).catch((err) => { console.log('ERROR!'); console.log(err) });


const biscuits = new Product({ name: 'Digestive for healthy', price: -25});
//This will automatically append onSale: true if key value not provided
//Error: Product validation failed: name: Path `name` (`Digestive for healthy`) is longer than the maximum allowed length (20)., 
//price: Path`price`(-25) is less than minimum allowed value(0).
biscuits.save().then(() => console.log('SAVED!')).catch((err) => { console.log('ERROR!'); console.log(err) });
*/

//Example of UPSERT where validation errors are ignored by default
const cycle1 = new Product({ name: 'BTWIN', price: 12500, competitors: ['Hercules', 'Atlas'], size: 'S' });
cycle1.save()
    .then((data) => {
        console.log('SAVED!');
        console.log(data);
        //Bu default, only create will handle validation errors and NOT update. 
        //In below example, negative price validation will be ignored
        Product.findOneAndUpdate({ name: 'BTWIN' }, { $set: { price: -90 } }, { new: true })
            .then((data) => {
                console.log('SAVED!');
                console.log(data);
            })
            .catch((err) => {
                console.log('ERROR!');
                console.log(err)
            });
    })
    .catch((err) => {
        console.log('ERROR!');
        console.log(err)
    });

//Example of UPSERT where validation errors are handled using runValidators:true
const cycle2 = new Product({ name: 'Hero', price: 3500, competitors: ['Hercules', 'Atlas'] });
cycle2.save()
    .then((data) => {
        console.log('SAVED!');
        console.log(data);
        //Bu default, only create will handle validation errors and NOT update.
        //In below example, negative price validation will be considered using runValidators:true
        //Error: Validation failed: price: Path `price` (-100) is less than minimum allowed value (0).
        //size: ValidatorError: `XL` is not a valid enum value for path `size`.
        Product.findOneAndUpdate({ name: 'Hero' }, { $set: { price: -100, size: 'XL' } }, { new: true, runValidators: true })
            .then((data) => {
                console.log('SAVED!');
                console.log(data);
            })
            .catch((err) => {
                console.log('ERROR!');
                console.log(err)
            });
    })
    .catch((err) => {
        console.log('ERROR!');
        console.log(err)
    });    