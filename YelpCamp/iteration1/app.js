const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const Campground = require('./models/campground');

const mongoose = require('mongoose');
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

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    //res.send('Hello from Yelp Camp!');
    res.render('home');
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({
        title: 'My New Campground',
        price: '20$',
        description: 'Welcome to my campground!',
        location: 'Chennai'
    });
    await camp.save();
    res.send(camp);

})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    //res.redirect(`campgrounds/` + campground._id);
    res.redirect(`campgrounds/${campground._id}`);
});

app.put('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground, { new: true });
    res.render('campgrounds/show', { campground });
});


app.delete('/campgrounds/:id', async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
});

app.listen(3000, () => {
    console.log('Listening on port 3000..')
})