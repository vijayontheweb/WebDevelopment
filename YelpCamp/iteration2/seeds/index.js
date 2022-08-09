const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { cities } = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error!"));
db.once("open", () => {
    console.log("Database connected!");
});

const randomFromSize = size => Math.floor(Math.random() * size)
const sampleFromArr = arr => arr[randomFromSize(arr.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let index = 0; index < 50; index++) {
        const randomNumber = randomFromSize(1000);
        const randomPrice = randomFromSize(20) + 10;
        const location = `${cities[randomNumber].city}, ${cities[randomNumber].state}`;
        const title = `${sampleFromArr(descriptors)} ${sampleFromArr(places)}`;
        const image = `https://source.unsplash.com/collection/9331668`;
        const description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nobis illum nemo, ea libero architecto reiciendis doloremque? Esse, cupiditate. Quasi, animi! Nam delectus atque ad ex quidem veniam accusantium voluptas!`;
        const camp = new Campground({ 'location': `${location}`, 'title': `${title}`, 'image': `${image}`, 'description': `${description}`, 'price': `${randomPrice}` });
        await camp.save();
    }
    //const camp = new Campground({ 'title': 'purple field' });
    //await camp.save();
}

seedDB().then(() => {
    db.close();
});