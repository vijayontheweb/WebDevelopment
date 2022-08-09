const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const Farm = require('./models/farm');
const Product = require('./models/product');
const AppError = require('./AppError');
const { nextTick } = require('process');
const categories = ['fruit', 'vegetable', 'dairy']

const port = 3000
const app = new express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json())//for parsing application/json
app.use(express.urlencoded({ extended: true }))
//Even though it is a POST request from the form, express is going to treat it as a PATCH request
//Override with POST having ?_method=PATCH
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/farmStand2', { useNewUrlParser: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN!');
    })
    .catch(() => {
        console.log('OOPS..MONGO CONNECTION ERROR!');
        console.log(err);
    });

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((e) => { next(e) });
    }
};

//FARM ROUTES

//Index - GET /farms - List all farms
app.get('/farms', wrapAsync(async (req, res) => {
    const farms = await Farm.find({});
    console.log(farms);
    res.render('farms/index', { farms });
}));

//New - GET /farms/new - FORM to create a new farm
app.get('/farms/new', (req, res) => {
    //throw new AppError('farm not found', '401');
    res.render('farms/new');
});

//Create - POST /farms - Create a new farm
app.post('/farms', wrapAsync(async (req, res, next) => {
    console.log(req.body);
    const newFarm = new Farm(req.body);
    await newFarm.save();
    const farms = await Farm.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(farms);
    res.render('farms/index', { farms });
}));

//Show - GET /farms/:id - Get one farm(using id)
app.get('/farms/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    if (!farm) {
        throw new AppError('farm not found', '401');
    }
    res.render(`farms/show`, { farm });
}));

//Edit - GET /farms/:id/edit - FORM to edit specific farm(using id)
app.get('/farms/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    if (!farm) {
        return next(new AppError('farm not found', '401'));
    }
    res.render(`farms/edit`, { farm });
}));

//Update - PATCH /farms/:id - Update one farm(using id)
app.put('/farms/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    await Farm.findByIdAndUpdate(id, req.body);
    const farms = await Farm.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(farms);
    res.render('farms/index', { farms });
}));

//Destroy - DELETE / farms /: id - Delete one farm(using id)
app.delete('/farms/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Farm.findByIdAndDelete(id);
    const farms = await Farm.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(farms);
    res.render('farms/index', { farms });
}));














//PRODUCT ROUTES

//Index - GET /products - List all products
app.get('/farms/:id/products', wrapAsync(async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    res.render('products/index', { products });
}));

//New - GET /products/new - FORM to create a new product
app.get('/farms/:id/products/new', (req, res) => {
    //throw new AppError('product not found', '401');
    res.render('products/new');
});

//Create - POST /products - Create a new product
app.post('/farms/:id/products', wrapAsync(async (req, res, next) => {
    console.log(req.body);
    const newProduct = new Product(req.body);
    await newProduct.save();
    const products = await Product.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(products);
    res.render('products/index', { products });
}));

//Show - GET /products/:id - Get one product(using id)
app.get('/farms/:id/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError('product not found', '401');
    }
    res.render(`products/show`, { product });
}));

//Edit - GET /products/:id/edit - FORM to edit specific product(using id)
app.get('/farms/:id/products/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError('product not found', '401'));
    }
    res.render(`products/edit`, { product });
}));

//Update - PATCH /products/:id - Update one product(using id)
app.put('/farms/:id/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    await Product.findByIdAndUpdate(id, req.body);
    const products = await Product.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(products);
    res.render('products/index', { products });
}));

//Destroy - DELETE / products /: id - Delete one product(using id)
app.delete('/farms/:id/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    const products = await Product.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(products);
    res.render('products/index', { products });
}));

const handleValidationError = err => {
    console.dir(err);
    return new AppError(`VALIDATION FAILED CUSTOM MESSAGE .. ${err.message}`, 400);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") {
        err = handleValidationError(err);
    }
    next(err);
});

app.use((err, req, res, next) => {
    const { status = '500', message = 'Something went wrong!' } = err;
    res.status(status).send(message);
});

app.listen(port, () => {
    console.log('Listening on port 3000');
});
