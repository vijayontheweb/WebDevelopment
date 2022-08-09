const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const Campground = require('./models/campground');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/CatchAsync');
const { campgroundSchema } = require('./schemas');

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
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    //res.send('Hello from Yelp Camp!');
    res.render('home');
})

app.get('/makecampground', catchAsync(async (req, res) => {
    const camp = new Campground({
        title: 'My New Campground',
        price: '20$',
        description: 'Welcome to my campground!',
        location: 'Chennai'
    });
    await camp.save();
    res.send(camp);

}));

app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}));

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', validateCampground, catchAsync(async (req, res) => {
    /*
    if (!req.body.campground) {
        throw new ExpressError("Campground Body Is Empty", 400);
    }
    */
    const campground = new Campground(req.body.campground);
    await campground.save();
    //res.redirect(`campgrounds/` + campground._id);
    res.redirect(`campgrounds/${campground._id}`);
}));

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground, { new: true });
    res.render('campgrounds/show', { campground });
}));


app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
}));

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
}));

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

/*
const handleError = err => {
    console.dir(err);
    return new ExpressError(`FAILED CUSTOM MESSAGE .. ${err.message}`, 400);
}

const handleValidationError = err => {
    console.dir(err);
    return new ExpressError(`VALIDATION FAILED CUSTOM MESSAGE .. ${err.message}`, 400);
}

const handleCastError = err => {
    console.dir(err);
    return new ExpressError(`CAST FAILED CUSTOM MESSAGE .. ${err.message}`, 400);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "Error") {
        err = handleError(err);
    } else if (err.name === "ValidationError") {
        err = handleValidationError(err);
    } else if (err.name === "CastError") {
        err = handleCastError(err);
    }
    next(err);
});
*/

app.use((err, req, res, next) => {
    const { status = '500', message = 'Something went wrong!' } = err;
    //res.status(status).send(message);
    res.status(status).render('error', { err });
});

app.listen(3000, () => {
    console.log('Listening on port 3000..')
})