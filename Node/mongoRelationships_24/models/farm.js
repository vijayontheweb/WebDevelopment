const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN!');
    })
    .catch(() => {
        console.log('OOPS..MONGO CONNECTION ERROR!');
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter'],
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    ]
});

const Farm = mongoose.model('Farm', farmSchema);

/*
Product.insertMany(
    [
        { name: 'Goddess Melon', price: 3.5, season: 'Summer' },
        { name: 'Sugar baby watermelon', price: 4, season: 'Fall' },
        { name: 'Asparagus', price: 9.25, season: 'Spring' }
    ]
);
*/

const addProduct = async (farm, productName) => {
    const product = await Product.findOne({ name: `${productName}` });
    farm.products.push(product);
};

const makeFarm = async () => {
    const farm = new Farm({
        name: 'Full Belly Farm',
        city: 'Guinda, CA'
    });
    /*
    const melon = await Product.findOne({ name: 'Goddess Melon' });
    console.log('MELON\n' + melon);
    farm.products.push(melon);
    */
    await addProduct(farm, 'Goddess Melon');
    await addProduct(farm, 'Sugar baby watermelon');
    await addProduct(farm, 'Asparagus');
    console.log('FARM\n' + farm);
    await farm.save();
}

const showFarm = async () => {
    Farm.findOne({ name: 'Full Belly Farm' }).then((farm) => { console.log('FARM_WO_POPULATE\n' + farm) });
    Farm.findOne({ name: 'Full Belly Farm' }).populate('products').then((farm) => { console.log('FARM_WITH_POPULATE\n' + farm) });
}

showFarm();
//makeFarm();
